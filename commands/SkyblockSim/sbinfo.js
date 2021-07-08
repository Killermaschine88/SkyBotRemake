const Discord = require('discord.js');
module.exports = {
  name: "Sbinfo",
  description: "Creates your Profile for Skyblock Simulator",
  usage: "sbstart",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbi', 'sbview'],
  cooldown: 10,
  async execute(client, message, args, mclient) {


    if (!args[0]) {
      var id = message.member.id;
    } else {
      if (message.mentions.members.first()) {
        var id = message.mentions.members.first().id;
      } else var id = args[0];
    }

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim');
    let found = await collection.findOne({ _id: id })

    let sword = ''
    if (found.sword === 'jerry') {
      sword = 'Jerry Sword'
    } else if (found.sword === 'cleaver') {
      sword = 'Gold Cleaver'
    } else if (found.sword === 'aotd') {
      sword = 'AOTD'
    } else if (found.sword === 'dagger') {
      sword = 'Livid Dagger'
    } else {
      sword = 'Hyperion'
    }


    const start = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription('<a:wait:847471618272002059> Getting Profile Info')

    const menu = await message.channel.send({ embeds: [start] })

    let tcoins = Math.floor(found.money / 1000)
    if (tcoins > 999999) { tcoins = Math.floor(found.money / 1000000000) + '.' + Math.floor((tcoins % 1000000000) / 100000) + 'B' }
    else if (tcoins > 999) {
      { tcoins = Math.floor(found.money / 1000000) + '.' + Math.floor((found.money % 1000000) / 10000) + 'M' }
    } else { tcoins = tcoins + 'K' }

    if (found) {
      const foundinfo = new Discord.MessageEmbed()
        .setFooter('Skyblock Simulator')
        .setColor('90EE90')
        .setDescription(`**Profile Info for <@${id}>**\nCoins: **${tcoins} <:coins:861974605203636253>**\nTotal Kills: **${found.tkills} <:berserker:852079613052059658>**\nRemaining Double Sells: **${found.voted}**`)
        .addField('World', `${found.world}`, true)
        .addField('Area', `${found.area}`, true)
        .addField('Sword', `${sword}`, true)

      if (found.luckycharm === true) {
        foundinfo.addField('Lucky Charm Pet', 'Owned', true)
      }
      if (found.phoenix === true) {
        foundinfo.addField('Phoenix Pet', 'Owned', true)
      }
      if (found.dragon === true) {
        foundinfo.addField('Enderdragon Pet', 'Owned', true)
      }
      if (found.enderman === true) {
        foundinfo.addField('Enderman Pet', 'Owned', true)
      }

      menu.edit({ embeds: [foundinfo] })
      return;
    } else {
      const nodata = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`No Profile found for <@${id}>`)
      menu.edit({ embeds: [nodata] })
    }
  }
};