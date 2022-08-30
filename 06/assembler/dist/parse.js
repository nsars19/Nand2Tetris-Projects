"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
var InstructionType;
(function (InstructionType) {
    InstructionType["A_INSTRUCTION"] = "A_INSTRUCTION";
    InstructionType["C_INSTRUCTION"] = "C_INSTRUCTION";
    InstructionType["L_INSTRUCTION"] = "L_INSTRUCTION";
})(InstructionType || (InstructionType = {}));
class Parser {
    #file;
    #currentLine = 0;
    #maxLine;
    #currentValue;
    constructor() {
        this.#file = (0, util_1.getFileContents)();
        this.#maxLine = this.#file.length;
        this.#currentValue = "";
    }
    get currentValue() {
        return this.#currentValue;
    }
    hasMoreLines() {
        return this.#currentLine < this.#maxLine;
    }
    advance() {
        this.#currentLine++;
        this.#currentValue = this.#file[this.#currentLine];
    }
    instructionType() {
        const v = this.#currentValue[0];
        if (v.indexOf("(") > -1 && v.includes(")"))
            return InstructionType.L_INSTRUCTION;
        if (v.indexOf("@") > -1)
            return InstructionType.A_INSTRUCTION;
        return InstructionType.C_INSTRUCTION;
    }
    symbol() {
        const type = this.instructionType();
        if (type === "A_INSTRUCTION") {
            return this.#currentValue.slice(1);
        }
        else if (type === "L_INSTRUCTION") {
            return this.#currentValue.replace("(", "").replace(")", "");
        }
        return null;
    }
    // dest=comp;jmp
    dest() { }
    comp() { }
    jump() { }
}
exports.default = Parser;
