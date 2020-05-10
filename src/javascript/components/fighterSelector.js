import { createElement } from '../helpers/domHelper';
import { renderArena } from './arena';
import versusImg from '../../../resources/versus.png';
import { createFighterPreview } from './fighterPreview';
import { callApi } from '../helpers/apiHelper';
import {fighterService} from '../services/fightersService'

import { getDamage } from './fight';

export function createFightersSelector() {
  let selectedFighters = [];

  return async (event, fighterId) => {
    const fighter = await getFighterInfo(fighterId);
    const [playerOne, playerTwo] = selectedFighters;
    const firstFighter = playerOne ?? fighter;
    const secondFighter = Boolean(playerOne) ? playerTwo ?? fighter : playerTwo;
    selectedFighters = [firstFighter, secondFighter];
    // if (secondFighter){
    //   renderSelectedFighters(selectedFighters);
    // }
    renderSelectedFighters(selectedFighters);

  };
}

const fighterDetailsMap = new Map();

let stop = false

export async function getFighterInfo(fighterId) {
  let champ_info_obj = await fighterService.getFighterDetails(fighterId)
  Object.keys(champ_info_obj).forEach(element => {
    fighterDetailsMap.set(element, champ_info_obj[element]);
  });
  console.log(`Map is here: `, fighterDetailsMap)

  return champ_info_obj
}

function renderSelectedFighters(selectedFighters) {
  const fightersPreview = document.querySelector('.preview-container___root');
  const [playerOne, playerTwo] = selectedFighters;

  if (!stop){
    if (playerTwo){
      const secondPreview = createFighterPreview(playerTwo, 'right');
      const versusBlock = createVersusBlock(selectedFighters);
      fightersPreview.append(versusBlock, secondPreview);
      stop = true
    }else if (playerOne){
      const firstPreview = createFighterPreview(playerOne, 'left');
      fightersPreview.append(firstPreview);
    }
  }

  // const versusBlock = createVersusBlock(selectedFighters);

  // fightersPreview.innerHTML = '';
  // if (playerOne){
  //   fightersPreview.append(firstPreview);
  // }
  // if (playerTwo){
  //   const versusBlock = createVersusBlock(selectedFighters);
  //   fightersPreview.append(versusBlock, secondPreview);
  // }
  // fightersPreview.append(firstPreview, versusBlock, secondPreview);
}

export let fightersForFight = [];

function createVersusBlock(selectedFighters) {
  fightersForFight.push(selectedFighters[0], selectedFighters[1]);
  const canStartFight = selectedFighters.filter(Boolean).length === 2;
  const onClick = () => startFight(selectedFighters);
  const container = createElement({ tagName: 'div', className: 'preview-container___versus-block' });
  const image = createElement({
    tagName: 'img',
    className: 'preview-container___versus-img',
    attributes: { src: versusImg },
  });
  const disabledBtn = canStartFight ? '' : 'disabled';
  const fightBtn = createElement({
    tagName: 'button',
    className: `preview-container___fight-btn ${disabledBtn}`,
  });

  fightBtn.addEventListener('click', onClick, false);
  fightBtn.innerText = 'Fight';
  container.append(image, fightBtn);

  return container;
}

export function startFight(selectedFighters) {
  renderArena(selectedFighters);
}
