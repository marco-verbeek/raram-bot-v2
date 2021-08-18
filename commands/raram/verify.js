const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

const { createErrorEmbed } = require('../../utils/embed_creator')
const axios = require("axios");

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
      const verifyReq = await axios.get('http://localhost:3000/accounts/verify/' + msg.author.id + "/" + summonerName)
      const account = verifyReq.data

      // No account has been found: please specify a summonerName.
      if(account.error !== undefined){
        const embed = new MessageEmbed()
        .setAuthor("An error occurred: " + account.error)
        .setDescription("Please use `!raram verify <summonerName>` first.")
        .setColor(0x009FFF)

        return msg.embed(embed)
      }

      // account exists and is verified. Thank you for using rARAM!
      if (account.verified) {
        const embed = new MessageEmbed().setAuthor("Your account " + account.summonerName + " (EUW) is verified.")
        .setDescription("Have fun using rARAM!")
        .setColor(0x00FF00)

        return msg.embed(embed);
      }

      // account exists but has yet to be verified.
      const embed = new MessageEmbed()
      .setAuthor("Attempting to verify account " + account.summonerName + " (EUW).")
      .setDescription("Please save `" + account.uuid + "` in the League Client.\nThen, use `!raram verify`.")
      .setColor(0x009FFF)

      return msg.embed(embed)
    } catch (e) {
      console.log(e)
      const embed = createErrorEmbed("An error occurred: rARAM could not find the Summoner with specified name.", "Please use `!raram verify <summonerName>`.")
      return msg.embed(embed);
    }
  }
};