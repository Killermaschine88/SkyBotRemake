const Discord = require('discord.js');

module.exports = {
  name: 'hewwo',
  usage: 'hewwo',
  description: 'Says hewwo!',
  folder: 'Fun',
  aliases: [],
  execute(client, message, args) {

    const hewwo = new Discord.MessageEmbed()
      .setTitle('(βα΄ββΏ)')
      .setDescription(`hewwo ${message.author} π`)
      .setColor(Math.floor(Math.random() * 16777215).toString(16))
      .setFooter('( οΎβ‘οΎ)/')
    message.channel.send({ embeds: [hewwo] })
  },
};