import { controls } from '../../constants/controls';
import {showWinnerModal} from './modal/winner'


export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    
    resolve (showWinnerModal(firstFighter))
  });
}

export function getDamage(attacker, defender) {
  // return damage
}

export function getHitPower(fighter) {
  // return hit power
}

export function getBlockPower(fighter) {
  // return block power
}
