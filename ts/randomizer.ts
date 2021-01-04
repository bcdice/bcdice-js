export interface RandomizerInstance {
  rand_results: [number, number][];
  detailed_rand_results: any[];
  $random(sides: number): number;
}
