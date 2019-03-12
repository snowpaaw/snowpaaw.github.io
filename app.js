/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying, pastDice, diceDOM, currentDice;
//dice = Math.floor(Math.random()*6) + 1;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
newGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        
        rollDice();
     
        
    }
});
document.querySelector('.btn-hold').addEventListener('click',function(){
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    
    if (scores[activePlayer] >= 20){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
       document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gamePlaying = false;
        
    }
    else{
        nextPlayer();
    }
    
});
document.querySelector('.btn-new').addEventListener('click',newGame);
function nextPlayer(){
    //document.querySelector('.dice').style.display = 'none';
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
function newGame(){
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
     document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}
function rollDice(){
    diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    var id = setInterval(frame,100);
    var i = 1;
    function frame(){
        if (i >=7){
            clearInterval(id);
            currentDice = Math.floor(Math.random()*6) + 1;
            diceDOM.src = 'dice-' + currentDice + '.png'; // pictures of dices
            if ((pastDice ==6 && currentDice == 6) | currentDice == 1){
                nextPlayer();
            }
            else{
                roundScore +=currentDice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
            pastDice = currentDice;
            
        }else{
            
            diceDOM.src = 'dice-' + i + '.png';
            i++;
        }
        
    }
}