const Discord = require('discord.js');

module.exports = {
  name: "Sbfarming",
  description: "Earn Farming XP",
  usage: "sbfarming",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['farming'],
  cooldown: 180,
  async execute(client, message, args, mclient) {

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim');
    let found = await collection.findOne({ _id: message.author.id })

    const grindingxp = new Discord.MessageEmbed()
      .setDescription('<a:wait:847471618272002059> Grinding Skill XP')
      .setColor('90EE90')

    const menu = await message.channel.send({ embeds: [grindingxp] })

    let earnedxp = Math.floor(Math.random() * (100 - 1) + 1)
    let coins = Math.floor(Math.random() * (15000 - 5000) + 5000)

    await collection.updateOne(
      { _id: message.author.id },
      { $inc: { money: coins, farming: earnedxp } },
      { upsert: true })

    const finished = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription(`Finished killing Mobs and earned <:coins:861974605203636253> ${coins} Coins and <:farming:852069714451759114> ${earnedxp} Farming XP.`)

  menu.edit({embeds: [finished]})

  }
};