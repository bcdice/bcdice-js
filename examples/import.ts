
// import BCDice, { Info } from 'bcdice';
import BCDice, { Info } from '..';

function getInfo(gameType: string): Info | undefined {
  return BCDice.infoList.find(info => info.gameType === gameType);
}

interface RollResult {
  result: string;
  rands: number[][] | null;
}

function roll(command: string, gameType: string): Promise<RollResult> {
  const bcdice = new BCDice();
  // return import(`bcdice/lib/diceBot/${gameType}`).then(() => {
  return import(`../lib/diceBot/${gameType}`).then(() => {
    const [result, rands] = bcdice.roll(command, gameType);
    return {
      result,
      rands,
    };
  });
}

console.log(getInfo('Cthulhu'));
roll('CC', 'Cthulhu').then(result => console.log(result));
