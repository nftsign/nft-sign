export const toNibbles = (data: Uint8Array) => {
  const nibs = [];
  if (data) {
    for (var i = 0; i < data.length; i++) {
      const nib1 = (data[i] & 0xf0) >> 4;
      const nib2 = data[i] & 0x0f;
      nibs.push(nib1);
      nibs.push(nib2);
    }
  }
  return nibs;
};

export const fromNibbles = (data: number[]) => {
  const digits = [];

  for (var i = 0; i < data.length; i += 2) {
    const nib1 = data[i] << 4;
    const nib2 = data[i + 1];
    digits.push(nib1 + nib2);
  }

  return Buffer.from(digits);
};
