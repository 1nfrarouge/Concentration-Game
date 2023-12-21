/*----- constants -----*/
const totalPairs = 6;
const SOURCE_CARDS = [
    { img: 'https://raw.githubusercontent.com/1nfrarouge/Concentration-Game/6369fdc7ec82d4c2e5a5785d3ec4c7cd169f73aa/strawberry.png', matched: false },
    { img: 'https://raw.githubusercontent.com/1nfrarouge/Concentration-Game/6369fdc7ec82d4c2e5a5785d3ec4c7cd169f73aa/apple.png', matched: false },
    { img: 'https://raw.githubusercontent.com/1nfrarouge/Concentration-Game/6369fdc7ec82d4c2e5a5785d3ec4c7cd169f73aa/blueberry.png', matched: false },
    { img: 'https://raw.githubusercontent.com/1nfrarouge/Concentration-Game/6369fdc7ec82d4c2e5a5785d3ec4c7cd169f73aa/cabbage.png', matched: false },
    { img: 'https://raw.githubusercontent.com/1nfrarouge/Concentration-Game/6369fdc7ec82d4c2e5a5785d3ec4c7cd169f73aa/carrot.png', matched: false },
    { img: 'https://raw.githubusercontent.com/1nfrarouge/Concentration-Game/6369fdc7ec82d4c2e5a5785d3ec4c7cd169f73aa/celery.png', matched: false },
];
const CARD_BACK_IMAGE = 'https://raw.githubusercontent.com/1nfrarouge/Concentration-Game/6369fdc7ec82d4c2e5a5785d3ec4c7cd169f73aa/cloud.png';

/*----- state variables -----*/
let shuffledCards;
let pairsFound = 0; 
let firstCard = null;
let isClickable = true;
let wrongGuesses = 0;

/*----- cached elements -----*/
const board = document.querySelector('.board');
const pairsFoundElement = document.getElementById('pairs-found');
const wrongGuessesElement = document.getElementById('wrong-guesses');
const winnerPopup = document.getElementById('winner-popup');
const loserPopup = document.getElementById('loser-popup');
const playAgainButton = document.getElementById('play-again');

/*----- event listeners -----*/
board.addEventListener('click', handleCardClick);
playAgainButton.addEventListener('click', handlePlayAgainClick);

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
        checkForWin();
    } else {
        wrongGuesses++;
        wrongGuessesElement.textContent = wrongGuesses;
        isClickable = false;
        setTimeout(() => {
            flipCard(card1);
            flipCard(card2);
            isClickable = true;
            checkForLoss();
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

// Check for Loss
function checkForLoss() {
    if(wrongGuesses >= 6) {
        displayLoserPopup();
    }
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
    shuffledCards = generateShuffleCards(); 
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

// Displaying Winner pop-up
function displayWinnerPopup() {
    const winnerPopup = document.getElementById('winner-popup');
    winnerPopup.style.display = 'block'
}

// Display Lose pop-up
function displayLoserPopup() {
    const loserPopup = document.getElementById('loser-popup');
    loserPopup.style.display = 'block'
}

// Hide Pop-up
function hidePopups() {
    winnerPopup.style.display = 'none';
    loserPopup.style.display = 'none';
}

// Handle Play again button click
function handlePlayAgainClick() {
    console.log('Play Again button clicked');
    init();
}