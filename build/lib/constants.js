"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOTTOM_OFFSET = exports.SPACE_AFTER_N_COLS = exports.ROWS = exports.GAP = exports.PATCH_HEIGHT = exports.PATCH_WIDTH = exports.PAD = exports.DATA_LEN = exports.ADDRESS_LEN = exports.SIGNATURE_LEN = exports.FILENAME_POS = void 0;
exports.FILENAME_POS = 2;
exports.SIGNATURE_LEN = 65;
exports.ADDRESS_LEN = 20;
exports.DATA_LEN = exports.SIGNATURE_LEN + exports.ADDRESS_LEN;
exports.PAD = 8;
exports.PATCH_WIDTH = 2;
exports.PATCH_HEIGHT = 2;
exports.GAP = 4;
exports.ROWS = 4;
exports.SPACE_AFTER_N_COLS = 4;
exports.BOTTOM_OFFSET = exports.PATCH_HEIGHT * exports.ROWS +
    exports.GAP * (exports.ROWS - 1); /* the # of pixels added to the bottom of the image */
