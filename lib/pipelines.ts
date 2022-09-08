import * as fs from "fs";
import * as stream from "stream";
import { ethers } from "ethers";
import { pngSigner } from "./streams/sign";
import { PNG } from "pngjs";
import { addImageHashToPipelineContext } from "./streams/imageHash";
import { verifyImageHash } from "./streams/verify";
import { addSubExtension } from "./file";

export const signNFTPipeline = async (
  wallet: ethers.Wallet,
  imageFilename: string
) => {
  const ctx = {} as SignatureContext;

  return stream.pipeline(
    fs.createReadStream(imageFilename),

    addImageHashToPipelineContext(ctx),

    pngSigner(wallet, ctx),

    fs.createWriteStream(addSubExtension(imageFilename, "signed")),

    (err: any) => {
      console.log("err", err);
    }
  );
};

export const verifyNFTPipeline = async (imageFilename: string) => {
  return stream.pipeline(
    fs.createReadStream(imageFilename),

    verifyImageHash(),

    (err: any) => {
      console.log("err", err);
    }
  );
};
