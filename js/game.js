
// Basket Class
class Basket {
    constructor(basketElement, gameContainer) {
        this.element = basketElement;
        this.container = gameContainer;
        this.position = this.container.offsetWidth / 2;
        this.setupMovement();
    }

    setupMovement() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.position = Math.max(0, this.position - 50); //speed of the touch
            } else if (event.key === 'ArrowRight') {
                this.position = Math.min(
                    this.container.offsetWidth - this.element.offsetWidth,
                    this.position + 50 //speed of touch 
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
        this.element = document.createElement('div');
        this.element.classList.add('fallingItems', type);
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
        return (
            itemRect.bottom >= basketRect.top &&
            itemRect.left < basketRect.right &&
            itemRect.right > basketRect.left
        );
    }
}

// Game Class
class Game {
    constructor(containerId, basketId, scoreId) {
        this.container = document.getElementById(containerId);
        this.basket = new Basket(document.getElementById(basketId), this.container);
        this.scoreElement = document.getElementById(scoreId);
        this.fruits = ['apple', 'banana', 'strawberry', 'avocado'];
        this.score = 0;

    }

    start() {
        setInterval(() => {
            const fruitType = this.fruits[Math.floor(Math.random() * this.fruits.length)];
            new FallingItem(fruitType, this.container, this.basket, (type) => {
                if (type !== 'bomb') this.updateScore();
            });
        }, 1000);
    }

    updateScore() {
        this.score += 1;
        this.scoreElement.textContent = `Score: ${this.score}`;
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game('game-container', 'basket', 'score');
    game.start();
});

// import { checkCollision } from './js/player.js';

// Update lives
// function updateLives() {
//     livesDisplay.innerHTML = '';
//     for (let i = 0; i < 3; i++) {
//         const heart = document.createElement('img');
//         heart.classList.add('heart');
//         heart.src = i < lives ? './assets/full-heart.png' : './assets/empty-heart.png';
//         livesDisplay.appendChild(heart);
//     }
// }

// End game
// function endGame() {
//     stopItemDrops();
//     document.getElementById('game-over').style.display = 'block';
// }

// Speed up game
// export function speedUpGame() {
//     gameSpeed = Math.max(500, gameSpeed - 50);
//     stopItemDrops();
//     startItemDrops();
// }
