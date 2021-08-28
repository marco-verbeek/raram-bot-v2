export function displayChampStats(championStats: JSON): string[] {
  let col1 = "", col2 = "", col3 = "";

  col1 = `W/R: ${championStats["gamesWon"]}W, ${championStats["gamesPlayed"] - championStats["gamesWon"]}L
          Penta kills: ${championStats["pentas"]}
          Avg KP: ${championStats["totalKP"] / championStats["gamesPlayed"]}`;

  col2 = `Avg Damage Done: ${championStats["totalDamageDone"] / championStats["gamesPlayed"]}
          Avg Damage Taken: ${championStats["totalDamageTaken"] / championStats["gamesPlayed"]}
          Avg Healing Done: ${championStats["totalHealed"] / championStats["gamesPlayed"]}`;

  col3 = `TODO`;

  /*
  for(let i=0; i<3; i++){
    col3 += championStats["players"][i] + ", " +  "x\n";
  }*/

  return [col1, col2, col3];
}