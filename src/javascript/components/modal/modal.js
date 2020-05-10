import { createElement } from '../../helpers/domHelper';
import {fightersForFight, startFight} from '../fighterSelector';
import {leftCriticalTimer_boolean, rightCriticalTimer_boolean} from '../fight';
import {massageModal} from '../modal/winner'

export function showModal({ title, bodyElement, onClose = () => {} }) {
  const root = getModalContainer();
  const modal = createModal({ title, bodyElement, onClose }); 
  
  root.append(modal);
}

function getModalContainer() {
  return document.getElementById('root');
}

function createModal({ title, bodyElement, onClose }) {
  const layer = createElement({ tagName: 'div', className: 'modal-layer' });
  const modalContainer = createElement({ tagName: 'div', className: 'modal-root' });
  const header = createHeader(title, onClose);

  modalContainer.append(header, bodyElement);
  layer.append(modalContainer);

  return layer;
}
let windowCounter = true
function createHeader(title, onClose) {
  const headerElement = createElement({ tagName: 'div', className: 'modal-header' });
  const titleElement = createElement({ tagName: 'span' });
  const closeButton = createElement({ tagName: 'div', className: 'close-btn' });
  const restartButton = createElement({ tagName: 'div', className: 'restart-btn' });

  
  titleElement.innerText = title;
  closeButton.innerText = '×';
  restartButton.innerText = 'RESTART';
  
  const close = () => {
    hideModal();
    onClose();
    document.location.reload(true);
  }

  const res = () => {
    // hideModal();
    // onClose();
    // console.log(fightersForFight);
    if (leftCriticalTimer_boolean && rightCriticalTimer_boolean){
      hideModal();
      onClose();
      startFight(fightersForFight);
      windowCounter =true;
    } else if (windowCounter) {
        massageModal();
        windowCounter = false;
    }
  }
  
  closeButton.addEventListener('click', close);
  restartButton.addEventListener('click', res, false);
  headerElement.append(title, restartButton, closeButton);


  return headerElement;
}


function hideModal() {
  const modal = document.getElementsByClassName('modal-layer')[0];
  modal?.remove();
  // document.getElementById('top_indicators')?.remove();
}
