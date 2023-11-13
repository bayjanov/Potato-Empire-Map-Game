import { shuffleElements } from './Utility.js';
import { renderMainGrid, renderElementGrid, handleCellClick } from './MainGrid.js';
import { setupMissionsDisplay } from './Missions.js';
import { updateSeasonDisplay } from './Seasons.js';
import { currentTimeUnits, maxTimeUnits, updateElapsedTime } from './ElapsedTime.js';


// The main game initialization function

// Assuming `elements` is the array of elements
let shuffledElements = [];
let currentElement = null;
let selectedMissions = [];


// Shuffle the elements array for random order
function shuffleElements(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function initializeGame() {
    // Shuffle and pick the first four missions for this game
    let selectedMissions = shuffleElements([...missionCards]).slice(0, 4);
    // Shuffle elements and pick the first one as the current element
    shuffledElements = shuffleElements([...elements]); // Using a copy of the elements array
    currentElement = shuffledElements.pop();
  
    renderMainGrid();
    renderElementGrid(currentElement);
    setupMissionsDisplay();
    // Update the season display for the start of the game
    updateSeasonDisplay();
  }



// DOM manipulation functions




// Export these for componentization
export { initializeGame };