"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileContents = exports.getArgs = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getArgs = (argv) => {
    return argv.slice(2);
};
exports.getArgs = getArgs;
const getFileContents = () => {
    const filePath = path_1.default.resolve((0, exports.getArgs)(process.argv)[0]);
    const bufferContents = fs_1.default.readFileSync(filePath);
    const fileContents = bufferContents.toString();
    return fileContents.split("\r\n");
};
exports.getFileContents = getFileContents;
