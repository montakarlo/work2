import { controls } from '../../constants/controls';
import {showWinnerModal} from './modal/winner'

// import {fightersDetails} from '../helpers/mockData'
import {selectedFighters} from './fighterSelector'
let [leftHit, rightHit, leftBlock, rightBlock, leftCritical, rightCritical, rightBlockFromCritical, leftBlockFromCritical] = [false, false, false, false, false, false];
let [leftHit_value, rightHit_value, leftBlock_value, rightBlock_value, leftCritical_value, rightCritical_value] = [0,0,0,0,0,0];
let firstPlayerHealth
let secondPlayerHealth
export let leftCriticalTimer_boolean = true;
export let rightCriticalTimer_boolean = true;
let finishGame = false;

export async function fight(firstFighter, secondFighter) {
  [leftHit, rightHit, leftBlock, rightBlock, leftCritical, rightCritical, rightBlockFromCritical, leftBlockFromCritical] = [false, false, false, false, false, false];
  [leftHit_value, rightHit_value, leftBlock_value, rightBlock_value, leftCritical_value, rightCritical_value] = [0,0,0,0,0,0];
  firstPlayerHealth
  secondPlayerHealth
  leftCriticalTimer_boolean = true;
  rightCriticalTimer_boolean = true;
  finishGame = false;

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
            document.querySelector('.arena___left-fighter>img').style.display = 'none';

            // document.getElementById('top_indicators')?.remove();

          }
          if (secondPlayerHealth<=0){
            resolve(showWinnerModal(firstFighter, 'left'))
            document.querySelector('.arena___right-fighter>img').style.display = 'none';
            // document.getElementById('top_indicators')?.remove();

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

  if ( ((leftHit||leftBlock||leftCritical) && (rightHit||rightBlock||rightCritical)) || (!(leftHit||leftBlock||leftCritical) && !(rightHit||rightBlock||rightCritical)) || (leftCritical&&!leftHit&&!leftBlock)||(rightCritical&&!rightHit&&!rightBlock)){
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


    // console.log(firstPlayerHealth, secondPlayerHealth)
    
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
            document.querySelector('.arena___left-fighter').style.left = `${document.documentElement.clientWidth-600}px`
            document.querySelector('.arena___hit-left').style.display = 'block';

            setTimeout(() => {
              leftHit = !leftHit;
              getDamage( firstFighter, secondFighter );
              document.querySelector('.arena___left-fighter').style.left = '0'
              document.querySelector('.arena___hit-left').style.display = 'none';
            }, 500);
          }
          break;
        case `${controls.PlayerOneBlock}` :
          if (!leftHit && !leftBlock && !leftCritical && !leftBlockFromCritical) {
            leftBlock = true;
            leftBlock_value = getBlockPower(firstFighter);
            console.log("Block power: "+leftBlock_value)
            getDamage( firstFighter, secondFighter )
            document.querySelector('.arena___left-fighter').style.bottom = '960px'
            document.querySelector('.arena___block-left').style.display = 'block';
            setTimeout(() => {
              leftBlock = !leftBlock;
              getDamage( firstFighter, secondFighter );
              document.querySelector('.arena___left-fighter').style.bottom = '550px'
             document.querySelector('.arena___block-left').style.display = 'none';
            }, 500);
          }
          break;
  
        case KeyQ && KeyW && KeyE:
          if (!leftHit && !leftBlock && !leftCritical && leftCriticalTimer_boolean) {

          
            leftCriticalTimer();
            leftCritical = true;
            rightBlockFromCritical = true;
            leftCritical_value = 2*getHitPower(firstFighter);
            console.log("Left_critical: "+ leftCritical_value)
            getDamage( firstFighter, secondFighter )
            document.querySelector('.arena___left-fighter').style.left = `${document.documentElement.clientWidth-600}px`
            document.querySelector('.arena___left-fighter').style.transition = "all 0.1s";
            document.querySelector('.arena___left-fighter>img').style.height = '520px';
            document.querySelector('.arena___left-fighter>img').style.transition = "all 0.1s";
            document.querySelector('.arena___critical-hit-left').style.display = 'block';

            setTimeout(() => {
              leftCritical = !leftCritical;
              rightBlockFromCritical = !rightBlockFromCritical
              getDamage( firstFighter, secondFighter );
              document.querySelector('.arena___left-fighter').style.left = '0'
              document.querySelector('.arena___left-fighter').style.transition = "all 0.5s"
              document.querySelector('.arena___left-fighter>img').style.height = '430px'
              document.querySelector('.arena___left-fighter>img').style.transition = "all 0.5s";
              document.querySelector('.arena___critical-hit-left').style.display = 'none';
            }, 500);
            // if (secondPlayerHealth>0){
            //   leftCriticalTimer();
            //   leftCritical = true;
            // } 
            // if (firstPlayerHealth>0){
            //   leftCritical = true
            // }
          }
          break;
  
        ///Right
  
        case `${controls.PlayerTwoAttack}` :
          if (!rightHit && !rightBlock && !rightCritical) {
            rightHit = true;
            rightHit_value = getHitPower(secondFighter);
            console.log("Hit power: "+rightHit_value)
            getDamage( firstFighter, secondFighter )
            document.querySelector('.arena___right-fighter').style.right = `${document.documentElement.clientWidth-600}px`
            document.querySelector('.arena___hit-right').style.display = 'block';


            setTimeout(() => {
              rightHit = !rightHit;
              getDamage( firstFighter, secondFighter );
              document.querySelector('.arena___right-fighter').style.right = '0';
              document.querySelector('.arena___hit-right').style.display = 'none';


            }, 500);
          }
          break;
  
        case `${controls.PlayerTwoBlock}` :
          if (!rightHit && !rightBlock && !rightCritical && !rightBlockFromCritical) {
            rightBlock = true;
            rightBlock_value = getBlockPower(secondFighter);
            console.log("Block power: "+rightBlock_value)
            getDamage( firstFighter, secondFighter )
            document.querySelector('.arena___right-fighter').style.bottom = '960px'
            document.querySelector('.arena___block-right').style.display = 'block';



            setTimeout(() => {
              rightBlock = !rightBlock;
              getDamage( firstFighter, secondFighter );
              document.querySelector('.arena___right-fighter').style.bottom = '550px'
              document.querySelector('.arena___block-right').style.display = 'none';

          }, 500);
          }
          break;
  
        case KeyU && KeyI && KeyO:
  
          if (!rightHit && !rightBlock && !rightCritical && rightCriticalTimer_boolean) {
            rightCriticalTimer();
            rightCritical = true;
            leftBlockFromCritical = true;

            rightCritical_value = 2*getHitPower(secondFighter);
            console.log("Right_critical: "+rightCritical_value)
            getDamage( firstFighter, secondFighter )
            document.querySelector('.arena___right-fighter').style.right = `${document.documentElement.clientWidth-600}px`
            document.querySelector('.arena___right-fighter').style.transition = "all 0.1s"
            document.querySelector('.arena___right-fighter>img').style.height = '520px';
            document.querySelector('.arena___right-fighter>img').style.transition = "all 0.1s";
            document.querySelector('.arena___critical-hit-right').style.display = 'block';

            setTimeout(() => {
              rightCritical = !rightCritical;
              leftBlockFromCritical =!leftBlockFromCritical;
              getDamage( firstFighter, secondFighter );
              document.querySelector('.arena___right-fighter').style.right = '0';
              document.querySelector('.arena___right-fighter').style.transition = "all 0.5s"
              document.querySelector('.arena___right-fighter>img').style.height = '430px'
              document.querySelector('.arena___right-fighter>img').style.transition = "all 0.5s";
              document.querySelector('.arena___critical-hit-right').style.display = 'none';
            }, 500);
            // if (firstPlayerHealth>0){
            //   rightCriticalTimer();
            //   rightCritical = true;
            // } 
            // if (firstPlayerHealth>0){
            //   rightCritical = true
            // }
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
