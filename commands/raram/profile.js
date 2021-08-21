const { Command } = require("discord.js-commando");
const { createEmbed, embedType } = require("../../utils/embed_creator");
const { displayProfile } = require("../../utils/profile_creator");
const axios = require("axios");

module.exports = class HelpCommand extends Command {
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
    const profileReq = await axios.get('http://localhost:3000/accounts/' + msg.author.id + "/profile");
    const profile = profileReq.data;

    const [col1, col2, col3] = displayProfile(profile);

    const embed = createEmbed(
      profile.summonerName + "'s rARAM Profile",
      "",
      embedType.Info)
      .addField("rARAM", col1, true)
      .addField("K/D/A", col2, true)
      .addField("Kills", col3, true)

    return msg.embed(embed);
  }
};