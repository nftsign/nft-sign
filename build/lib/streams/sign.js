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
exports.pngSigner = void 0;
const pngjs_1 = require("pngjs");
const canvas_1 = require("../canvas");
const pngSigner = (wallet, ctx) => {
    const image = new pngjs_1.PNG();
    image.on("parsed", function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            const png = this;
            const hashBuffer = ctx.hash;
            const signature = yield wallet.signMessage(hashBuffer);
            const sigBuffer = Buffer.from(signature.substring(2), "hex"); // skip 0x prefix
            console.log("Signer: ", wallet.address);
            const canvas = {
                area: png.data,
                height: png.height,
                width: png.width,
            };
            const sig = Buffer.concat([sigBuffer, Buffer.from(wallet.address.substring(2), 'hex')]);
            console.log("Writing signature data", sig.toString('hex'));
            (0, canvas_1.paintBufferAsPatchCode)(canvas, sig, ctx.placement);
            png.pack();
        });
    });
    return image;
};
exports.pngSigner = pngSigner;
//ee65594828fd90befbc51751eef69d6c852e49c199a476c5ac399fd2586359d669b37cb4e2b1a91d58d2caef6048375b2d297910d17c49758b11ca024f8bad831cf56990605ebebd3dfd17e15952ad856ac544292d
//ee65594828fd90befbc51751eef69d6c852e49c199a476c5ac399fd2586359d669b37cb4e2b1a91d58d2caef6048375b2d297910d17c49758b11ca024f8bad831c
