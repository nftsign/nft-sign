"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyImageHash = void 0;
const ethers_1 = require("ethers");
const pngjs_1 = require("pngjs");
const canvas_1 = require("../canvas");
const constants_1 = require("../constants");
const placement_1 = require("../placement");
const imageHash_1 = require("./imageHash");
const verifyImageHash = () => {
    return new pngjs_1.PNG().on("parsed", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = (0, imageHash_1.computeImageHash)(this, (0, placement_1.getDefaultPlacement)(this));
            const signature = readSignatureFromImage(this);
            console.log(`Image hash: ${hash.toString("hex")}`);
            console.log(`Signature: ${signature}`);
            try {
                const signingAddress = ethers_1.ethers.utils.verifyMessage(hash, signature);
                console.log(`Signature is valid!`);
                console.log(`Signed by https://etherscan.io/address/${signingAddress}`);
            }
            catch (e) {
                console.log("Verification failed");
            }
        });
    });
};
exports.verifyImageHash = verifyImageHash;
const readSignatureFromImage = (png) => {
    const canvas = (0, canvas_1.pngToCanvas)(png);
    const sigBuffer = (0, canvas_1.readPatchCode)(canvas, constants_1.SIGNATURE_LEN * 2, (0, placement_1.getDefaultPlacement)(png));
    return "0x" + sigBuffer.toString("hex"); // TODO what if the highest-order digit is 0?
};
