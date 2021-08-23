const { Command } = require("discord.js-commando");
const { createEmbed, embedType } = require('../../utils/embed_creator')
const { getAccountVerification } = require("../../src/requests");

module.exports = class VerifyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'verify',
      aliases: ['v'],
      group: 'raram',
      memberName: 'verify',
      description: 'Links your Discord to your LoL account',
      args: [
        {
          key: 'summonerName',
          prompt: 'Your League of Legends summoner name',
          type: 'string',
          default: ''
        }
      ],
      argsPromptLimit: 0,
    });
  }

  async run(msg, { summonerName }) {
    try {
      const account = await getAccountVerification(msg.author.id, summonerName);

      // No account has been found: please specify a summonerName.
      if(account.error !== undefined){
        const embed = createEmbed(
          "An error occurred: " + account.error,
          "Please use `!raram verify <summonerName>` first.",
          embedType.Error);

        return msg.embed(embed);
      }

      // account exists and is verified. Thank you for using rARAM!
      if (account.verified) {
        const embed = createEmbed(
          "Your account " + account.summonerName + " (EUW) is verified.",
          "Have fun using rARAM!",
          embedType.Success);

        return msg.embed(embed);
      }

      // account exists but has yet to be verified.
      const embed = createEmbed(
        "Attempting to verify account " + account.summonerName + " (EUW).",
        "Please save `" + account.uuid + "` in the League Client.\nThen, use `!raram verify`.",
        embedType.Info);

      return msg.embed(embed);
    } catch (e) {
      const embed = createEmbed(
        "An error occurred: rARAM could not find the Summoner with specified name.",
        "Please use `!raram verify <summonerName>`.",
        embedType.Error);

      return msg.embed(embed);
    }
  }
};