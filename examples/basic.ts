
// import BCDice, { Info } from 'bcdice';
// import 'bcdice/lib/diceBot/Cthulhu';

import BCDice, { Info } from '..';
import '../lib/diceBot/Cthulhu';

function getInfo(gameType: string): Info | undefined {
  return BCDice.infoList.find(info => info.gameType === gameType);
}

interface RollResult {
  result: string;
  rands: number[][] | null;
}

function roll(command: string, gameType: string): RollResult {
  const bcdice = new BCDice();
  const [result, rands] = bcdice.roll(command, gameType);
  return {
    result,
    rands,
  };
}

console.log(getInfo('Cthulhu'))
console.log(roll('CC', 'Cthulhu'));
