import '@lib/opal';
import '@lib/cgiDiceBot';
import * as diceBot from '@lib/diceBot.json';

declare const Opal: any;

export interface Info {
  gameType: string;
  gameName: string;
  prefixes: string;
  info: string;
}

export default class BCDice {
  public static get infoList(): Info[] {
    return diceBot.infoList;
  }

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
    const [
      result,
      rands,
    ] = this.cgiDiceBot.$roll(input, gameType, [], '', true);

    return [
      result,
      rands === Opal.nil ? null : rands,
    ];
  }

  public get rands(): number[][] {
    return this.cgiDiceBot.rands;
  }
}
