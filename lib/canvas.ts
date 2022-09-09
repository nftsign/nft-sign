import { PNG } from "pngjs";
import { fromNibbles, toNibbles } from "./buffer";
import {
  GAP,
  PATCH_HEIGHT,
  PATCH_WIDTH,
  ROWS,
  SPACE_AFTER_N_COLS,
} from "./constants";

const imageCoordToBufferIndex = (x: number, y: number, width: number) => {
  return (width * y + x) << 2;
};

export const pngToCanvas = (png: PNG) => {
  const area = new Uint8Array(png.data);
  return { area, width: png.width, height: png.height } as Canvas;
};

export const setColor = (
  canvas: Canvas,
  x: number,
  y: number,
  r: number,
  g: number,
  b: number
) => {
  const { width, area } = canvas;

  const idx = imageCoordToBufferIndex(x, y, width);
  area[idx] = r;
  area[idx + 1] = g;
  area[idx + 2] = b;
};

export const getColor = (canvas: Canvas, x: number, y: number) => {
  const { width, area } = canvas;

  const idx = imageCoordToBufferIndex(x, y, width);
  const r = area[idx];
  const g = area[idx + 1];
  const b = area[idx + 2];
  return [r, g, b];
};

export const createPatch = (
  canvas: Canvas,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  g: number,
  b: number
) => {
  const [ww, hh] = [w, h];
  for (let xo = 0; xo < ww; xo++) {
    for (let yo = 0; yo < hh; yo++) {
      setColor(canvas, x + xo, y + yo, r, g, b);
    }
  }
};

export const paintBufferAsPatchCode = (
  canvas: Canvas,
  buffer: Buffer,
  placement: SignaturePlacement
) => {
  const nibs = toNibbles(buffer);

  forEachPatch((x, y, idx) => {
    let n = idx * 3;
    const r = n < nibs.length ? nibbleToColor(nibs[n]) : 0;
    n++;
    const g = n < nibs.length ? nibbleToColor(nibs[n]) : 0;
    n++;
    const b = n < nibs.length ? nibbleToColor(nibs[n]) : 0;
    n++;

    createPatch(
      canvas,
      placement.xOffset + x,
      placement.yOffset + y,
      PATCH_WIDTH,
      PATCH_HEIGHT,
      r,
      g,
      b
    );

    return n >= nibs.length;
  });
};

export const readPatchCode = (
  canvas: Canvas,
  nibblesToRead: number,
  placement: SignaturePlacement
) => {
  const patchCode: number[] = [];

  forEachPatch((x, y, idx) => {
    let [r, g, b] = getColor(
      canvas,
      placement.xOffset + x,
      placement.yOffset + y
    );

    if (patchCode.length < nibblesToRead) patchCode.push(colorToNibble(r));
    if (patchCode.length < nibblesToRead) patchCode.push(colorToNibble(g));
    if (patchCode.length < nibblesToRead) patchCode.push(colorToNibble(b));

    return patchCode.length >= nibblesToRead;
  });

  return Buffer.from(fromNibbles(patchCode));
};

export const forEachPatch = (onPatch: OnPatchFn) => {
  let x = 0;
  let y = 0;
  let n = 0;
  let squareIdx = 0;
  let jump = PATCH_WIDTH + GAP;
  let col = 0;
  let idx = 0;
  let done = false;

  while (!done) {
    done = onPatch(x, y, idx++);

    squareIdx++;
    y += jump;
    if (squareIdx % ROWS === 0) {
      col++;
      y = 0;
      x -= jump + (col % SPACE_AFTER_N_COLS == 0 ? jump : 0);
    }
  }
};

const nibbleToColor = (nibble: number) => {
  return nibble * 8 + 64;
};

const colorToNibble = (color: number) => {
  return Math.round((color - 64) / 8);
};
