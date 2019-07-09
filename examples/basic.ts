
// import BCDice from 'bcdice-js';
// import 'bcdice/lib/diceBot/Cthulhu';

import BCDice from '..';
import '../lib/diceBot/Cthulhu';

console.log(BCDice.games.find(game => game.gameType === 'Cthulhu'));

const bcdice = new BCDice();
const [result, rands] = bcdice.roll('CC', 'Cthulhu');
console.log(result, rands);
