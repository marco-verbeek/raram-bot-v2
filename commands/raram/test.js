const { Command } = require("discord.js-commando");

module.exports = class TestCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'test',
      aliases: ['t'],
      group: 'raram',
      memberName: 'test',
      description: 'test command',
    });
  }

  async run(msg) {
    return msg.reply("Test command executed.")
  }
};