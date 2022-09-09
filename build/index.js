#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const constants_1 = require("./lib/constants");
const pipelines_1 = require("./lib/pipelines");
const readline_sync_1 = __importDefault(require("readline-sync"));
run().catch((e) => console.error(e));
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = process.argv) === null || _a === void 0 ? void 0 : _a.length) > 2) {
            if (process.argv[2] === "--verify") {
                const filename = process.argv[3];
                console.log(`Verifying: ${filename}`);
                yield (0, pipelines_1.verifyNFTPipeline)(filename);
            }
            else {
                const mnemonic = readline_sync_1.default.question("Mnemonic phrase (signer): ");
                const wallet = ethers_1.ethers.Wallet.fromMnemonic(mnemonic);
                const filename = process.argv[constants_1.FILENAME_POS];
                console.log(`Signing: ${filename}`);
                yield (0, pipelines_1.signNFTPipeline)(wallet, filename);
            }
        }
    });
}
