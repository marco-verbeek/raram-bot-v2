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
    .setFooter("rARAM isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.")

    return msg.embed(embed);
  }
};