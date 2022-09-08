import { createHash } from "node:crypto";
import { PNG } from "pngjs";
import { paintBufferAsPatchCode, pngToCanvas } from "../canvas";
import { BOTTOM_OFFSET, PAD, SIGNATURE_LEN } from "../constants";
import { getDefaultPlacement } from "../placement";

export const addImageHashToPipelineContext = (ctx: SignatureContext) => {
  return new PNG().on("parsed", async function (data) {
    ctx.placement = getDefaultPlacement(this);
    ctx.hash = computeImageHash(this, ctx.placement);

    this.pack();
  });
};

export const computeImageHash = (
  png: PNG,
  placement: SignaturePlacement
): Buffer => {
  const canvas = pngToCanvas(png);
  const fill = Buffer.alloc(SIGNATURE_LEN, 0);
  paintBufferAsPatchCode(canvas, fill, placement);

  return Buffer.from(createHash("sha256").update(canvas.area).digest());
};
