import {showModal} from './modal'
<<<<<<< Updated upstream
export function showWinnerModal(fighter) {
=======
import {listenerCall} from '../fight'
export function showWinnerModal(fighter, position) {
>>>>>>> Stashed changes
  // call showModal function 
  let showWinnerHtml = function(fighter){
    let winnerHtml = document.createElement('div');
    winnerHtml.className = "winner-block";
<<<<<<< Updated upstream
    winnerHtml.insertAdjacentHTML('afterbegin', `<img class="winner-block_img" src="${fighter.source}" alt="winner">`)
    return winnerHtml
  }
  showModal({title: `Winner: ${fighter.name}`, bodyElement: showWinnerHtml(fighter)});
=======
    winnerHtml.insertAdjacentHTML('afterbegin', `<img class="winner-block_img-${position}" src="${fighter.source}" alt="winner">`)
    return winnerHtml
  }
  if(position == 'right'){
    showModal({title: `Winner: ${fighter.name}`, bodyElement: showWinnerHtml(fighter, position)});

  } else{
    showModal({title: `Winner: ${fighter.name}`, bodyElement: showWinnerHtml(fighter, position)});
  }
  // console.log('finish')

>>>>>>> Stashed changes
}
