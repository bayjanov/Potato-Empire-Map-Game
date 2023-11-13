// Global variables to track the game state
let currentTimeUnits = 0;
const maxTimeUnits = 28;


// Functions related to time management
function updateElapsedTime() {
  document.getElementById("elapsedTime").textContent = `${currentTimeUnits}/${maxTimeUnits}`;
}

export { currentTimeUnits, maxTimeUnits, updateElapsedTime };
