import '@lib/opal';
import '@lib/cgiDiceBot';
import * as diceBot from '@lib/diceBot.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Opal: any;

export interface Info {
  gameType: string;
  gameName: string;
  sortKey: string;
  prefixes: string;
  info: string;
}

export interface RandResult {
  kind: string;
  sides: number;
  value: number;
}

export default class BCDice {
  public static get infoList(): Info[] {
    return diceBot.infoList;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly cgiDiceBot: any;

  public constructor() {
    this.cgiDiceBot = Opal.CgiDiceBot.$new();
  }

  public setRandomValues(rands: number[][]): void {
    this.cgiDiceBot.$setRandomValues(rands.map(a => a.slice()).slice());
  }

  public setTest(test: boolean): void {
    this.cgiDiceBot.$setTest(test);
  }

  public roll(input: string, gameType: string): [string, number[][] | null] {
    const [result, rands] = this.cgiDiceBot.$roll(
      input,
      gameType,
      [],
      '',
      true,
    );

    return [result, rands === Opal.nil ? null : rands];
  }

  public get rands(): number[][] {
    return this.cgiDiceBot.rands;
  }

  public get detailedRands(): RandResult[] {
    return this.cgiDiceBot
      .$detailed_rand_results()
      .map((r: { $$data: RandResult }) => r.$$data);
  }
}
