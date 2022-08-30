import path from "path";
import fs from "fs";

export const getArgs = (argv: string[]): string[] => {
  return argv.slice(2);
};

export const getFileContents = (args: string[]) => {
  const filePath = path.resolve(getArgs(args)[0]);
  const pathOut = path.resolve(getArgs(args)[1]);
  const bufferContents = fs.readFileSync(filePath);
  const fileContents = bufferContents.toString();

  return {
    file: fileContents.split("\r\n"),
    pathIn: filePath,
    pathOut,
  };
};

const toBase = (base: number) => (num: number) => num.toString(base);
export const bin = toBase(2);
export const hex = toBase(16);
export const dec = toBase(10);
