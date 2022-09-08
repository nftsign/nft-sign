import { PNG } from "pngjs";
import { BOTTOM_OFFSET, PAD, PATCH_WIDTH } from "./constants";

export const getDefaultPlacement = (png: PNG): SignaturePlacement => {
  return {
    xOffset: png.width - (PATCH_WIDTH + PAD),
    yOffset: png.height - (BOTTOM_OFFSET + PAD),
    direction: "rtl",
  };
};
