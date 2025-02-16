const cards = ["💖", "💖", "😍", "😍", "💌", "💌", "💕", "💕", "💘", "💘", "💓", "💓"];
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;

let timerInterval;


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const gameBoard = document.getElementById("game-board");

  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];

  moveCount = 0;
  updateMoveCounter();

  stopTimer();
  timeElapsed = 0;
  updateTimeCounter();
  startTimer();
  

  const shuffledCards = shuffle(cards);
  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.index = index;
    cardElement.dataset.value = card;
    cardElement.textContent = "?";
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function updateMoveCounter() {
  const counterElement = document.getElementById("move-counter");
  if (counterElement) {
    counterElement.textContent = moveCount;
  }
}

function updateTimeCounter() {
  const timeCounterElement = document.getElementById("time-counter");
  if (timeCounterElement) {
    timeCounterElement.textContent = `${timeElapsed} sec`;
  }
}

/**
 * Starts the timer that increments the elapsed time every second.
 */
function startTimer() {
  timerInterval = setInterval(() => {
    timeElapsed++;
    updateTimeCounter();
  }, 1000);
}

/**
 * Stops the timer.
 */
function stopTimer() {
  clearInterval(timerInterval);
}


/**
* Listen for click and flip card
*/

function flipCard(event) {
    const card = event.target;
    if (!flippedCards.includes(card) && !matchedCards.includes(card) && flippedCards.length < 2) {
    card.textContent = card.dataset.value;
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moveCount++;
        updateMoveCounter();
        checkMatch();
      }
    }
}

// logic to check if the cards match

function checkMatch (){
  const [card1, card2] = flippedCards;
  if(card1.dataset.value === card2.dataset.value){
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedCards.push(card1, card2);
      flippedCards = [];
      if(matchedCards.length === cards.length){
          stopTimer();
          setTimeout(() =>{
            alert("🥳🥳 Yay! You've matched all the hearts! Happy Valentine!❤️")
          }, 600);
      }
  }else{
      setTimeout(() => {
      card1.textContent = "?";
      card2.textContent = "?";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      }, 1000);
  }
}


/**
 * reset the game
 */

function resetGame(){
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  createBoard();
}

createBoard();

