const Discord = require('discord.js');

module.exports = {
  name: "Rat",
  description: "🐀",
  usage: "rat (Member)",
  perms: "🐀",
  folder: "Fun",
  aliases: [],
  execute: (client, message, args) => {

    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    const ratembed = new Discord.MessageEmbed()
      .setTitle("🐀 Ratted User 🐀")
      .setColor("GREY")
      .setDescription(`🐀 ${user} is a Rat! 🐀`)
      .setFooter(`Used by ${message.author.tag}`)

    if (user) {
      message.channel.send({embeds: [ratembed]})
    } else {
      message.channel.send("<a:wait:847471618272002059> You didn't mention a User or an ID to rat.")
    }
  }
};