const { Command } = require("discord.js-commando");
const { createEmbed, embedType } = require("../../utils/embed_creator");
const { displayLeaderboards } = require("../../utils/leaderboards_creator");
const { getLeaderboards } = require("../../src/requests");

module.exports = class LeaderboardCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leaderboards',
      aliases: ['lb'],
      group: 'raram',
      memberName: 'leaderboards',
      description: 'Displays the global top 5 leaderboards.',
    });
  }

  async run(msg) {
    const lbData = await getLeaderboards();
    const [rankTop, winrateTop, pentaTop, kpTop, deathsTop, lpPerWinTop] = displayLeaderboards(lbData);

    const embed = createEmbed("rARAM Leaderboard", "", embedType.Info)
    .addField("Rank", rankTop, true)
    .addField("Winrate", winrateTop, true)
    .addField("Pentakills", pentaTop, true)
    .addField("Avg KP", kpTop, true)
    .addField("Avg Deaths", deathsTop, true)
    .addField("Avg LP per Win", lpPerWinTop, true)

    msg.embed(embed);
  }
};