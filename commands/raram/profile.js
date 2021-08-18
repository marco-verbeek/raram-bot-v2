const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { createEmbed, embedType } = require("../../utils/embed_creator");
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
    const profileReq = await axios.get('http://localhost:3000/accounts/' + msg.author.id + "/stats");
    const profile = profileReq.data;
    console.log(profile);

    const embed = createEmbed("rARAM Profile", "Desc", embedType.Info)

    return msg.embed(embed);
  }
};