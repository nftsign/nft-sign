"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachPatch = exports.readPatchCode = exports.paintBufferAsPatchCode = exports.createPatch = exports.getColor = exports.setColor = exports.pngToCanvas = void 0;
const buffer_1 = require("./buffer");
const constants_1 = require("./constants");
const imageCoordToBufferIndex = (x, y, width) => {
    return (width * y + x) << 2;
};
const pngToCanvas = (png) => {
    const area = new Uint8Array(png.data);
    return { area, width: png.width, height: png.height };
};
exports.pngToCanvas = pngToCanvas;
const setColor = (canvas, x, y, r, g, b) => {
    const { width, area } = canvas;
    const idx = imageCoordToBufferIndex(x, y, width);
    area[idx] = r;
    area[idx + 1] = g;
    area[idx + 2] = b;
};
exports.setColor = setColor;
const getColor = (canvas, x, y) => {
    const { width, area } = canvas;
    const idx = imageCoordToBufferIndex(x, y, width);
    const r = area[idx];
    const g = area[idx + 1];
    const b = area[idx + 2];
    return [r, g, b];
};
exports.getColor = getColor;
const createPatch = (canvas, x, y, w, h, r, g, b) => {
    const [ww, hh] = [w, h];
    for (let xo = 0; xo < ww; xo++) {
        for (let yo = 0; yo < hh; yo++) {
            (0, exports.setColor)(canvas, x + xo, y + yo, r, g, b);
        }
    }
};
exports.createPatch = createPatch;
const paintBufferAsPatchCode = (canvas, buffer, placement) => {
    const nibs = (0, buffer_1.toNibbles)(buffer);
    (0, exports.forEachPatch)((x, y, idx) => {
        let n = idx * 3;
        const r = n < nibs.length ? nibbleToColor(nibs[n]) : 0;
        n++;
        const g = n < nibs.length ? nibbleToColor(nibs[n]) : 0;
        n++;
        const b = n < nibs.length ? nibbleToColor(nibs[n]) : 0;
        n++;
        (0, exports.createPatch)(canvas, placement.xOffset + x, placement.yOffset + y, constants_1.PATCH_WIDTH, constants_1.PATCH_HEIGHT, r, g, b);
        return n >= nibs.length;
    });
};
exports.paintBufferAsPatchCode = paintBufferAsPatchCode;
const readPatchCode = (canvas, nibblesToRead, placement) => {
    const patchCode = [];
    (0, exports.forEachPatch)((x, y, idx) => {
        let [r, g, b] = (0, exports.getColor)(canvas, placement.xOffset + x, placement.yOffset + y);
        if (patchCode.length < nibblesToRead)
            patchCode.push(colorToNibble(r));
        if (patchCode.length < nibblesToRead)
            patchCode.push(colorToNibble(g));
        if (patchCode.length < nibblesToRead)
            patchCode.push(colorToNibble(b));
        return patchCode.length >= nibblesToRead;
    });
    return Buffer.from((0, buffer_1.fromNibbles)(patchCode));
};
exports.readPatchCode = readPatchCode;
const forEachPatch = (onPatch) => {
    let x = 0;
    let y = 0;
    let n = 0;
    let squareIdx = 0;
    let jump = constants_1.PATCH_WIDTH + constants_1.GAP;
    let col = 0;
    let idx = 0;
    let done = false;
    while (!done) {
        done = onPatch(x, y, idx++);
        squareIdx++;
        y += jump;
        if (squareIdx % constants_1.ROWS === 0) {
            col++;
            y = 0;
            x -= jump + (col % constants_1.SPACE_AFTER_N_COLS == 0 ? jump : 0);
        }
    }
};
exports.forEachPatch = forEachPatch;
const nibbleToColor = (nibble) => {
    return nibble * 8 + 64;
};
const colorToNibble = (color) => {
    return Math.round((color - 64) / 8);
};
