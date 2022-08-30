import { getFileContents } from "./util";

export enum InstructionType {
  A_INSTRUCTION = "A_INSTRUCTION",
  C_INSTRUCTION = "C_INSTRUCTION",
  L_INSTRUCTION = "L_INSTRUCTION",
}

export default class Parser {
  #file: string[];
  #lineNumber: number = 0;
  #currentLine: number = 0;
  #maxLine: number;
  #currentValue: string;
  #type: keyof typeof InstructionType | null = null;

  constructor(file: string[]) {
    this.#file = file;
    this.#maxLine = this.#file.length;
    this.#currentValue = "";
    this.#type = this.instructionType();
  }

  get lineNumber() {
    return this.#lineNumber;
  }

  hasMoreLines(): boolean {
    return this.#currentLine < this.#maxLine;
  }

  advance(): void {
    const insType = this.instructionType();
    if (
      insType === InstructionType.A_INSTRUCTION ||
      insType === InstructionType.C_INSTRUCTION
    ) {
      this.#lineNumber++;
    }

    this.#currentLine++;
    this.#currentValue = this.#file[this.#currentLine];
    this.#type = this.instructionType();
  }

  instructionType(): keyof typeof InstructionType | null {
    const v = this.#currentValue?.replaceAll(" ", "");

    if (v?.indexOf("//") === 0) {
      return null;
    }

    if (v?.indexOf("(") === 0 && v.indexOf(")") === v.length - 1) {
      return InstructionType.L_INSTRUCTION;
    }

    if (v?.indexOf("@") === 0) {
      return InstructionType.A_INSTRUCTION;
    }

    if (v?.indexOf("=") > -1 || v?.indexOf(";") > -1) {
      return InstructionType.C_INSTRUCTION;
    }

    return null;
  }

  symbol(): string | null {
    const v = this.#currentValue?.replaceAll(" ", "");
    if (this.#type === InstructionType.A_INSTRUCTION) {
      return v.slice(1);
    } else if (this.#type === InstructionType.L_INSTRUCTION) {
      return v.replaceAll(/[()]/g, "");
    }

    return null;
  }

  dest(): string | undefined {
    if (this.#type !== InstructionType.C_INSTRUCTION) {
      return undefined;
    }

    const v = this.#currentValue?.replaceAll(" ", "");

    if (v.indexOf("=") === -1) {
      return v.split(";")[0];
    } else {
      return v.split("=")[0];
    }
  }

  comp(): string | undefined {
    if (this.#type !== InstructionType.C_INSTRUCTION) {
      return undefined;
    }

    const v = this.#currentValue?.replaceAll(" ", "");
    let c = "";

    for (let i = 0; i < v.length; i++) {
      if (v[i] === "/") break;
      c += v[i];
    }

    if (c.indexOf("=") === -1) {
      return c.split(";")[0];
    }

    if (c.includes(";")) {
      return c.split("=")[1].split(";")[0];
    } else {
      return c.split("=")[1];
    }
  }

  jump(): string | undefined {
    if (this.#type !== InstructionType.C_INSTRUCTION) {
      return undefined;
    }

    const v = this.#currentValue.split(";")[1]?.replaceAll(" ", "");

    if (!v) return;

    let j = "";

    for (let i = 0; i < v.length; i++) {
      if (v[i] === "/") break;
      j += v[i];
    }

    return j;
  }
}
