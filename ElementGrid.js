// Elements 
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


// The current element that is selected
let currentElement = null;



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





//  ===================  Functionality of Element Grid  ===================



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
  


  // Export
  export { renderElementGrid, rotateElement, mirrorElement };
