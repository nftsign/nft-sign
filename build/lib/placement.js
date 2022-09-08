"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultPlacement = void 0;
const constants_1 = require("./constants");
const getDefaultPlacement = (png) => {
    return {
        xOffset: png.width - (constants_1.PATCH_WIDTH + constants_1.PAD),
        yOffset: png.height - (constants_1.BOTTOM_OFFSET + constants_1.PAD),
        direction: "rtl",
    };
};
exports.getDefaultPlacement = getDefaultPlacement;
