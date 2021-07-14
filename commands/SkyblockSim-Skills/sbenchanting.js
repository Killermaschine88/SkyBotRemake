const Discord = require('discord.js');

module.exports = {
  name: "Sbenchanting",
  description: "Earn Enchanting XP",
  usage: "sbenchanting",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['enchanting', 'ench'],
  cooldown: 60,
  async execute(client, message, args, mclient) {

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim');
    let found = await collection.findOne({ _id: message.author.id })

    if (found === null) {
      const noprofile = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('No Profile found')
        .setDescription('Create a Profile using \`sbstart\` or \`sbcreate\`')
      message.channel.send({ embeds: [noprofile] })
      return;
    }

    let earnedxp = Math.floor(Math.random() * (100 - 1) + 1)
    let coins = Math.floor(Math.random() * (15000 - 5000) + 5000)

    await collection.updateOne(
      { _id: message.author.id },
      { $inc: { money: coins, enchanting: earnedxp } },
      { upsert: true })

    const finished = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription(`Finished enchanting Books and earned <:coins:861974605203636253> ${coins} Coins and <:enchanting:852069714511659058> ${earnedxp} Enchanting XP.`)

    message.channel.send({ embeds: [finished] })

  }
};