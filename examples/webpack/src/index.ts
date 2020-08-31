import BCDice from 'bcdice';

const gameSelect = document.querySelector('#game') as HTMLInputElement;
const commandInput = document.querySelector('#command') as HTMLInputElement;
const rollButton = document.querySelector('#roll') as HTMLButtonElement;
const resultsContainer = document.querySelector('#results') as HTMLDivElement;

BCDice.infoList.map(info => {
  var option = document.createElement('option');
  option.innerText = info.gameName;
  option.value = info.gameType;
  return option;
}).forEach(o => gameSelect.appendChild(o));

rollButton.addEventListener('click', async () => {
  var bcdice = new BCDice();

  var gameType = gameSelect.value;
  await import(/* webpackChunkName: "diceBot" */ `../node_modules/bcdice/lib/diceBot/${gameType}`);

  var command = commandInput.value;
  const [result] = bcdice.roll(command, gameType);

  var resultContainer = document.createElement('div');
  resultContainer.innerText = result;
  resultsContainer.prepend(resultContainer);
});
