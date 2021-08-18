const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

const commands = require('../../data/commands.json')

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['h', '?'],
      group: 'raram',
      memberName: 'help',
      description: 'Displays all commands and their description',
    });
  }

  async run(msg) {
    const displayCommands = "`"+ Object.keys(commands).join("`\n`") + "`"

    const embed = new MessageEmbed()
    .setColor(0x00b3ff)
    .addField("Command", displayCommands, true)
    .addField("Description", Object.values(commands).join("\n"), true)

    return msg.embed(embed);
  }
};