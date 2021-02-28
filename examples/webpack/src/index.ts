import Version from 'bcdice/lib/version'; // import under 'bcdice/lib' to avoid huge bundle...
import WebpackLoader from './WebpackLoader';

const bcdiceVersion = document.body.querySelector('#bcdice-version') as HTMLDivElement;
bcdiceVersion.innerText = Version;

const loader = new WebpackLoader();

function createGameSystemSelect(): HTMLSelectElement {
  const select = document.createElement('select');


  loader.listAvailableGameSystems().forEach(info => {
    const option = document.createElement('option');
    option.innerText = info.name;
    option.value = info.id;

    select.appendChild(option);
  });

  return select;
}
const gameSystemSelect = createGameSystemSelect();
document.body.querySelector('#game-system-select')?.appendChild(gameSystemSelect);

const command = document.body.querySelector('#command') as HTMLInputElement;
const results = document.body.querySelector('#results') as HTMLDivElement;

document.body.querySelector('#roll')?.addEventListener('click', async () => {
  const GameSystem = await loader.dynamicLoad(gameSystemSelect.value);
  console.log(GameSystem.NAME);
  console.log(GameSystem.HELP_MESSAGE);

  const result = GameSystem.eval(command.value);
  console.log(result);

  if (!result) return;

  const p = document.createElement('p');
  p.innerText = result?.text;
  results.appendChild(p);
});
