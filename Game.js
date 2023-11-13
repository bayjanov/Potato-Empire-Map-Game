import { initializeGame } from './GameInitialization.js';

document.addEventListener("DOMContentLoaded", initializeGame);

// Call the initializeGame function to start the game
document.addEventListener("DOMContentLoaded", initializeGame);

// Event listeners for the rotation and flip buttons
document.getElementById("rotateBtn").addEventListener("click", () => {
  rotateElement(currentElement);
});

document.getElementById("flipBtn").addEventListener("click", () => {
  mirrorElement(currentElement);
});