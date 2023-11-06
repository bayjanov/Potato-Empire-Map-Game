// Global variables to track the game state
let currentTimeUnits = 0;
const maxTimeUnits = 28;
let currentSeasonIndex = 0;
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
let seasonScores = { 'Spring': 0, 'Summer': 0, 'Autumn': 0, 'Winter': 0 };

// Placeholder for mission cards (Define your actual mission cards with scoring logic)
let missionCards = [
  // ... Define your mission cards with their respective scoring functions
];

// Shuffle and pick the first four missions for this game
let selectedMissions = shuffleElements([...missionCards]).slice(0, 4);



// Mountains, reserved cells
const mountainCells = [
  { x: 1, y: 1 },
  { x: 8, y: 3 },
  { x: 3, y: 5 },
  { x: 9, y: 8 },
  { x: 5, y: 9 }
];

// Elements given for the game
const elements = [
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "plains",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "plains",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "plains",
    shape: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "plains",
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
];

// Missions for the game
const missions = 
{
  "basic": [
    {
      "title": "Edge of the forest",
      "description": "You get one point for each forest field adjacent to the edge of your map."
    },
    {
      "title": "Sleepy valley",
      "description": "For every row with three forest fields, you get four points."
    },
    {
      "title": "Watering potatoes",
      "description": "You get two points for each water field adjacent to your farm fields."
    },
    {
      "title": "Borderlands",
      "description": "For each full row or column, you get six points."
    }
  ],
  "extra": [
    {
      "title": "Tree line",
      "description": "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts."
    },
    {
      "title": "Watering canal",
      "description": "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points."
    },
    {
      "title": "Wealthy town",
      "description": "You get three points for each of your village fields adjacent to at least three different terrain types."
    },
    {
      "title": "Magicians' valley",
      "description": "You get three points for your water fields adjacent to your mountain fields."
    },
    {
      "title": "Empty site",
      "description": "You get two points for empty fields adjacent to your village fields."
    },
    {
      "title": "Terraced house",
      "description": "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points."
    },
    {
      "title": "Odd numbered silos",
      "description": "For each of your odd numbered full columns you get 10 points."
    },
    {
      "title": "Rich countryside",
      "description": "For each row with at least five different terrain types, you will receive four points."
    }
  ],
}

// Shuffle the elements array for random order
function shuffleElements(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// The current element that is selected
let currentElement = null;

// The main game initialization function
// Global variable to store shuffled elements
let shuffledElements = [];

function initializeGame() {
  // Shuffle elements and pick the first one as the current element
  shuffledElements = shuffleElements([...elements]); // Using a copy of the elements array
  currentElement = shuffledElements.pop();

  // Render the main grid and the element grid
  renderMainGrid();
  renderElementGrid(currentElement);
  // Set up the missions display
  setupMissionsDisplay();
  // Update the season display for the start of the game
  updateSeasonDisplay();
}

// Renders the 11x11 main grid
function renderMainGrid() {
  const grid = document.getElementById("mapGrid");
  grid.innerHTML = ""; // Clear any existing cells

  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.dataset.x = j;
      cell.dataset.y = i;

      // Check if the current cell is a mountain cell
      if (mountainCells.some(mountain => mountain.x === j && mountain.y === i)) {
        cell.classList.add("mountain");
        cell.style.backgroundImage = "url('./assets/tiles/mountain_tile.png')";
        cell.style.backgroundSize = "cover";
        // Set a property to mark this cell as non-placeable
        cell.dataset.reserved = "true";
      }

      cell.addEventListener("click", handleCellClick);
      grid.appendChild(cell);
    }
  }
}


// Renders the current element in the 3x3 grid

