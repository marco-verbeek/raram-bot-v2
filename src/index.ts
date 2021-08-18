const Commando = require('discord.js-commando');
const path = require('path');

import { config } from "dotenv";
config();

const client = new Commando.Client({
  owner: process.env.DISCORD_OWNER_ID,
  commandPrefix: '!raram '
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}.`);
})

client.registry
  .registerDefaultTypes()
  .registerGroups([['raram', 'Commands related to rARAM']])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false,
    prefix: false,
    ping: false,
    eval: false,
    unknownCommand: false,
    commandState: false,
  })
  .registerCommandsIn(path.join(__dirname + '\\..', 'commands'));

client.login(process.env.DISCORD_TOKEN);
