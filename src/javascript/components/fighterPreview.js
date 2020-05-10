import { createElement } from '../helpers/domHelper';
import {getFighterInfo} from './fighterSelector'

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  // fighterElement.append(createFighterHtml())
 
  let createFighterHtml = function(fighter){
    let fighterkeys = Object.keys(fighter).reverse()
    let fighterDiv = document.createElement('div');
    fighterDiv.className = "fighter-info";
    fighterkeys.forEach(element => {
      if (element != '_id' & element != 'source'){
        fighterDiv.insertAdjacentHTML('afterbegin', `<div class="fighter-info_detales"><p class="fighter-info_detales__title">${element}: </p> <p class="fighter-info_detales__value">${fighter[element]}</p></div>`)
      }
    });
    fighterElement.append(fighterDiv, createFighterImage(fighter))
  }
  createFighterHtml(fighter);

  return fighterElement;
}

export function createFighterImage(fighter) {



  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
