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

    const sig = Buffer.concat([sigBuffer, Buffer.from(wallet.address.substring(2), 'hex')])
    console.log("Writing signature data", sig.toString('hex'));

    paintBufferAsPatchCode(canvas, sig, ctx.placement!);
    png.pack();
  });
  return image;
};

//ee65594828fd90befbc51751eef69d6c852e49c199a476c5ac399fd2586359d669b37cb4e2b1a91d58d2caef6048375b2d297910d17c49758b11ca024f8bad831cf56990605ebebd3dfd17e15952ad856ac544292d
//ee65594828fd90befbc51751eef69d6c852e49c199a476c5ac399fd2586359d669b37cb4e2b1a91d58d2caef6048375b2d297910d17c49758b11ca024f8bad831c