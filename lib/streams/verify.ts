import { ethers } from "ethers";
import { PNG } from "pngjs";
import { pngToCanvas, readPatchCode } from "../canvas";
import { DATA_LEN, SIGNATURE_LEN } from "../constants";
import { getDefaultPlacement } from "../placement";
import { computeImageHash } from "./imageHash";

export const verifyImageHash = () => {
  return new PNG().on("parsed", async function () {
    const hash = computeImageHash(this, getDefaultPlacement(this));

    const sigData = readSignatureDataFromImage(this);

    console.log(`Image hash:\t\t${hash.toString("hex")}`);
    console.log(`Signature:\t\t${sigData.signature}`);
    console.log(`Address:\t\t${sigData.address}`);

    try {
      const signingAddress = ethers.utils.verifyMessage(
        hash,
        sigData.signature
      );
      if (sigData.address.toLowerCase() === signingAddress.toLowerCase()) {
        console.log("\nVerification SUCCESS\n")
        console.log(`Image was signed by:\thttps://etherscan.io/address/${signingAddress}\n`);
      } else {
        console.log(`\nVerification FAIL !!!`);
        console.log(
          `Expected address '${sigData.address}' does not match signer's address '${signingAddress}'`
        );
      }
    } catch (e) {
      console.log("Verification failed");
    }
  });
};

const readSignatureDataFromImage = (png: PNG): SignatureAddress => {
  const canvas = pngToCanvas(png);
  const sigBuffer = readPatchCode(
    canvas,
    DATA_LEN * 2,
    getDefaultPlacement(png)
  );

  return {
    signature: "0x" + sigBuffer.subarray(0, SIGNATURE_LEN).toString("hex"), // TODO what if the highest-order digit is 0?
    address: "0x" + sigBuffer.subarray(SIGNATURE_LEN).toString("hex"),
  };
};
