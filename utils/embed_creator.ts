const { MessageEmbed } = require("discord.js");

export function createErrorEmbed(title: string, description: string){
  const embed = new MessageEmbed()
    .setAuthor(title)
    .setDescription(description)
    .setColor(0xFF0000)

  return embed;
}
