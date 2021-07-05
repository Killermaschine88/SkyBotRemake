const Discord = require('discord.js');
const pms = require('pretty-ms')

module.exports = {
  name: "Ping",
  description: "Shows the BOT&API Ping and Bot Uptime!",
  usage: "ping",
  perms: "None",
  folder: "Bot",
  aliases: [],
  execute: async (client, message, args) => {

    const embed = new Discord.MessageEmbed()
      .setDescription('Pinging . . .')
    message.channel.send({embeds: [embed]}).then(m => {

  //Deciding Ping Emoji Shown
  let ping = ''
  if(m.createdTimestamp - message.createdTimestamp < 150) { ping = '<:ping:847473419011620955>'} else if (m.createdTimestamp - message.createdTimestamp < 300) { ping = '<:ping2:859717516548636672>'} else { ping = '<:ping3:859717516284002314>'}

  
      m.edit({embeds: [
        new Discord.MessageEmbed()
          .setTitle("Current Bot Info")
          .setColor('GREEN')
          .addFields(
            { name: `${ping} BOT Latency`, value: `${m.createdTimestamp - message.createdTimestamp}ms.`, inline: false },
            { name: `${ping} API Latency`, value: `${Math.round(client.ws.ping)}ms.`, inline: false }
          )]});
    });
  }
};