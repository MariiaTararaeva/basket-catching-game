//TODO reduce amount of bombs drops
//TODO add stars for extra points, make them fall less
//TODO add another fruit 
//TODO add falling hearts 
//TODO increse basket speed and image
//TODO add start & game-over with score screens
//TODO stopItemDrops build method to end the game  
//TODO add eventListeners to buttons (restart and stop buttom)
//TODO add lives to the basket css?? add timer?? change basket to superman

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
        console.log("Game started!"); // Replace with actual game initialization logic
        // Initialize game elements and logic here
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
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.position = Math.max(
          0 + this.element.offsetWidth / 2,
          this.position - 30 //speed of the touch
        );
      } else if (event.key === "ArrowRight") {
        this.position = Math.min(
          this.container.offsetWidth - this.element.offsetWidth / 2,
          this.position + 30 //speed of touch //TO DO increase speed when holding key
        );
      }
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
    return (
      itemRect.bottom >= basketRect.top &&
      itemRect.left < basketRect.right &&
      itemRect.right > basketRect.left
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
    //see if the fruit collides with basket
    const itemRect = this.element.getBoundingClientRect(); //exact dimention of the fruit
    const basketRect = this.basket.getBoundingRect(); //exact dimention of the basket
    return (
      itemRect.bottom >= basketRect.top &&
      itemRect.left < basketRect.right &&
      itemRect.right > basketRect.left
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
    this.dropInterval = setInterval(() => {
      const fruitType =
        this.fruits[Math.floor(Math.random() * this.fruits.length)];
      new FallingItem(fruitType, this.container, this.basket, (type) => {
        if (type !== "bomb") {
          this.updateScore();
          this.caughtCount++; // Increment the counter
          this.adjustGameSpeed(); // Check if speed should be adjusted
        }else{
            this.updateLives();
        }
      });
    }, this.gameSpeed);

    this.bombDropInterval = setInterval(() => {
        new Bomb(this.container, this.basket, (type) => {
            this.updateLives();
        });
      }, this.gameSpeed);

  }

  updateScore() {
    this.score += 100;
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
  updateLives() {
    const livesDisplay = document.getElementById("lives");
    this.lives -= 1; // Decrement lives
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
    stopItemDrops();
    document.getElementById("game-over").style.display = "block";
  }
  // endGame();
}

// Initialize the game
document.addEventListener("DOMContentLoaded", () => {
  const game = new Game("game-container", "basket", "score");
  game.start();
});
