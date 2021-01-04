export default interface Result {
  text: string;
  rands: [number, number][];
  detailed_rands: {
    $kind(): string;
    $sides(): number;
    $value(): number;
  }[];
  secret: boolean;
  success: boolean;
  failure: boolean;
  critical: boolean;
  fumble: boolean;
}
