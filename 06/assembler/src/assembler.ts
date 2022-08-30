import CodeTranslator from "./code";
import Parser, { InstructionType } from "./parse";
import { bin, getFileContents } from "./util";
import fs from "fs";
import { symbolTable } from "./symbols";

const main = () => {
  const fileDetail = getFileContents(process.argv);
  const binFilePath = fileDetail.pathOut;
  const symbols = symbolTable();

  if (!binFilePath) {
    throw new Error("File output path must be included as an argument");
  }

  const translator = new CodeTranslator();
  const fpParser = new Parser(fileDetail.file);
  const spParser = new Parser(fileDetail.file);

  // first pass
  while (fpParser.hasMoreLines()) {
    const insType = fpParser.instructionType();
    const symbol = fpParser.symbol();

    if (insType !== InstructionType.L_INSTRUCTION) {
      fpParser.advance();
      continue;
    } else if (symbol === null) {
      throw new Error("Invalid symbol");
    }

    if (!symbols.contains(symbol)) {
      symbols.addEntry(symbol, fpParser.lineNumber);
    }

    fpParser.advance();
  }

  // second pass
  while (spParser.hasMoreLines()) {
    const insType = spParser.instructionType();
    let symbol = spParser.symbol();

    switch (insType) {
      case InstructionType.C_INSTRUCTION:
        const dest = translator.dest(spParser.dest());
        const comp = translator.comp(spParser.comp());
        const jump = translator.jump(spParser.jump());
        const a = spParser.comp()?.includes("M") ? "1" : "0";
        const cInstruction = `111${a}${comp}${dest}${jump}\r\n`;

        fs.appendFileSync(binFilePath, cInstruction);

        break;
      case InstructionType.A_INSTRUCTION:
        if (symbol === null) {
          throw new Error("Invalid symbol");
        } else if (isNaN(parseInt(symbol))) {
          // get address from symbols table
          // symbols.contains(symbol) ?
          symbol = symbols.contains(symbol)
            ? symbols.getAddress(symbol).toString()
            : symbols.addEntry(symbol).toString();
        }

        const binSymbol = bin(parseInt(symbol));
        let aInstruction =
          "0".repeat(16 - binSymbol.length) + binSymbol + "\r\n";

        fs.appendFileSync(binFilePath, aInstruction);

        break;
      case InstructionType.L_INSTRUCTION:
        break;
      default: // empty lines or comments
        break;
    }

    spParser.advance();
  }
};

try {
  main();
} catch (e) {
  console.log(e);
  process.exit(1);
}
