"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubExtension = exports.extension = exports.baseName = void 0;
const baseName = (fileName) => {
    const dotPos = fileName.lastIndexOf(".");
    if (dotPos > 0) {
        return fileName.substring(0, dotPos);
    }
    throw new Error(`Unexpected filename ${fileName}`);
};
exports.baseName = baseName;
const extension = (fileName) => {
    const dotPos = fileName.lastIndexOf(".");
    if (dotPos < fileName.length - 1) {
        return fileName.substring(dotPos + 1);
    }
    throw new Error(`Extension not found: ${fileName}`);
};
exports.extension = extension;
const addSubExtension = (fileName, subExtension) => {
    return `${(0, exports.baseName)(fileName)}.${subExtension}.${(0, exports.extension)(fileName)}`;
};
exports.addSubExtension = addSubExtension;
