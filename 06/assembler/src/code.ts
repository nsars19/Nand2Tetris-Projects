import { instructions } from "./instSet";

export default class CodeTranslator {
  dest(s: string | undefined): string {
    return instructions.dest[String(s)];
  }
  jump(s: string | undefined): string {
    return instructions.jump[String(s)];
  }
  comp(s: string | undefined): string {
    return instructions.comp[String(s)];
  }
}
