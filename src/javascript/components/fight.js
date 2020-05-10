import { controls } from '../../constants/controls';
import {showWinnerModal} from './modal/winner'

// import {fightersDetails} from '../helpers/mockData'
import {selectedFighters} from './fighterSelector'
let [leftHit, rightHit, leftBlock, rightBlock, leftCritical, rightCritical] = [false];
let [leftHit_value, rightHit_value, leftBlock_value, rightBlock_value, leftCritical_value, rightCritical_value] = [0,0,0,0,0,0];
let firstPlayerHealth
let secondPlayerHealth
let leftCriticalTimer_boolean = true;
let rightCriticalTimer_boolean = true;
let finishGame = false;

export async function fight(firstFighter, secondFighter) {
  firstPlayerHealth = firstFighter.health;
  secondPlayerHealth = secondFighter.health;
  console.log("Hit power: "+getHitPower(firstFighter), "Block power: "+getBlockPower(firstFighter));
  console.log("Hit power: "+getHitPower(secondFighter), "Block power: "+getBlockPower(secondFighter));
  
  // addKeysEvents(firstFighter, secondFighter);
  document.addEventListener('keydown', listenerCall(firstFighter, secondFighter))
  console.log("started");

  return new Promise((resolve) => {
    document.addEventListener('keydown', function(){
      setTimeout(() => {
        if ((firstPlayerHealth<=0 || secondPlayerHealth<=0) && !finishGame){
          finishGame = true;
          if (firstPlayerHealth<=0){
            resolve(showWinnerModal(secondFighter, 'right'))
          }
          if (secondPlayerHealth<=0){
            resolve(showWinnerModal(firstFighter, 'left'))
          }
        }
      },510);
    });
    
  })
}

    // resolve the promise with the winner when fight is over




export function getDamage(attacker, defender) {
  let rightHealthIndicator = document.querySelector('.arena___health-bar-right');
  let leftHealthIndicator = document.querySelector('.arena___health-bar-left');



  if ( ((leftHit||leftBlock||leftCritical) && (rightHit||rightBlock||rightCritical)) || (!(leftHit||leftBlock||leftCritical) && !(rightHit||rightBlock||rightCritical)) ){
    let leftDamage = leftHit_value + leftCritical_value - rightBlock_value
    let rightDamage = rightHit_value + rightCritical_value - leftBlock_value

    if(leftHit_value>rightBlock_value){
      secondPlayerHealth = secondPlayerHealth - leftDamage;
      if (secondPlayerHealth <= 0){
        rightHealthIndicator.style.width = '0px';
      } else{
        rightHealthIndicator.style.width = `${(secondPlayerHealth*100)/defender.health}%`;
      }

    }
    if(rightHit_value>leftBlock_value){
      firstPlayerHealth = firstPlayerHealth - rightDamage;
      if (firstPlayerHealth <= 0){
        leftHealthIndicator.style.width = `0px`;
      } else{
        leftHealthIndicator.style.width = `${(firstPlayerHealth*100)/attacker.health}%`;
      }
    
    }
    if(leftCritical_value || rightCritical_value){
      firstPlayerHealth = firstPlayerHealth - rightCritical_value;
      secondPlayerHealth = secondPlayerHealth - leftCritical_value;
      if (firstPlayerHealth <= 0){
        leftHealthIndicator.style.width = `0px`;
      } else{
        leftHealthIndicator.style.width = `${(firstPlayerHealth*100)/attacker.health}%`;
      }
      if (secondPlayerHealth <= 0){
        rightHealthIndicator.style.width = '0px';
      } else{
        rightHealthIndicator.style.width = `${(secondPlayerHealth*100)/defender.health}%`;
      }
    }
    let currentLeftHealthPerCent = (firstPlayerHealth*100)/attacker.health;
    let currentRightHealthPerCent = (secondPlayerHealth*100)/defender.health;
    if (currentLeftHealthPerCent<67){
      leftHealthIndicator.style.backgroundColor = 'orange';
    };
    if (currentLeftHealthPerCent<33){
      leftHealthIndicator.style.backgroundColor = 'red';
    };
    if (currentRightHealthPerCent<67){
      rightHealthIndicator.style.backgroundColor = 'orange';
    } ;
    if (currentRightHealthPerCent<33){
      rightHealthIndicator.style.backgroundColor = 'red';
    }


    console.log(firstPlayerHealth, secondPlayerHealth)
    
    leftHit_value = 0;
    rightHit_value = 0;
    leftBlock_value = 0;
    rightBlock_value = 0;
    leftCritical_value = 0;
    rightCritical_value = 0;
  }

}


