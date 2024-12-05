//TODO reduce amount of bombs drops
//TODO add for extra points, make them fall less
//TODO add falling hearts
//TODO increse basket speed and image
//TODO add game-over
//TODO README
//TODO stopItemDrops build method to end the game
//TODO add eventListeners to buttons (restart and stop buttom)
//TODO not have bombs add score - sometimes it does and sometimes it doesn't

//Start Screen
document.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const mainContent = document.getElementById("main-content");
  const startGameButton = document.getElementById("start-game-button");
  const bestScoreElement = document.getElementById("best-score");

  // Simulate getting the best score from localStorage
  const bestScore = localStorage.getItem("bestScore") || 0;
  bestScoreElement.textContent = `Best Score: ${bestScore}`;

  // Start the game when the button is clicked
  startGameButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    mainContent.style.display = "block";
    startGame();
  });

  function startGame() {
    const game = new Game("game-container", "basket", "score");
    game.start();
  }

  // You can add logic for the restart button or game-over screen here
});

// Basket Class
class Basket {
  constructor(basketElement, gameContainer) {
    this.element = basketElement;
    this.container = gameContainer;
    this.position = this.container.offsetWidth / 2;
    this.setupMovement();
  }
  setupMovement() {
    // Keyboard movement
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            this.position = Math.max(
                0 + this.element.offsetWidth / 2,
                this.position - 30 // speed of movement
            );
        } else if (event.key === "ArrowRight") {
            this.position = Math.min(
                this.container.offsetWidth - this.element.offsetWidth / 2,
                this.position + 30 // speed of movement
            );
        }
        this.updatePosition();
    });

    // Mouse movement
    this.container.addEventListener("mousemove", (event) => {
        // Get mouse position relative to the container
        const containerRect = this.container.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;

        // Update the basket's position to follow the mouse
        this.position = Math.min(
            Math.max(mouseX, 0 + this.element.offsetWidth / 2),
            this.container.offsetWidth - this.element.offsetWidth / 2
        );
        this.updatePosition();
    });
}

  updatePosition() {
    this.element.style.left = `${this.position}px`;
  }

  getBoundingRect() {
    return this.element.getBoundingClientRect();
  }
}

// Falling Item Class
class FallingItem {
  constructor(type, container, basket, onCatch) {
    this.type = type;
    this.container = container;
    this.basket = basket;
    this.element = document.createElement("div");
    this.element.classList.add("fallingItems", type); //type is different fruits
    this.position = { x: Math.random() * (container.offsetWidth - 50), y: 0 };
    this.speed = 5;
    this.onCatch = onCatch;

    this.init();
  }

  init() {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
    this.container.appendChild(this.element);
    this.startFalling();
  }

  startFalling() {
    const interval = setInterval(() => {
      this.position.y += this.speed;
      this.element.style.top = `${this.position.y}px`;

      if (this.checkCollision()) {
        clearInterval(interval);
        this.createScoreFeedback(); // Show "+1"
        this.element.remove();
        this.onCatch(this.type);
      }

      if (this.position.y > this.container.offsetHeight) {
        clearInterval(interval);
        this.element.remove();
      }
    }, 20);
    // console.log(`Game Speed: ${this.gameSpeed}, Vegetables Caught: ${this.caughtCount}`);
  }

  checkCollision() {
    const itemRect = this.element.getBoundingClientRect();
    const basketRect = this.basket.getBoundingRect();

    // Adjust basket dimensions to avoid collisions on the sides
    const sideMargin = 100; // Adjust this value as needed
    const adjustedBasketRect = {
        top: basketRect.top + 100, // Slightly reduce the top collision area
        bottom: basketRect.bottom - 10, // Slightly reduce the bottom collision area
        left: basketRect.left + sideMargin, // Add margin to the left
        right: basketRect.right - sideMargin // Add margin to the right
    };

    return (
        itemRect.bottom >= adjustedBasketRect.top &&
        itemRect.left < adjustedBasketRect.right &&
        itemRect.right > adjustedBasketRect.left
    );
}

  createScoreFeedback() {
    // Create  "+1" element
    const feedback = document.createElement("div");
    feedback.textContent = "+100";
    feedback.style.position = "absolute";
    feedback.style.left = `${this.position.x}px`;
    feedback.style.top = `${this.position.y}px`;
    feedback.style.fontSize = "24px";
    feedback.style.color = "orange";
    feedback.style.fontWeight = "bold";
    feedback.style.animation = "fadeUp 1s ease-out";
    this.container.appendChild(feedback);

    // Remove the feedback element after animation
    feedback.addEventListener("animationend", () => {
      feedback.remove();
    });
  }
}
//Bomb calss
class Bomb {
  constructor(container, basket, onCatch) {
    this.container = container;
    this.basket = basket;
    this.element = document.createElement("div");
    this.element.className = "bomb";
    this.position = { x: Math.random() * (container.offsetWidth - 50), y: 0 };
    this.onCatch = onCatch;

    this.init();
  }

  init() {
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
    this.container.appendChild(this.element);
    this.startFalling();
  }

