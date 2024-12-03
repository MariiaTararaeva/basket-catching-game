Fruit Catching Game

What the Project Does

Explores animations, event handling, DOM manipulation, and collision detection.

The Fruit Catching Game is a fun and interactive browser-based game where players control a basket to catch falling fruits. The objective is to score points by catching as many fruits as possible while avoiding a randomized "bad fruit." Bonus stars occasionally appear, offering additional rewards when caught. The game dynamically increases its difficulty over time, making it engaging for players of all skill levels.

How to play:
- Memorize the choosen bad fruit || just avoid the bomb 
- Use the left and right arrow keys to move the basket.
- Catch fruits to score points.
- Avoid the "bad fruit" to stay in the game.
- Catch stars for bonus points || catch stars to get the bonus level of matching the fruits with eachther (like vegi tetris).

JavaScript Files:
1. player.js: 
- Handles player-specific logic, such as basket movement and collision detection with fruits (left/right).

2. game.js
- Logic for generating and animating fruits and stars.
- Randomizing bad fruits.
- Handling game state (e.g., start, restart, game over).

3. script.js
- Initializes the game and connects player.js and game.js.
- Ensures everything runs smoothly.

HTML:
index.html/
Use correct order to allow the scipt to load last and wait for plyer and game. 

Style Elements:
CSS/
├──styles

assets/
├── fruits/
│   ├── apple.png 
│   ├── banana.png
│   ├── lemon.png
│   ├── strawberry.png 
│   ├── avocado.png 
├── basket.png
├── star.png
├── bomb.png

lemon <!-- https://www.cleanpng.com/png-lemon-fruit-cute-smile-food-smiling-lemon-with-eye-8062571/ -->
apple <!-- https://www.cleanpng.com/png-smiling-green-apple-cartoon-8276488/download-png.html -->
banana <!-- https://www.cleanpng.com/png-emoticon-happy-banana-with-smiling-face-8115557/download-png.html -->
strawberry <!-- https://www.cleanpng.com/png-polka-dot-7374795/download-png.html -->
avacado <!-- https://www.cleanpng.com/png-avocado-cartoon-avocado-with-smiling-face-and-pit-8050361/download-png.html -->
star <!-- https://www.cleanpng.com/png-cute-smiling-star-cartoon-8249657/#google_vignette -->
bomb <!-- https://www.cleanpng.com/png-timer-bomb-bomb-explosion-sparks-center-of-the-bom-7944145/download-png.html -->
# vegi-catcher-game
