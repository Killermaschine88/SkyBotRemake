const Discord = require('discord.js');

module.exports = {
  name: "Sbenchanting",
  description: "Earn Enchanting XP",
  usage: "sbenchanting",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['enchanting'],
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
      { $inc: { money: coins, enchanting: earnedxp } },
      { upsert: true })

    const finished = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription(`Finished killing Mobs and earned <:coins:861974605203636253> ${coins} Coins and <:enchanting:852069714511659058> ${earnedxp} Enchanting XP.`)

  menu.edit({embeds: [finished]})

  }
};