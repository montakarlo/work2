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
  // console.log('Champion info: + {info}'.replace('{info}', await JSON.stringify(fighterService.getFighterDetails(fighterId))))

  // console.log('Champion info: + {info}'.replace('{info}', await fighterService.getFighterDetails(fighterId)))
  // get fighter info from fighterDetailsMap or from service and write it to fighterDetailsMap
  let champ_info_obj = fighterService.getFighterDetails(fighterId)
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

function createVersusBlock(selectedFighters) {
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

function startFight(selectedFighters) {
  renderArena(selectedFighters);
}







