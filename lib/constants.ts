export const FILENAME_POS = 2;

export const SIGNATURE_LEN = 65;
export const PAD = 8;

export const PATCH_WIDTH = 2;
export const PATCH_HEIGHT = 2;
export const GAP = 6;
export const ROWS = 3;
export const SPACE_AFTER_N_COLS = 3;
export const BOTTOM_OFFSET =
  PATCH_HEIGHT * ROWS +
  GAP * (ROWS - 1); /* the # of pixels added to the bottom of the image */
