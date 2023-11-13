let currentSeasonIndex = 0;
const seasons = ["Spring", "Summer", "Autumn", "Winter"];
let seasonScores = { Spring: 0, Summer: 0, Autumn: 0, Winter: 0 };



function updateSeasonDisplay() {
    // Update the UI with the current season
    document.querySelector(
      ".current-season h3"
    ).textContent = `Current season: ${seasons[currentSeasonIndex]} (BC)`;
  }
  
  function calculateSeasonScore(season) {
    // Logic to calculate the score based on the missions
    let score = 0;
    selectedMissions.forEach((mission) => {
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
  

  export { currentSeasonIndex, seasons, seasonScores, updateSeasonDisplay, calculateSeasonScore, checkEndOfGame, calculateFinalScore };


