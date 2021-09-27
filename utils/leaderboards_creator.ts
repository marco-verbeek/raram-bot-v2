/**
 * TODO: Find a way to clear this up, as this does not look beautiful nor efficient.
 */
export function displayLeaderboards(data: JSON): string[] {
  const highestRanking = data['highestRanking'];
  const highestWinrate = data['highestWinrate'];
  const highestPentaKills = data['highestPentaKills'];
  const highestAvgKP = data['highestAvgKP'];
  const lowestAvgDeaths = data['lowestAvgDeaths'];
  const highestAvgWinLP = data['highestAvgWinLP'];

  let rankTop = '';
  Object.keys(highestRanking).forEach((key) => {
    rankTop += `**${highestRanking[key]['summonerName']}** ${highestRanking[
      key
    ]['leaguePoints'].toFixed(2)} LP\n`;
  });

  let winrateTop = '';
  Object.keys(highestWinrate).forEach((key) => {
    const winrate = (highestWinrate[key]['winrate'] * 100).toFixed(2);
    const losses =
      highestWinrate[key]['rankedGames'] - highestWinrate[key]['wins'];

    winrateTop += `**${highestWinrate[key]['summonerName']}** - ${highestWinrate[key]['wins']}W ${losses}L (${winrate}%)\n`;
  });

  let pentaTop = '';
  Object.keys(highestPentaKills).forEach((key) => {
    pentaTop += `**${highestPentaKills[key]['summonerName']}** ${highestPentaKills[key]['pentaKills']}\n`;
  });

  let kpTop = '';
  Object.keys(highestAvgKP).forEach((key) => {
    kpTop += `**${highestAvgKP[key]['summonerName']}** ${highestAvgKP[key][
      'avgKP'
    ].toFixed(2)}\n`;
  });

  let deathsTop = '';
  Object.keys(lowestAvgDeaths).forEach((key) => {
    deathsTop += `**${lowestAvgDeaths[key]['summonerName']}** ${lowestAvgDeaths[
      key
    ]['avgDeaths'].toFixed(2)}\n`;
  });

  let lpPerWinTop = '';
  Object.keys(highestAvgWinLP).forEach((key) => {
    lpPerWinTop += `**${highestAvgWinLP[key]['summonerName']}** ${(
      highestAvgWinLP[key]['avgWinLP'] || 0
    ).toFixed(2)}\n`;
  });

  return [rankTop, winrateTop, pentaTop, kpTop, deathsTop, lpPerWinTop];
}
