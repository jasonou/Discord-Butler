const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as: ${client.user.tag}`);
});

client.login(process.env.CLIENT_TOKEN);

module.exports = client;
