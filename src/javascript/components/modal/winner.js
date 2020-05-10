import {showModal} from './modal'

import {listenerCall} from '../fight'
export function showWinnerModal(fighter, position) {
  // call showModal function 
  let showWinnerHtml = function(fighter){
    let winnerHtml = document.createElement('div');
    winnerHtml.className = "winner-block";

    winnerHtml.insertAdjacentHTML('afterbegin', `<img class="winner-block_img-${position}" src="${fighter.source}" alt="winner">`)
    return winnerHtml
  }
  if(position == 'right'){
    showModal({title: `Winner: ${fighter.name}`, bodyElement: showWinnerHtml(fighter, position)});

  } else{
    showModal({title: `Winner: ${fighter.name}`, bodyElement: showWinnerHtml(fighter, position)});
  }
  // console.log('finish')

}
