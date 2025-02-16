# Match the Hearts: Technical Analysis

## Game Overview

`Match the Hearts` is a web-based memory matching game where players are challenged to pair matching cards in a shuffled 4x3 grid. Each card hides an emoji, and the player clicks on cards two at a time to reveal their values. If the two selected cards match, they remain face-up; if not, they are flipped back to hide the values again. The game continues until all pairs are successfully matched. A reset button is provided to restart the game—clearing the board, reshuffling the cards, and resetting the state.

#### Key Features

- **Shuffling:** Shuffling algorithm randomizes cards on every `createBoard` function call.
```javascript
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
```

- **Card Flipping:** Click event reveal cards values, with logic to make sure that not more than 2 cards are flipped before each `checkMatch` function is called.

```javascript
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
```

- **Match Checking:** Compares the values of two flipped cards to determine a match.
```javascript
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
        } else{
            setTimeout(() => {
            card1.textContent = "?";
            card2.textContent = "?";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
            }, 1000);
        }
    }
```

- **Reset Game:** Resets the game board, reshuffles the cards, and clears the state for a new game on every `Reset Game` button click.
```bash
    function resetGame(){
        const gameBoard = document.getElementById("game-board");
        gameBoard.innerHTML = "";
        flippedCards = [];
        matchedCards = [];
        createBoard();
    }
```


## Audit reason

In this article, we will perform a code analysis of the `Match the Hearts` game. Our objective is to take a look at the underlying coding principles and practices, assess the overall quality of the implementation, and suggest potential feature enhancements. Our main reference framework will be [Clean Code by Robert C. Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/). For a concise summary of the book’s main points, you can refer [here](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29).


## Principles and Practices Used

The code utilizes a couple of core principles and practices:

- **Single Responsibility:**
Each function is designed with a clear, defined purpose. This makes the code more maintainable and easier to debug.

- **Step-down Rule:**
The program is organized so that you can read it from top to bottom, "descending one level of abstraction at a time." This enhances overall readability.

- **Use of Function Arguments:**
Following our framework, functions should ideally have zero arguments, with one to two arguments being acceptable when necessary. The game's code keeps functions like `flipCard` at one argument and every other function argument, argument-less.

- **Event-Driven Programming:**
The game uses event listeners to respond to user interactions (e.g., card clicks), ensuring that the UI dynamically reflects the player's actions.

- **Data Encapsulation via DOM Attributes:**
By utilizing data attributes (data-index and data-value) on card elements, the code effectively ties data to its visual representation, simplifying DOM manipulation and state management.


## Areas for Probable Improvement

Based on the `Clean Code` framework, here are some suggestions that would make sense to add in:

- **Smaller Function Blocks**: We could reduce the nested blocks of code within the `checkMatch` function to one-line statements. These statements would be function calls. This not only reduces the lines of code within the function but improves readability and testing since our functions now have clearer purposes. As per the suggestion, "Functions should not be large enough to hold nested structures".

```javascript
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    handleMatchingPair(card1, card2);
  } else {
    handleNonMatchingPair(card1, card2);
  }
}

function handleMatchingPair(card1, card2) {
  card1.classList.add("matched");
  card2.classList.add("matched");

  matchedCards.push(card1, card2);

  flippedCards = [];

  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      alert("🥳🥳 Yay! You've matched all the hearts! Happy Valentine!❤️");
    }, 600);
  }
}

function handleNonMatchingPair(card1, card2) {
  setTimeout(() => {
    card1.textContent = "?";
    card2.textContent = "?";

    card1.classList.remove("flipped");
    card2.classList.remove("flipped");

    flippedCards = [];
  }, 1000);
}
```


- **Descriptive Naming:** We could change the names of the game's functions to be more descriptive. Using more descriptive names could clarify the intended purpose of each function to allow the reader tell at what a function does just by looking at its name.

    - **shuffle → randomiseCards/shuffleCards:** Either option clearly conveys that the function is about randomizing the order of cards.

    - **createBoard → setupGameBoard/initialiseGameBoard:** These names indicate that the function is responsible for building and configuring the game board.

    - **flipCard → handleCardFlip:** This emphasizes that the function manages the action of flipping a card.

    - **checkMatch → verifyCardMatch:** makes it clear that the function is checking whether the selected cards match
    
    - **resetGame → restartGame/clearGameBoard:** Both options communicate that the function resets the game, either by restarting or clearing the board.


- **Error Checking:** We could add some checks to make sure our code fails gracefully when something unexpected happens. **(Note):** Please refer to the previous section on descriptive names if confused on function names.
    - **Validate DOM Elements:** 
    ```javascript
    function setupGameBoard() {
        const gameBoard = document.getElementById("game-board");
            if (!gameBoard) {
                console.error("Error: Game board element not found!");
                return; // Exit early if the game board is missing
            }
            gameBoard.innerHTML = "";
            // Set up board here
        }
    ```

    - **Check Event Targets:**
    ```javascript
    function handleCardFlip(event) {
        const card = event.target;
        
        // Check if card element is a card
        if (!card.classList.contains("card")) {
            console.error("Error: Clicked element is not a valid card.");
            return;
        }
        
        // Check if card contains a value
        if (!card.dataset.value) {
            console.error("Error: Card value is missing for", card);
            return;
        }
        

        card.textContent = card.dataset.value;
        card.classList.add("flipped");
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            verifyCardMatch();
        }
    }
    ```

    - **Validate Card Data while Match Checking:**
    ```javascript
    function verifyCardMatch() {
        const [card1, card2] = flippedCards;
        
        if (!card1.dataset.value || !card2.dataset.value) {
            console.error("Error: One or both cards are missing values.", card1, card2);
            return;
        }
        
        if (card1.dataset.value === card2.dataset.value) {
            handleMatchingPair(card1, card2);
        } else {
            handleNonMatchingPair(card1, card2);
        }
    }
    ```


## Suggested Feature Enhancements:

We can improve the `Match the Hearts` game by adding a couple of new features:

- **Difficulty Levels:** We could add difficulty levels by adding different grid sizes.
- **Timer and Move Counter:** A timer and move counter could be set up to keep track of the player's total completion time and moves.
- **Scoreboard:** We could set up a scoring system that increases scores based on fewer moves, or less game completion time. Players could access their previous scores along with their total completion moves and times.
- **Sound Effects and Animations:** We could add sound effects to represent card clicks and card animations when the game is completed.


## Conclusion:

The `Match the Hearts` game code proves a solid foundation built on great coding practices. Its current implementation is a working model that provides an interactive game experience.
However, our analysis—guided by the principles from *Clean Code*—sees to possible code improvements. Breaking down larger functions into smaller, purpose-driven units, adopting more descriptive naming conventions, and implementing error handling and validation can enhance code readability, maintainability, and testability. Also, exploring feature enhancements like difficulty levels, a timer and move counter, a scoring system, and more engaging animations or sound effects, could improve the game's user experience.
The game is great as is, but these enhancements could make it better.