// Renders the current element in the 3x3 grid
function renderElementGrid(element) {
  const elementGrid = document.getElementById("elementGrid");
  elementGrid.innerHTML = ""; // Clear any existing cells

  for (let i = 0; i < 3; i++) {
    // Assuming a 3x3 grid
    for (let j = 0; j < 3; j++) {
      const gridCell = document.createElement("div");
      gridCell.classList.add("element-cell");
      gridCell.dataset.x = j;
      gridCell.dataset.y = i;

      if (element.shape[i][j] === 1) {
        if (element.type === "forest") {
          gridCell.classList.add("filled");
          gridCell.style.backgroundImage =
            "url('./assets/tiles/forest_tile.png')";
        } else if (element.type === "plains") {
          gridCell.classList.add("filled");
          gridCell.style.backgroundImage =
            "url('./assets/tiles/plains_tile.png')";
        } else if (element.type === "water") {
          gridCell.classList.add("filled");
          gridCell.style.backgroundImage =
            "url('./assets/tiles/water_tile.png')";
        } else if (element.type === "farm") {
          gridCell.classList.add("filled");
          gridCell.style.backgroundImage =
            "url('./assets/tiles/farm_tile.png')";
        }
        gridCell.style.border = "1px solid #fff";
      } else {
        gridCell.classList.add("empty");
        gridCell.style.backgroundColor = `#fff`;
        gridCell.style.border = "none";
      }
      elementGrid.appendChild(gridCell);
    }
  }
}


function setupMissionsDisplay() {
  // Display the selected missions on the UI
  selectedMissions.forEach((mission, index) => {
    // Assuming you have elements with IDs missionA, missionB, missionC, missionD
    document.getElementById(`mission${String.fromCharCode(65 + index)}`).textContent = mission.description;
  });
}


// Handles the click event on the main grid to place an element
function handleCellClick(event) {
  const x = parseInt(event.target.dataset.x, 10);
  const y = parseInt(event.target.dataset.y, 10);

  // Find the top-left filled cell of the element's shape
  const anchorPoint = findTopLeftFilledCell(currentElement);
  if (anchorPoint) {
    placeElement(x - anchorPoint.x, y - anchorPoint.y, currentElement);
  }
}

// Finds the top-left filled cell in the element's shape
function findTopLeftFilledCell(element) {
  for (let i = 0; i < element.shape.length; i++) {
    for (let j = 0; j < element.shape[i].length; j++) {
      if (element.shape[i][j] === 1) {
        return { x: j, y: i };
      }
    }
  }
  return null; // In case there are no filled cells
}







// Places an element on the main grid at the specified coordinates
function placeElement(x, y, element) {
  const grid = document.getElementById("mapGrid");
  const cells = grid.getElementsByClassName("grid-cell");

  let collisionDetected = false;

  // Check for collisions and reserved fields (such as mountains)
  element.shape.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === 1) {
        const targetX = x + cellIndex;
        const targetY = y + rowIndex;
        // Calculate the index for 1D array representation
        const targetCellIndex = targetY * 11 + targetX;
        if (targetX >= 0 && targetX < 11 && targetY >= 0 && targetY < 11) {
          const targetCell = cells[targetCellIndex];
          // Check if the cell is already filled or is a reserved cell (mountain)
          if (targetCell && (targetCell.style.backgroundImage !== "" || targetCell.dataset.reserved === "true")) {
            collisionDetected = true;
            targetCell.style.outline = "4px solid #FF0000"; // Indicate collision or reserved cell
          }
        } else {
          // Part of the element is off-grid
          collisionDetected = true;
        }
      }
    });
  });

  if (collisionDetected) {
    // Visual feedback for collision or invalid placement
    element.shape.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === 1) {
          const targetCellIndex = (y + rowIndex) * 11 + (x + cellIndex);
          if (targetCellIndex >= 0 && targetCellIndex < cells.length) {
            const targetCell = cells[targetCellIndex];
            if (targetCell && !targetCell.dataset.reserved && targetCell.style.backgroundImage === "") {
              targetCell.style.backgroundColor = "#E9BD90";
              targetCell.style.outline = "4px solid #FF0000";
            }
          }
        }
      });
    });

    // Remove temporary styles after a delay
    setTimeout(() => {
      Array.from(cells).forEach(cell => {
        cell.style.backgroundColor = "";
        cell.style.outline = "";
      });
    }, 1500);

    // Do not proceed to the next element if there was a collision
  } else {
    // No collision detected, place the element
    element.shape.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === 1) {
          const targetCellIndex = (y + rowIndex) * 11 + (x + cellIndex);
          if (targetCellIndex >= 0 && targetCellIndex < cells.length) {
            const targetCell = cells[targetCellIndex];
            if (targetCell) {
              targetCell.style.backgroundImage = `url(${getColorForType(element.type)})`;
              targetCell.style.backgroundSize = "cover";
              targetCell.style.border = ""; // Reset any temporary styles
            }
          }
        }
      });
    });

    // Update the game state after a successful placement
    if (shuffledElements.length > 0) {
      currentElement = shuffledElements.pop();
      renderElementGrid(currentElement);
    } else {
      // All elements have been placed - game over or next level
      console.log("All elements have been placed.");
      // Implement end-of-game or next level logic here
    }
  }
  // After placing the element, update the time units
  currentTimeUnits += element.time;
  document.getElementById("elapsedTime").textContent = `${currentTimeUnits}/${maxTimeUnits}`;

  // Check if the season or the game should end
  checkSeasonEnd();
  checkEndOfGame();
}




