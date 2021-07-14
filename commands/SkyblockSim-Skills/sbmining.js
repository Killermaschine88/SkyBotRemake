const Discord = require('discord.js');

module.exports = {
  name: "Sbmining",
  description: "Earn Mining XP",
  usage: "sbmining",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['mining', 'mine'],
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
      { $inc: { money: coins, mining: earnedxp } },
      { upsert: true })

    const finished = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription(`Finished mining Ores and earned <:coins:861974605203636253> ${coins} Coins and <:mining:852069714577719306> ${earnedxp} Mining XP.`)

    message.channel.send({ embeds: [finished] })

  }
};