const cards = ["💖", "💖", "😍", "😍", "💌", "💌", "💕", "💕", "💘", "💘", "💓", "💓"];
let flippedCards = [];
let matchedCards = [];


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const gameBoard = document.getElementById("game-board");
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
// flipcard logic
// 1. listen for the event target and store it
// 2. card shoud flip if it meets the following conditions:
//     - it should not be already flipped
//     - it should not be already matched
//    - there should not be more than 2 cards flipped
// 3. update text content from ? to the correct value
// 4.. if the card is flipped, add it to the flippedCards array
// 5. push my card
// 6. if the flippedCards array has 2 cards, check if they match
// 7. call it where it will be triggered , createBoard

function flipCard(event) {
    const card = event.target;
    if (!flippedCards.includes(card) && !matchedCards.includes(card) && flippedCards.length < 2) {
    card.textContent = card.dataset.value;
    card.classList.add("flipped");
    flippedCards.push(card);
    if (flippedCards.length === 2) {
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

// 1. to reset game we are resetting is the game board
// 2. get the #game-board element 
// 3. empty the element
// 4. empty flippedCards and matchedCards
// 5. call createBoard()

function resetGame(){
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  createBoard();
}

createBoard();

