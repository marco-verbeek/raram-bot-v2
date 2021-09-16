const { Command } = require("discord.js-commando");
const { createEmbed, embedType } = require("../../utils/embed_creator");
const { MessageEmbed } = require("discord.js");
const { displayTeamAnalysis } = require("../../utils/analysis_creator");
const { getAccount, getLastPlayedMatchId, getMatchAnalysis } = require("../../src/requests");

module.exports = class AnalyseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'analyse',
      aliases: ['.'],
      group: 'raram',
      memberName: 'analyse',
      description: 'Displays an analysis of your last game.',
      args: [
        {
          key: 'gameId',
          prompt: 'The LoL GameId you\'d like to analyse',
          type: 'string',
          default: ''
        }
      ],
      argsPromptLimit: 0,
    });
  }

  async run(msg, { gameId }) {
    const discordId = msg.author.id;
    const profile = await getAccount(discordId);

    if(profile === undefined || !profile.verified){
      const embed = createEmbed(
        "You do not have a rARAM account, or you haven't verified it yet.",
        "Use `!raram verify <summonerName>` to verify your account.",
        embedType.Error)

      return msg.embed(embed)
    }

    // If there is no gameId provided along with the analyse command, analyse the last played game.
    if(isNaN(parseInt(gameId))){
      const lastMatch = await getLastPlayedMatchId(discordId);

      if(lastMatch.error !== undefined){
        const embed = createEmbed(
          "An error occurred during rARAM's fetching of your last played ARAM.",
          "Error: "+lastMatch.error,
          embedType.Error)

        return msg.embed(embed)
      }

      gameId = lastMatch.matchId;
    }

    const loadingEmbed = new MessageEmbed()
      .setAuthor("Here are your rARAM stats from your last played ARAM:")
      .setDescription("Loading rARAM stats, please wait.")
      .setColor(0x009FFF)

    const loadingMessage = await msg.embed(loadingEmbed)

    try {
      const analysis = await getMatchAnalysis(gameId);
      const [col1, col2, col3] = displayTeamAnalysis(analysis, profile.summonerName, loadingMessage.url)

      const embed = new MessageEmbed()
        .setAuthor("Here are your rARAM stats from your last played ARAM:")
        .setColor(0x009FFF)
        .addField("Player", col1, true)
        .addField("K/D/A", col2, true)
        .addField("League Points", col3, true)
        .setFooter("Rank is only displayed for players in a rARAM queue.")

      return loadingMessage.edit(embed)
    } catch (e) {
      console.error(e);

      const embed = createEmbed(
        "An error occurred: rARAM could not find the game with specified id.",
        "Are you sure this is an existing ARAM game?",
        embedType.Error)

      return loadingMessage.edit(embed);
    }
  }
};