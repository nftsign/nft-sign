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
exports.computeImageHash = exports.addImageHashToPipelineContext = void 0;
const node_crypto_1 = require("node:crypto");
const pngjs_1 = require("pngjs");
const canvas_1 = require("../canvas");
const constants_1 = require("../constants");
const placement_1 = require("../placement");
const addImageHashToPipelineContext = (ctx) => {
    return new pngjs_1.PNG().on("parsed", function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.placement = (0, placement_1.getDefaultPlacement)(this);
            ctx.hash = (0, exports.computeImageHash)(this, ctx.placement);
            this.pack();
        });
    });
};
exports.addImageHashToPipelineContext = addImageHashToPipelineContext;
const computeImageHash = (png, placement) => {
    const canvas = (0, canvas_1.pngToCanvas)(png);
    const fill = Buffer.alloc(constants_1.SIGNATURE_LEN, 0);
    (0, canvas_1.paintBufferAsPatchCode)(canvas, fill, placement);
    return Buffer.from((0, node_crypto_1.createHash)("sha256").update(canvas.area).digest());
};
exports.computeImageHash = computeImageHash;
