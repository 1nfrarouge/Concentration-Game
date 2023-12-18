/*----- constants -----*/
const totalPairs = 6;

/*----- state variables -----*/
let pairsFound = 0;
let cardsFlipped = 0;
let isClickable = true;
let wrongGuesses = 0;

/*----- cached elements -----*/

/*----- event listeners -----*/

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