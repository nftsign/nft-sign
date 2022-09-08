import { ethers } from "ethers";
import { PNG } from "pngjs";
import { pngToCanvas, readPatchCode } from "../canvas";
import { SIGNATURE_LEN } from "../constants";
import { getDefaultPlacement } from "../placement";
import { computeImageHash } from "./imageHash";

export const verifyImageHash = () => {
  return new PNG().on("parsed", async function () {
    const hash = computeImageHash(this, getDefaultPlacement(this));

    const signature = readSignatureFromImage(this);

    console.log(`Image hash: ${hash.toString("hex")}`);
    console.log(`Signature: ${signature}`);

    try {
      const signingAddress = ethers.utils.verifyMessage(hash, signature);
      console.log(`Signature is valid!`);
      console.log(`Signed by https://etherscan.io/address/${signingAddress}`);
    } catch (e) {
      console.log("Verification failed");
    }
  });
};

const readSignatureFromImage = (png: PNG) => {
  const canvas = pngToCanvas(png);
  const sigBuffer = readPatchCode(
    canvas,
    SIGNATURE_LEN * 2,
    getDefaultPlacement(png)
  );

  return "0x" + sigBuffer.toString("hex"); // TODO what if the highest-order digit is 0?
};
