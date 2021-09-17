export function displayChampStats(championStats: JSON): string[] {
  let col1 = "", col2 = "", col3 = "";

  col1 = `W/R: ${championStats["gamesWon"]}W, ${championStats["gamesPlayed"] - championStats["gamesWon"]}L
          Avg KP: ${championStats["totalKP"] / championStats["gamesPlayed"]}
          Avg LP per Win: ${(championStats["totalPointsWon"] / championStats["gamesWon"]).toFixed(0)}
          Avg LP per Lose: ${(championStats["totalPointsLost"] / (championStats["gamesPlayed"] - championStats["gamesWon"])).toFixed(0)}
          Penta kills: ${championStats["pentaKills"]}`;

  col2 = `Triple kills: ${championStats["tripleKills"]}
          Quadra kills: ${championStats["quadraKills"]}
          Avg Damage Done: ${(championStats["totalDamageDone"] / championStats["gamesPlayed"]).toFixed(0)}
          Avg Damage Taken: ${(championStats["totalDamageTaken"] / championStats["gamesPlayed"]).toFixed(0)}
          Avg Healing Done: ${(championStats["totalHealed"] / championStats["gamesPlayed"]).toFixed(0)}`;

  Object.keys(championStats["players"]).forEach((key) => {    
    const gamesPlayed = championStats["players"][key][1][0];
    const gamesWon = championStats["players"][key][1][1];    
    
    col3 += `${championStats["players"][key][0]}, ${gamesWon}W ${gamesPlayed - gamesWon}L\n`;
  })

  return [col1, col2, col3];
}