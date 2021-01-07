import { Opal } from "./internal";
import { BaseInstance } from "./internal/types/base";

export default interface Result {
  text: string;
  rands: [number, number][];
  detailedRands: {
    kind: string;
    sides: number;
    value: number;
  }[];
  secret: boolean;
  success: boolean;
  failure: boolean;
  critical: boolean;
  fumble: boolean;
}

export function parseResult(opal: ReturnType<BaseInstance['$eval']>): Result | null {
  if (opal === Opal.nil) return null;

  const { detailed_rands, ...result } = opal;
  return {
    ...result,
    detailedRands: detailed_rands.map(a => a.$to_n()),
  }
}
