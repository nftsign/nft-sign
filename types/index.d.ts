interface SignatureContext {
  placement?: SignaturePlacement;
  hash?: Uint8Array;
}

interface Canvas {
  area: Buffer;
  width: number;
  height: number;
}

type Direction = "ltr" | "rtl";

interface SignaturePlacement {
  xOffset: number;
  yOffset: number;
  direction: Direction;
}

type OnPatchFn = (x: number, y: number, idx: number) => boolean;