function checkSeasonEnd() {
  if (currentTimeUnits >= (currentSeasonIndex + 1) * 7) {
    // Season has ended, calculate the score for the season
    let seasonName = seasons[currentSeasonIndex];
    seasonScores[seasonName] = calculateSeasonScore(seasonName);
    // Update the season score on the UI
    document.querySelector(`.season.${seasonName.toLowerCase()} .points`).textContent = `${seasonScores[seasonName]} points`;

    // Move to the next season
    currentSeasonIndex++;
    if (currentSeasonIndex >= seasons.length) {
      currentSeasonIndex = 0; // Loop back to the first season if needed
    }
    // Update the season display
    updateSeasonDisplay();
  }
}


function updateSeasonDisplay() {
  // Update the UI with the current season
  document.querySelector('.current-season h3').textContent = `Current season: ${seasons[currentSeasonIndex]} (BC)`;
}


function calculateSeasonScore(season) {
  // Logic to calculate the score based on the missions
  let score = 0;
  selectedMissions.forEach(mission => {
    if (mission.seasons.includes(season)) {
      score += mission.calculateScore(); // Assume each mission card has a calculateScore method
    }
  });
  return score;
}


function checkEndOfGame() {
  if (currentTimeUnits >= maxTimeUnits) {
    // Game has ended
    alert("Game Over! Your final score is: " + calculateFinalScore());
    // Optionally, handle game over (disable game board, show results, etc.)
  }
}


function calculateFinalScore() {
  let finalScore = Object.values(seasonScores).reduce((a, b) => a + b, 0);
  return finalScore;
}




// Implement the actual scoring logic for each mission card here
// For example:
missionCards = [
  {
    id: 'A',
    description: '3 points for each water field adjacent to mountain fields.',
    seasons: ['Spring', 'Summer'],
    calculateScore: function() {
      // Implement the scoring logic for this mission
      return 0; // Placeholder
    }
  },
  // ... other mission cards
];





// Rotates the current element
function rotateElement(element) {
  const newShape = element.shape[0].map((val, index) =>
    element.shape.map((row) => row[index]).reverse()
  );
  element.shape = newShape;
  renderElementGrid(element);
}

// Mirrors the current element
function mirrorElement(element) {
  element.shape.forEach((row) => row.reverse());
  renderElementGrid(element);
}

// Utility function to get color based on type
function getColorForType(type) {
  switch (type) {
    case "water":
      return "./assets/tiles/water_tile.png";
    case "plains":
      return "./assets/tiles/plains_tile.png";
    case "forest":
      return "./assets/tiles/forest_tile.png";
    case "farm":
      return "./assets/tiles/farm_tile.png";
    default:
      return "./assets/tiles/base_tile.png";
  }
}

// Call the initializeGame function to start the game
document.addEventListener("DOMContentLoaded", initializeGame);

// Event listeners for the rotation and flip buttons
document.getElementById("rotateBtn").addEventListener("click", () => {
  rotateElement(currentElement);
});

document.getElementById("flipBtn").addEventListener("click", () => {
  mirrorElement(currentElement);
});
