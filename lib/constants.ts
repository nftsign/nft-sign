export const FILENAME_POS = 2;

export const SIGNATURE_LEN = 65;
export const ADDRESS_LEN = 20;
export const DATA_LEN = SIGNATURE_LEN + ADDRESS_LEN;
export const PAD = 8;

export const PATCH_WIDTH = 1;
export const PATCH_HEIGHT = 1;
export const GAP = 4;
export const ROWS = 4;
export const SPACE_AFTER_N_COLS = 4;
export const BOTTOM_OFFSET =
  PATCH_HEIGHT * ROWS +
  GAP * (ROWS - 1); /* the # of pixels added to the bottom of the image */