  startFalling() {
    const interval = setInterval(() => {
      this.position.y += 5;
      this.element.style.top = `${this.position.y}px`;

      if (this.checkCollision()) {
        clearInterval(interval);
        this.createDeathFeedback(); // Show "-1 live"
        this.element.remove();
        this.onCatch(this.type);
      }

      if (this.position.y > this.container.offsetHeight) {
        clearInterval(interval);
        this.element.remove();
      }
    }, 20);
  }

  
  checkCollision() {
    const itemRect = this.element.getBoundingClientRect();
    const basketRect = this.basket.getBoundingRect();

    // Adjust basket dimensions to avoid collisions on the sides
    const sideMargin = 30; // Adjust this value as needed
    const adjustedBasketRect = {
        top: basketRect.top + 100, // Slightly reduce the top collision area
        bottom: basketRect.bottom - 10, // Slightly reduce the bottom collision area
        left: basketRect.left + sideMargin, // Add margin to the left
        right: basketRect.right - sideMargin // Add margin to the right
    };

    return (
        itemRect.bottom >= adjustedBasketRect.top &&
        itemRect.left < adjustedBasketRect.right &&
        itemRect.right > adjustedBasketRect.left
    );
}

  createDeathFeedback() {
    // Create  "-1" live
    const feedback = document.createElement("div");
    feedback.textContent = "-1 live"; //
    feedback.style.position = "absolute";
    feedback.style.left = `${this.position.x}px`;
    feedback.style.top = `${this.position.y}px`;
    feedback.style.fontSize = "24px";
    feedback.style.color = "red";
    feedback.style.fontWeight = "bold";
    feedback.style.animation = "fadeUp 2s ease-out"; //
    this.container.appendChild(feedback);

    // Remove the feedback element after animation
    feedback.addEventListener("animationend", () => {
      feedback.remove();
    });
  }
}
//Star Class!

// Game Class
class Game {
  constructor(containerId, basketId, scoreId) {
    this.container = document.getElementById(containerId);
    this.basket = new Basket(document.getElementById(basketId), this.container);
    this.scoreElement = document.getElementById(scoreId);
    this.fruits = ["girl", "boy", "man", "woman", "star"];
    this.score = 0;
    this.lives = 3; // Start with 3 lives
    this.gameSpeed = 1000; // Initial item drop interval (1 second)
    this.caughtCount = 0; // Track number of vegetables caught
    this.fallingSpeed = 5;
    this.dropInterval = null; // Store the interval reference
    this.bombDropInterval = null;
  }

  start() {
    const endButtonElement = document.getElementById("end-button");
    // Start the game when the button is clicked
    endButtonElement.addEventListener("click", () => {
      this.endGame();
    });

    document.getElementById("game-container").style.display = "block";
    this.dropInterval = setInterval(() => {
      const fruitType =
        this.fruits[Math.floor(Math.random() * this.fruits.length)];
      new FallingItem(fruitType, this.container, this.basket, (type) => {
        if (type !== "bomb") {
          this.updateScore(false);
          this.caughtCount++; // Increment the counter
          this.adjustGameSpeed(); // Check if speed should be adjusted
        } else {
          this.updateLives(false);
        }
      });
    }, this.gameSpeed);

    this.bombDropInterval = setInterval(() => {
      new Bomb(this.container, this.basket, (type) => {
        this.updateLives(false);
      });
    }, 3000);
  }

  updateScore(restart) {
    if (restart) {
      this.score = 0;
    } else {
      this.score += 100;
    }
    this.scoreElement.textContent = `Score: ${this.score}`;
  }

  adjustGameSpeed() {
    // Speed up every 5 vegetables caught
    if (this.caughtCount % 5 === 0) {
      this.gameSpeed = Math.max(500, this.gameSpeed - 100); // Minimum interval is 500ms
      clearInterval(this.dropInterval); // Clear the current interval
      clearInterval(this.bombDropInterval);
      this.start(); // Restart the item drop with the new speed
    }
  }
  updateLives(restart) {
    const livesDisplay = document.getElementById("lives");
    if (restart) {
      this.lives = 3;
    } else {
      this.lives -= 1;
    } // Decrement lives
    livesDisplay.innerHTML = ""; // Clear current lives display

    // Add hearts based on remaining lives
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement("span");
      heart.textContent = i < this.lives ? "❤️" : "🖤"; // Use emojis or images
      livesDisplay.appendChild(heart);
    }

    // End the game if no lives are left
    if (this.lives <= 0) {
      this.endGame();
    }
  }

  //End game
  endGame() {
    //End Game
    const gameOverScreen = document.getElementById("game-over-screen");
    const finalScoreElement = document.getElementById("final-score");
    const restartButton = document.getElementById("restart-button");
    const backToStartButton = document.getElementById("back-to-start-button");
    // stopItemDrops();
    gameOverScreen.style.display = "flex";

    // Show the final score
    finalScoreElement.textContent = `Your Score: ${this.score}`;

    clearInterval(this.dropInterval);
    clearInterval(this.bombDropInterval);
    const bestScore = localStorage.getItem("bestScore") || 0;
    if (bestScore < this.score) {
      localStorage.setItem("bestScore", this.score);
    }
    // Function to restart the game
    restartButton.addEventListener("click", () => {
      // restartButton.addEventListener("click", () => {
      console.log("Pressed");
      clearInterval(this.dropInterval);
      clearInterval(this.bombDropInterval);

      gameOverScreen.style.display = "none";
      document.getElementById("game-container").style.display = "block";
      this.updateLives(true);
      this.updateScore(true);
      this.start();
    });

    // Function to go back to the start screen
    backToStartButton.addEventListener("click", () => {
      this.updateLives(true);
      this.updateScore(true);
      gameOverScreen.style.display = "none";
      this.container.style.display = "none";
      //   document.getElementById("game-container")
      document.getElementById("start-screen").style.display = "flex";
      document.getElementById("best-score").innerText =
        "Best Score: " + localStorage.getItem("bestScore");
    });
  }
}
