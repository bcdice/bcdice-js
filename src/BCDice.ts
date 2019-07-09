import '@lib/JsPatch';
import '@lib/cgiDiceBot';
import '@lib/DiceBotLoader';
import * as diceBot from '@lib/diceBot.json';

declare const Opal: any;

export default class BCDice {
  public static get games(): { gameType: string, gameName: string, help: string, prefixes: string[] }[] {
    return diceBot.games;
  }

  public readonly cgiDiceBot: any;

  public constructor() {
    this.cgiDiceBot = Opal.CgiDiceBot.$new();
  }

  public setRandomValues(rands: number[][]): void {
    this.cgiDiceBot.$setRandomValues(rands)
  }

  public setTest(test: boolean): void {
    this.cgiDiceBot.$setTest(test);
  }

  public roll(input: string, gameType: string, dir: string[] = []): [string, number[][] | null] {
    const [
      result,
      rands,
    ] = this.cgiDiceBot.$roll(input, gameType, dir);

    return [
      result,
      rands === Opal.nil ? null : rands,
    ];
  }

  public get rands(): number[][] {
    return this.cgiDiceBot.rands;
  }
}
