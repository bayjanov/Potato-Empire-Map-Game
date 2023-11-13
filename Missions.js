// Missions for the game
const missionCards = {
    basic: [
      {
        id: "edge_of_the_forest",
        title: "Edge of the forest",
        description:
          "You get one point for each forest field adjacent to the edge of your map.",
      },
      {
        id: "sleepy_valley",
        title: "Sleepy valley",
        description:
          "For every row with three forest fields, you get four points.",
      },
      {
        id: "watering_potatoes",
        title: "Watering potatoes",
        description:
          "You get two points for each water field adjacent to your farm fields.",
      },
      {
        id: "borderlands",
        title: "Borderlands",
        description: "For each full row or column, you get six points.",
      },
    ],
    extra: [
      {
        id: "tree_line",
        title: "Tree line",
        description:
          "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.",
      },
      {
        id: "watering_canal",
        title: "Watering canal",
        description:
          "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.",
      },
      {
        id: "wealthy_town",
        title: "Wealthy town",
        description:
          "You get three points for each of your village fields adjacent to at least three different terrain types.",
      },
      {
        id: "magicians_valley",
        title: "Magicians' valley",
        description:
          "You get three points for your water fields adjacent to your mountain fields.",
      },
      {
        id: "empty_site",
        title: "Empty site",
        description:
          "You get two points for empty fields adjacent to your village fields.",
      },
      {
        id: "terraced_house",
        title: "Terraced house",
        description:
          "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.",
      },
      {
        id: "odd_numbered_silos",
        title: "Odd numbered silos",
        description:
          "For each of your odd numbered full columns you get 10 points.",
      },
      {
        id: "rich_countryside",
        title: "Rich countryside",
        description:
          "For each row with at least five different terrain types, you will receive four points.",
      },
    ],
  };
  

  function setupMissionsDisplay() {
    // Display the selected missions on the UI
    selectedMissions.forEach((mission, index) => {
      // Assuming you have elements with IDs missionA, missionB, missionC, missionD
      document.getElementById(
        `mission${String.fromCharCode(65 + index)}`
      ).textContent = mission.description;
    });
  }
  
// Implement the actual scoring logic for each mission card here
// For example:
missionCards = [
    {
      id: "A",
      description: "3 points for each water field adjacent to mountain fields.",
      seasons: ["Spring", "Summer"],
      calculateScore: function () {
        // Implement the scoring logic for this mission
        return 0; // Placeholder
      },
    },
    // ... other mission cards
  ];
  
  // Export
  export { missionCards, setupMissionsDisplay };
