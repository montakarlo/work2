import { createElement } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight } from './fight'
import {showWinnerModal} from './modal/winner'


export function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);

  root.innerHTML = '';
  root.append(arena);

  // todo:
  // - start the fight
  // - when fight is finished show winner
  
  fight(selectedFighters[0],selectedFighters[1])

}

function createArena(selectedFighters) {
  const arena = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);
  
  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status', attributes: { id: 'top_indicators'}});
  const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

function createHealthIndicator(fighter, position) {
  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
  const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const indicator2 = createElement({ tagName: 'div', className: 'arena___critical-indicator' });
  const indicator3 = createElement({ tagName: 'div', className: 'arena___critical-hit' });
  const indicator4 = createElement({ tagName: 'div', className: 'arena___hit' });
  const indicator5 = createElement({ tagName: 'div', className: 'arena___block' });


  const bar = createElement({ tagName: 'div', className: `arena___health-bar-${position}`, attributes: { id: `${position}-fighter-indicator` }});
  const bar2 = createElement({ tagName: 'div', className: `arena___critical-bar-${position}`, attributes: { id: `${position}-critical-indicator` }});
  const bar3 = createElement({ tagName: 'img', className: `arena___critical-hit-${position}`, attributes: {src: 'https://i.4pcdn.org/pol/1565691234779.png'}});
  const bar4 = createElement({ tagName: 'img', className: `arena___hit-${position}`, attributes: {src: 'https://bluedragonjournaldotcom.files.wordpress.com/2018/06/boom-banner.png?w=328'}});
  const bar5 = createElement({ tagName: 'img', className: `arena___block-${position}`, attributes: {src: 'https://i.ya-webdesign.com/images/clip-button-internal-spring-15.png'}});


  fighterName.innerText = name;
  indicator.append(bar);
  indicator2.append(bar2);
  indicator3.append(bar3)
  indicator4.append(bar4)
  indicator5.append(bar5)


  container.append(fighterName, indicator, indicator2, indicator3, indicator4, indicator5);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`,
  });

  fighterElement.append(imgElement);
  return fighterElement;
}
