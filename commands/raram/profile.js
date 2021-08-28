const { Command } = require("discord.js-commando");
const { createEmbed, embedType } = require("../../utils/embed_creator");
const { displayProfile } = require("../../utils/profile_creator");
const { getProfile } = require("../../src/requests")

module.exports = class ProfileCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'profile',
      aliases: ['p'],
      group: 'raram',
      memberName: 'profile',
      description: 'Displays your rARAM profile & stats.',
      args: [
        {
          key: 'profileName',
          prompt: 'The searched profile name',
          type: 'string',
          default: ''
        }
      ],
      argsPromptLimit: 0,
    });
  }

  async run(msg, { profileName }) {
    try {
      const id = (profileName !== undefined && profileName !== "") ? profileName : msg.author.id;

      const profile = await getProfile(id);
      const [col1, col2, col3] = displayProfile(profile);

      const embed = createEmbed(
        profile.summonerName + "'s rARAM Profile",
        "",
        embedType.Info)
      .addField("rARAM", col1, true)
      .addField("K/D/A", col2, true)
      .addField("Kills", col3, true)

      return msg.embed(embed);
    } catch (e) {
      const embed = createEmbed("Could not find a matching profile.", "Are you sure this is the correct summoner name?\nPlease use `!raram profile <summonerName>`", embedType.Error)
      return msg.embed(embed);
    }
  }
};