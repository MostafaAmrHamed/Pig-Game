/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying;

init();


document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //Random number
        var dice = Math.floor(Math.random() *6 ) +1;
        var dice2 = Math.floor(Math.random() *6 ) +1;

        //Display the result
        var diceDOM = document.querySelector('.dice');
        var dice2DOM = document.querySelector('#dice2');

        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';
    
        if(dice !== 1 && dice2 !== 1){
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{
            //Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        //Add Current score to global score
        scores[activePlayer] += roundScore;
    
        //Update Global score
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        if(input){
            winningScore = input;
        }
        else{
            winningScore = 100;
        }

        //Check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';
            gamePlaying = false;
        }
        else{
            //Next Player
            nextPlayer();
        }
    } 
});

document.querySelector('.btn-new').addEventListener('click',init);

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';

    document.querySelector('#name-0').textContent = "Player 1";
    document.querySelector('#name-1').textContent = "Player 2";

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    //IGN();
}
/*
function IGN(){
    var  player1, player2;
    player1 = prompt(`Player-One: Enter your "Name"`);
    if(player1 === null || player1 === '')
        document.querySelector('#name-0').textContent = "Player 1";
    else
        document.querySelector('#name-0').textContent = player1;


    player2 = prompt(`Player-Two: Enter your "Name"`);
    if(player2 === null || player2 === '')
        document.querySelector('#name-1').textContent = "Player 2";
    else
        document.querySelector('#name-1').textContent = player2;
}*/