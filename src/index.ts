import { config } from "dotenv";

import Commando from "discord.js-commando";
import path from "path";

config();

const client = new Commando.Client({
  owner: process.env.DISCORD_OWNER_ID,
  commandPrefix: '!'
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

client.registry
  .registerDefaultTypes()
  .registerGroups([['raram', 'Commands related to rARAM']])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false,
    prefix: false,
    ping: true,
    eval: true,
    unknownCommand: false,
    commandState: false,
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.DISCORD_TOKEN);
