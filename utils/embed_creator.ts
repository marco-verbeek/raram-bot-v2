const { MessageEmbed } = require("discord.js");

export enum embedType {
  Info = 0x009FFF,
  Success = 0x00FF00,
  Error = 0xFF0000,
}

export function createEmbed(title: string, description: string, type = embedType.Info) {
  const embed = new MessageEmbed()
    .setAuthor(title)
    .setDescription(description)
    .setColor(type)

  return embed;
}