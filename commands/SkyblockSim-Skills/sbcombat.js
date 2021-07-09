const Discord = require('discord.js');

module.exports = {
  name: "Sbcombat",
  description: "Earn Combat XP",
  usage: "sbcombat",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['combat'],
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
      { $inc: { money: coins, combat: earnedxp } },
      { upsert: true })

    const finished = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription(`Finished Grinding Combat and earned <:coins:861974605203636253> ${coins} Coins and ${earnedxp} Skill XP.`)



  }
};