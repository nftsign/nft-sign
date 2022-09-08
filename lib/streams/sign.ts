import { PNG } from "pngjs";
import { ethers } from "ethers";
import { paintBufferAsPatchCode } from "../canvas";

export const pngSigner = (wallet: ethers.Wallet, ctx: SignatureContext) => {
  const image = new PNG();
  image.on("parsed", async function (data) {
    const png = this;

    const hashBuffer = ctx.hash!;
    const signature = await wallet.signMessage(hashBuffer);
    const sigBuffer = Buffer.from(signature.substring(2), "hex"); // skip 0x prefix

    console.log("Signer: ", wallet.address);

    const canvas: Canvas = {
      area: png.data,
      height: png.height,
      width: png.width,
    };

    const sig = sigBuffer; // Buffer.concat([Buffer.from(wallet.address.substring(2), 'hex'), sigBuffer])

    paintBufferAsPatchCode(canvas, sig, ctx.placement!);
    png.pack();
  });
  return image;
};
