import {showModal} from './modal'
export function showWinnerModal(fighter) {
  // call showModal function 
  let showWinnerHtml = function(fighter){
    let winnerHtml = document.createElement('div');
    winnerHtml.className = "winner-block";
    winnerHtml.insertAdjacentHTML('afterbegin', `<img class="winner-block_img" src="${fighter.source}" alt="winner">`)
    return winnerHtml
  }
  showModal({title: `Winner: ${fighter.name}`, bodyElement: showWinnerHtml(fighter)});
}
