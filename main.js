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
init();
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
    cardsFlipped++;
    if (cardsFlipped === 2) {
        checkForMatch();
    }
}

// Check for Match
function checkForMatch() {
    const flippedCards = document.querySelectorAll('.flipped');
    const [card1, card2] = flippedCards;
    if (card1.textContent === card2.textContent) {
        pairsFound++;
        pairsFoundElement.textContent = pairsFound;
        checkForWin();
    } else {
        setTimeout

    }
}

// Check for Win
function checkForWin() {
    if (pairsFound === totalPairs) {
        displayWinnerPopup();
    }
}

// Reset Game
function resetGame() {
    pairsFound = 0;
    cardsFlipped = 0;
    isClickable = 0;
    wrongGuesses = 0;

    pairsFoundElement.textContent = pairsFound;
    wrongGuessesElement.textContent = wrongGuesses;

    resetBoard();

    const popups = document.querySelectorAll('.pop-up')
    popups.forEach((popup) => {
        popup.style.display = 'none';
    });
}

// Reset Board
function resetBoard() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.classList.remove('.flipped')
    });
    const shuffledCards = generateShuffleCards();
    renderCards(shuffledCards);
}

// Shuffle Cards
function generateShuffleCards() {
    const symbols = [];
    const allCards = symbols.concat(symbols);
}

// Shuffle Array

// Render Cards on Board

// Call resetGame
resetGame();