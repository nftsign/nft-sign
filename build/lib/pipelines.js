"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyNFTPipeline = exports.signNFTPipeline = void 0;
const fs = __importStar(require("fs"));
const stream = __importStar(require("stream"));
const sign_1 = require("./streams/sign");
const imageHash_1 = require("./streams/imageHash");
const verify_1 = require("./streams/verify");
const file_1 = require("./file");
const signNFTPipeline = (wallet, imageFilename) => __awaiter(void 0, void 0, void 0, function* () {
    const ctx = {};
    return stream.pipeline(fs.createReadStream(imageFilename), (0, imageHash_1.addImageHashToPipelineContext)(ctx), (0, sign_1.pngSigner)(wallet, ctx), fs.createWriteStream((0, file_1.addSubExtension)(imageFilename, "signed")), (err) => {
        console.log("err", err);
    });
});
exports.signNFTPipeline = signNFTPipeline;
const verifyNFTPipeline = (imageFilename) => __awaiter(void 0, void 0, void 0, function* () {
    return stream.pipeline(fs.createReadStream(imageFilename), (0, verify_1.verifyImageHash)(), (err) => {
        console.log("err", err);
    });
});
exports.verifyNFTPipeline = verifyNFTPipeline;
