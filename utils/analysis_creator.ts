const { champ_icon, random_rank_icon } = require('../utils/icons_creator')

function formatLpGain(lpGain: number): string {
  return (lpGain >= 0 ? "+" : "") + lpGain
}

/**
 * This is a very complex and unreadable function that transforms the JSON data linked to an analyzed game in 3 columns: Players, KDA and Rank.
 * You should never have to edit nor use this function, and if you do - I'm sorry. Please teach me how to clean this up if you can, I would love that.
 * @param analysis JSON data received from a GET on raram's backend
 * @param accountId the LoL encrypted account id linked to the player we want to analyze
 * @param msgUrl URL to which the Tooltips will link
 */
export function displayTeamAnalysis(analysis: JSON, accountId: number, msgUrl?: string): string[] {
  const players = analysis["players"]

  const playerTeamId = players.find((player) => player.accountId === accountId).teamId
  const winningTeamId = analysis["teams"].find((team => team.win)).teamId
  
  const startIndex = playerTeamId === 100 ? 0 : 5;
  const endIndex = playerTeamId === 100 ? 5 : 10;

  let col1 = "", col2 = "", col3 = ""

  for (let i = startIndex; i < endIndex; i++) {
    const isRequester = players[i]['accountId'] === accountId
    const player = players[i]

    const championIcon = champ_icon(players[i]["champion"])
    const summonerName = player["summonerName"]

    const kills = player["kills"]
    const deaths = player["deaths"]
    const assists = player["assists"]

    const damageDone = player["damageDone"]
    const damageTaken = player["damageTaken"]
    const totalHealed = player["healed"]

    const lpGain = player["lpGain"]
    const kda = `${kills}/${deaths}/${assists}`
    const kdaWithHover = `[${kills}/${deaths}/${assists}](${msgUrl} "Damage Done: ${damageDone}\nDamage Taken: ${damageTaken}\nHealed: ${totalHealed}")`

    const winLoseExplained = (player['teamId'] === winningTeamId) ? "Win: +10 LP" : "Lose: -10LP"
    const kpExplained = "KP: " + (player['teamComparedKP'] * 100).toFixed(0) + "% (" + formatLpGain(player['KPGain']) + ")"
    const deathsExplained = "Deaths: " + (player['teamComparedDeaths'] * 100).toFixed(0) + "% (" + formatLpGain(player['deathsGain']) + ")"

    const DTHexplained = "+ highest of these values:"
    const dmgDoneExplained = "Damage Dealt: " + (player['teamComparedDamageDone'] * 100).toFixed(0) + "% (" + formatLpGain(player['damageDoneGain']) + ")"
    const dmgTakenExplained = "Damage Taken: " + (player['teamComparedDamageTaken'] * 100).toFixed(0) + "% (" + formatLpGain(player['damageTakenGain']) + ")"
    const healExplained = "Total Healed: " + (player['teamComparedHealed'] * 100).toFixed(0) + "% (" + formatLpGain(player['healedGain']) + ")"

    const maxDTH = formatLpGain(Math.max(player['damageDoneGain'], player['damageTakenGain'], player['healedGain']))
    const totalLpExplained = (player['teamId'] === winningTeamId ? "+10" : "-10") + formatLpGain(player['KPGain']) + formatLpGain(player['deathsGain']) + maxDTH + " = " + player['lpGain']

    const gainExplanation = winLoseExplained + "\n" + kpExplained + "\n" + deathsExplained + "\n\n" + DTHexplained + "\n" + dmgDoneExplained + "\n" + dmgTakenExplained + "\n" + healExplained + "\n\n" + totalLpExplained

    const rankWithLpGain = random_rank_icon() + " (" + formatLpGain(lpGain) + ")"
    const rankWithLpGainWithHover = `[${rankWithLpGain}](${msgUrl} "${gainExplanation}")`

    col1 += championIcon + " | " + (isRequester ? "**" : "") + summonerName + (isRequester ? "**" : "") + "\n";
    col2 += (isRequester ? "**" : "") + (isRequester ? kdaWithHover : kda) + (isRequester ? "**" : "") + "\n";
    col3 += (isRequester ? "**" : "") + (isRequester ? rankWithLpGainWithHover : rankWithLpGain) + (isRequester ? "**" : "") + "\n";
  }

  return [col1, col2, col3];
}