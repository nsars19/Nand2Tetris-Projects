"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = __importDefault(require("./parse"));
const toBase = (base) => (num) => num.toString(base);
const bin = toBase(2);
const hex = toBase(16);
const dec = toBase(10);
const symbols = {
    R0: 0x0,
    R1: 0x1,
    R2: 0x2,
    R3: 0x3,
    R4: 0x4,
    R5: 0x5,
    R6: 0x6,
    R7: 0x7,
    R8: 0x8,
    R9: 0x9,
    R10: 0xa,
    R11: 0xb,
    R12: 0xc,
    R13: 0xd,
    R14: 0xe,
    R15: 0xf,
    SP: 0x0,
    LCL: 0x1,
    ARG: 0x2,
    THIS: 0x3,
    THAT: 0x4,
    SCREEN: 0x4000,
    KBD: 0x6000,
};
for (const symbol in symbols) {
    const hexVal = symbols[symbol];
    console.log({
        symbol,
        hex: hex(hexVal),
        dec: dec(hexVal),
        bin: bin(hexVal),
        strlen: bin(hexVal).length,
    });
}
console.log(0xdadb0d);
const main = () => {
    const parser = new parse_1.default();
    console.log(parser.currentValue);
};
try {
    main();
}
catch (e) {
    console.log(e);
    process.exit(1);
}
