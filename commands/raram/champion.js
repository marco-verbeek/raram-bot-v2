const { Command } = require("discord.js-commando");
const { createEmbed, embedType } = require("../../utils/embed_creator");
const { displayChampStats } = require("../../utils/stats_creator");
const { getChampionStats } = require("../../src/requests")
const { champ_icon } = require("../../utils/icons_creator");

module.exports = class ChampionCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'champion',
      aliases: ['champ', 'c'],
      group: 'raram',
      memberName: 'champion',
      description: 'Displays a champion\'s stats.',
      args: [
        {
          key: 'championName',
          prompt: 'The searched champion\'s name',
          type: 'string',
          default: ''
        }
      ],
      argsPromptLimit: 0,
    });
  }

  async run(msg, { championName }) {
    try {
      const champStats = await getChampionStats(championName);
      const [col1, col2, col3] = displayChampStats(champStats);

      const embed = createEmbed(
        "",
        champ_icon(champStats.name) + " " + champStats.name + "'s rARAM Stats",
        embedType.Info)
      .addField("General", col1, true)
      .addField("Averages", col2, true)
      .addField("Most played by:", col3, true)

      return msg.embed(embed);
    } catch (e) {
      const embed = createEmbed("Could not find a matching champion.", "Are you sure this is a correct champion name and that it has been played before?\nPlease use `!raram champion <championName>`", embedType.Error)
      return msg.embed(embed);
    }
  }
};