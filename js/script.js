// // Import necessary functions
// import { startItemDrops, stopItemDrops, speedUpGame } from './game.js';

// let lives = 3;
// let gameSpeed = 1000; // Initial speed
// let speedUpInterval; // To store the interval ID for speeding up

// // Ensure the start button is displayed initially
// startButton.style.display = 'block';

// // Add click event to start the game
// startButton.addEventListener('click', () => {
//     startButton.style.display = 'none'; // Hide start button after clicking
//     startGame();
// });

// // Start Game Logic
// function startGame() {
//     stopItemDrops(); // Stop any existing item drop intervals

//     // Reset score, lives, and game speed
//     score = 0;
//     lives = 3;
//     gameSpeed = 1000;

//     document.getElementById('score').textContent = `Score: ${score}`;
//     document.getElementById('lives').innerHTML = `
//         <img class="heart" src="./assets/full-heart.png" alt="♥">
//         <img class="heart" src="./assets/full-heart.png" alt="♥">
//         <img class="heart" src="./assets/full-heart.png" alt="♥">
//     `;
//     document.getElementById('game-over').style.display = 'none';

//     // Start speeding up the game
//     speedUpInterval = setInterval(speedUpGame, 10000);
// }

// // Restart Button Listener
// restartButton.addEventListener('click', () => {
//     startGame();
// });

// // End Button Listener
// endButton.addEventListener('click', () => {
//     stopItemDrops();
//     if (speedUpInterval) clearInterval(speedUpInterval);
//     alert('Game ended manually!');
//     document.getElementById('game-over').style.display = 'block';
// });


