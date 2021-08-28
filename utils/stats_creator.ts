export function displayChampStats(championStats: JSON): string[] {
  let col1 = "", col2 = "", col3 = "";

  col1 = `W/R: ${championStats["gamesWon"]}W, ${championStats["gamesPlayed"] - championStats["gamesWon"]}L
          Penta kills: ${championStats["pentas"]}
          Avg KP: ${championStats["totalKP"] / championStats["gamesPlayed"]}`;

  col2 = `Avg Damage Done: ${championStats["totalDamageDone"] / championStats["gamesPlayed"]}
          Avg Damage Taken: ${championStats["totalDamageTaken"] / championStats["gamesPlayed"]}
          Avg Healing Done: ${championStats["totalHealed"] / championStats["gamesPlayed"]}`;

  Object.keys(championStats["players"]).forEach((key) => {
    col3 += key + ", " + championStats["players"][key] + "x\n";
  })

  return [col1, col2, col3];
}