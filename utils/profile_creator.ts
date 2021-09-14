export function displayProfile(profile: JSON): string[] {
  let col1 = "", col2 = "", col3 = "";
  const stats = profile["stats"];

  col1 = `Games played: ${stats["rankedGames"]}
          Games won: ${stats["wins"]}
          League Points: ${stats["leaguePoints"].toFixed(0)}
          Rank: WIP
          Gold Earned: ${stats["goldEarned"]}
          Gold Spent: ${stats["goldSpent"]}`;

  col2 = `Kills: ${stats["kills"]}
          Deaths: ${stats["deaths"]}
          Assists: ${stats["assists"]}
          Damage Dealt: ${stats["damageDealt"].toFixed(0)}
          Damage Taken: ${stats["damageTaken"].toFixed(0)}
          Healed: ${stats["healed"].toFixed(0)}`;

  col3 = `First Bloods: ${stats["firstBloods"]}
          Double kills: ${stats["doubleKills"]}
          Triple kills: ${stats["tripleKills"]}
          Quadra kills: ${stats["quadraKills"]}
          Penta kills: ${stats["pentaKills"]}`;

  return [col1, col2, col3];
}