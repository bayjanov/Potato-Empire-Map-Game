function shuffleElements(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
  

// Export 
  export { shuffleElements, getColorForType };
