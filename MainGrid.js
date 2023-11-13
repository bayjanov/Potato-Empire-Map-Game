import { currentTimeUnits, updateElapsedTime } from './ElapsedTime.js';
import { getColorForType } from './Utility.js'; // Assuming getColorForType is exported from Utility.js


// Mountain cells are marked as reserved and cannot be used for placing elements
const mountainCells = [
    { x: 1, y: 1 },
    { x: 8, y: 3 },
    { x: 3, y: 5 },
    { x: 9, y: 8 },
    { x: 5, y: 9 },
  ];


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
        if (
          mountainCells.some((mountain) => mountain.x === j && mountain.y === i)
        ) {
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
            if (
              targetCell &&
              (targetCell.style.backgroundImage !== "" ||
                targetCell.dataset.reserved === "true")
            ) {
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
              if (
                targetCell &&
                !targetCell.dataset.reserved &&
                targetCell.style.backgroundImage === ""
              ) {
                targetCell.style.backgroundColor = "#E9BD90";
                targetCell.style.outline = "4px solid #FF0000";
              }
            }
          }
        });
        currentTimeUnits += element.time;
        document.getElementById(
          "elapsedTime"
        ).textContent = `${currentTimeUnits}/${maxTimeUnits}`;
      });
  
      // Remove temporary styles after a delay
      setTimeout(() => {
        Array.from(cells).forEach((cell) => {
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
                targetCell.style.backgroundImage = `url(${getColorForType(
                  element.type
                )})`;
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
    document.getElementById(
      "elapsedTime"
    ).textContent = `${currentTimeUnits}/${maxTimeUnits}`;
  
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
      document.querySelector(
        `.season.${seasonName.toLowerCase()} .points`
      ).textContent = `${seasonScores[seasonName]} points`;
  
      // Move to the next season
      currentSeasonIndex++;
      if (currentSeasonIndex >= seasons.length) {
        currentSeasonIndex = 0; // Loop back to the first season if needed
      }
      // Update the season display
      updateSeasonDisplay();
    }
  }


  export { mountainCells, renderMainGrid, handleCellClick, placeElement, findTopLeftFilledCell };



