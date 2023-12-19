/*----- constants -----*/
const totalPairs = 6;

/*----- state variables -----*/
let pairsFound = 0;
let cardsFlipped = 0;
let isClickable = true;
let wrongGuesses = 0;

/*----- cached elements -----*/
const board = document.querySelector('.board');
const pairsFoundElement = document.getElementById('pairs-found');
const wrongGuessesElement = document.getElementById('wrong-guesses');
const timeRemainingElement = document.getElementById('time-remaining');

/*----- event listeners -----*/
board.addEventListener('click', handleCardClick);

/*----- functions -----*/

// Card Click
function handleCardClick(event) {
    const card = event.target;
    if (isClickable && card.classList.contains('card') && !card.classList.contains('flipped')) {
        flipCard(card);
    }
}

// Flip Card
function flipCard(card) {
    card.classList.add('flipped');
}