export function getHitPower(fighter) {
  let criticalHitChance = getRandomFloat(1,2)
  // let criticalHitChance = 1
  let hit_power = fighter.attack*criticalHitChance
  return hit_power
}

export function getBlockPower(fighter) {
  let dodgeChance = getRandomFloat(1,2)
  // let dodgeChance = 1
  let block_powwer = fighter.defense*dodgeChance
  return block_powwer
}

export function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

export function listenerCall (firstFighter, secondFighter){

  return function keyPressFunction(event) {
    if (firstPlayerHealth>0 && secondPlayerHealth>0){
      // let fightWasStarted = false;
      let [KeyQ, KeyW, KeyE] = controls.PlayerOneCriticalHitCombination;
      let [KeyU, KeyI, KeyO] = controls.PlayerTwoCriticalHitCombination;

      switch (event.code) {

        //Left
        
        case `${controls.PlayerOneAttack}` :
          
          if (!leftHit && !leftBlock && !leftCritical) {
            leftHit = true;
            leftHit_value = getHitPower(firstFighter)
            console.log("Hit power: "+leftHit_value)
            getDamage( firstFighter, secondFighter )
            setTimeout(() => {
              leftHit = !leftHit;
              getDamage( firstFighter, secondFighter );
            }, 500);
          }
          break;
  
        case `${controls.PlayerOneBlock}` :
          if (!leftHit && !leftBlock && !leftCritical) {
            leftBlock = true;
            leftBlock_value = getBlockPower(firstFighter);
            console.log("Block power: "+leftBlock_value)
            getDamage( firstFighter, secondFighter )
            setTimeout(() => {
              leftBlock = !leftBlock;
              getDamage( firstFighter, secondFighter );
            }, 500);
          }
          break;
  
        case KeyQ && KeyW && KeyE:
          if (!leftHit && !leftBlock && !leftCritical && leftCriticalTimer_boolean) {
            leftCriticalTimer();
            leftCritical = true;
            leftCritical_value = 2*getHitPower(firstFighter);
            console.log("Left_critical: "+ leftCritical_value)
            getDamage( firstFighter, secondFighter )
            setTimeout(() => {
              leftCritical = !leftCritical;
              getDamage( firstFighter, secondFighter );
            }, 500);
          }
          break;
  
        ///Right
  
        case `${controls.PlayerTwoAttack}` :
          if (!rightHit && !rightBlock && !rightCritical) {
            rightHit = true;
            rightHit_value = getHitPower(secondFighter);
            console.log("Hit power: "+rightHit_value)
            getDamage( firstFighter, secondFighter )
            setTimeout(() => {
              rightHit = !rightHit;
              getDamage( firstFighter, secondFighter );
            }, 500);
          }
          break;
  
        case `${controls.PlayerTwoBlock}` :
          if (!rightHit && !rightBlock && !rightCritical) {
            rightBlock = true;
            rightBlock_value = getBlockPower(secondFighter);
            console.log("Block power: "+rightBlock_value)
            getDamage( firstFighter, secondFighter )
            setTimeout(() => {
              rightBlock = !rightBlock;
              getDamage( firstFighter, secondFighter );
            }, 500);
          }
          break;
  
        case KeyU && KeyI && KeyO:
  
          if (!rightHit && !rightBlock && !rightCritical && rightCriticalTimer_boolean) {
            rightCriticalTimer();
            rightCritical = true;
            rightCritical_value = 2*getHitPower(secondFighter);
            console.log("Right_critical: "+rightCritical_value)
            getDamage( firstFighter, secondFighter )
            setTimeout(() => {
              rightCritical = !rightCritical;
              getDamage( firstFighter, secondFighter );
            }, 500);
          }
          break;
      }
    }
    }
}

let leftCriticalTimer = function(){
  leftCriticalTimer_boolean = false;
  setTimeout(() => {
    leftCriticalTimer_boolean = true;
  }, 10000)

  let count = 0;
  let intervalId = setInterval(function(){
  count++;
  if(count == 1000){
    clearInterval(intervalId);
  }
  criticalRiser(count, '.arena___critical-bar-left');
  }, 10);
}

let rightCriticalTimer = function(){
  rightCriticalTimer_boolean = false;
  setTimeout(() => {
    rightCriticalTimer_boolean = true;
  }, 10000)

  let count = 0;
  let intervalId = setInterval(function(){
    count++;
    if(count == 1000){
      clearInterval(intervalId);
    }
    criticalRiser(count, '.arena___critical-bar-right');
    }, 10);
}

function criticalRiser(i, style){
  document.querySelector(style).style.width = `${(i+1)/10}%`
}
