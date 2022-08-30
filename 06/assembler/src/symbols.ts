export const symbolTable = () => {
  const symbols: { [symbol: string]: number } = {
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

  let next = 0x10;

  return {
    addEntry: (symbol: string, address: number = next) => {
      symbols[symbol] = address;
      next++;
      return next;
    },
    contains: (symbol: string) => symbol in symbols,
    getAddress: (symbol: string) => symbols[symbol],
  };
};
