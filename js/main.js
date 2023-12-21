/*----- constants -----*/
const totalPairs = 6;
const SOURCE_CARDS = [
    { img: 'https://github.com/1nfrarouge/Concentration-Game/blob/main/BlueBerry.png?raw=true', matched: false },
    { img: 'https://github.com/1nfrarouge/Concentration-Game/blob/main/BokChoy.png?raw=true', matched: false },
    { img: 'https://github.com/1nfrarouge/Concentration-Game/blob/main/Cabbage.png?raw=true', matched: false },
    { img: 'https://github.com/1nfrarouge/Concentration-Game/blob/main/Carrot.png?raw=true', matched: false },
    { img: 'https://github.com/1nfrarouge/Concentration-Game/blob/main/Kale.png?raw=true', matched: false },
    { img: 'https://github.com/1nfrarouge/Concentration-Game/blob/main/Strawberry.png?raw=true', matched: false },
];
const CARD_BACK_IMAGE = 'https://github.com/1nfrarouge/Concentration-Game/blob/main/Cloud.png?raw=true';

/*----- state variables -----*/
let shuffledCards;
let pairsFound = 0; // Add this variable
let firstCard = null;
let isClickable = true;
let wrongGuesses = 0;

/*----- cached elements -----*/
const board = document.querySelector('.board');
const pairsFoundElement = document.getElementById('pairs-found');
const wrongGuessesElement = document.getElementById('wrong-guesses');

/*----- event listeners -----*/
board.addEventListener('click', handleCardClick);

/*----- functions -----*/
init();

// Initialize the Game
function init() {
    shuffledCards = generateShuffleCards();
    renderCards();
    resetGameStats();
    console.log('Game initialize');
}

// Card Click
function handleCardClick(event) {
    if (!isClickable || event.target.className !== 'card') return;
    const clickedCard = event.target;
    
    // Check if the card is already flipped or it's the same card
    if (clickedCard.classList.contains('flipped') || clickedCard === firstCard) return;

    flipCard(clickedCard);

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        checkForMatch(clickedCard, firstCard);
        firstCard = null;
    }
}

// Flip Card
function flipCard(card) {
    card.classList.toggle('flipped');
    const cardIndex = parseInt(card.id.replace('card', ''));

    // Get the correct image URL from the shuffledCards array
    card.src = card.classList.contains('flipped') ? shuffledCards[cardIndex].img : CARD_BACK_IMAGE;
    console.log('Card flipped');
}

// Check for Match
function checkForMatch(card1, card2) {
    const index1 = parseInt(card1.id.replace('card', ''));
    const index2 = parseInt(card2.id.replace('card', ''));
    if (index1 === index2) return; // Same Card clicked

    if (shuffledCards[index1].img === shuffledCards[index2].img) {
        pairsFound++;
        pairsFoundElement.textContent = pairsFound;
        if (pairsFound === totalPairs) displayWinnerPopup();
    } else {
        wrongGuesses++;
        wrongGuessesElement.textContent = wrongGuesses;
        isClickable = false;
        setTimeout(() => {
            flipCard(card1);
            flipCard(card2);
            isClickable = true;
        }, 2000);
    }
    console.log('Checking for match');
}

// Check for Win
function checkForWin() {
    if (pairsFound === totalPairs) {
        displayWinnerPopup();
    }
    console.log('Check for win');
}

// Reset Game
function resetGameStats() {
    pairsFound = wrongGuesses = 0;
    pairsFoundElement.textContent = pairsFound;
    wrongGuessesElement.textContent = wrongGuesses;
    console.log('Reset game');
}

// Reset Board
function resetBoard() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.classList.remove('flipped');
    });
    shuffledCards = generateShuffleCards(); // Update the global shuffledCards
    renderCards();
    console.log(shuffledCards);
}

// Shuffle Cards
function generateShuffleCards() {
    let tempCards = [...SOURCE_CARDS, ...SOURCE_CARDS];
    shuffleArray(tempCards);
    return tempCards;
}

// Shuffle Array
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    console.log('Array shuffled');
}

// Render Cards on Board
function renderCards() {
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((card, index) => {
        card.src = CARD_BACK_IMAGE;
        card.classList.remove('flipped');
        card.id = `card${index}`;
    });
    console.log('Rendering cards');
}