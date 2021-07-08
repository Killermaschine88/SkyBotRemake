const Discord = require('discord.js');
module.exports = {
  name: "Sblb",
  description: "Shows Skyblock Simulator Leaderboard",
  usage: "sblb",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbl'],
  cooldown: 10,
  async execute(client, message, args, mclient) {

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim');
    const m = await collection.find({}).sort({ money: -1 }).toArray()
    const k = await collection.find({}).sort({ tkills: -1 }).toArray()

    let m0 = Math.floor(m[0].money / 1000)
    if (m0 > 999999) { m0 = Math.floor(m[0].money / 1000000000) + '.' + Math.floor((m0 % 1000000000) / 100000) + 'B' }
    else if (m0 > 999) {
      { m0 = Math.floor(m[0].money / 1000000) + '.' + Math.floor((m[0].money % 1000000) / 10000) + 'M' }
    } else { m0 = m0 + 'K' }

    let m1 = Math.floor(m[1].money / 1000)
    if (m1 > 999999) { m1 = Math.floor(m[1].money / 1000000000) + '.' + Math.floor((m1 % 1000000000) / 100000) + 'B' }
    else if (m1 > 999) {
      { m1 = Math.floor(m[1].money / 1000000) + '.' + Math.floor((m[1].money % 1000000) / 10000) + 'M' }
    } else { m1 = m1 + 'K' }

    let m2 = Math.floor(m[2].money / 1000)
    if (m2 > 999999) { m2 = Math.floor(m[2].money / 1000000000) + '.' + Math.floor((m2 % 1000000000) / 100000) + 'B' }
    else if (m2 > 999) {
      { m2 = Math.floor(m[2].money / 1000000) + '.' + Math.floor((m[2].money % 1000000) / 10000) + 'M' }
    } else { m2 = m2 + 'K' }

    let m3 = Math.floor(m[3].money / 1000)
    if (m3 > 999999) { m3 = Math.floor(m[3].money / 1000000000) + '.' + Math.floor((m3 % 1000000000) / 100000) + 'B' }
    else if (m3 > 999) {
      { m3 = Math.floor(m[3].money / 1000000) + '.' + Math.floor((m[3].money % 1000000) / 10000) + 'M' }
    } else { m3 = m3 + 'K' }

    let m4 = Math.floor(m[4].money / 1000)
    if (m4 > 999999) { m4 = Math.floor(m[4].money / 1000000000) + '.' + Math.floor((m4 % 1000000000) / 100000) + 'B' }
    else if (m4 > 999) {
      { m4 = Math.floor(m[4].money / 1000000) + '.' + Math.floor((m[4].money % 1000000) / 10000) + 'M' }
    } else { m4 = m4 + 'K' }



    const start = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription('<a:wait:847471618272002059> Getting Leaderboard Info')

    const menu = await message.channel.send({ embeds: [start] })

    const lb = new Discord.MessageEmbed()
      .setTitle('Skyblock Simulator Leaderboard')
      .setFooter('Skyblock Simulator')
      .setColor('90EE90')
      .setDescription(`**<:coins:861974605203636253> Most Coins**\n1st <@${m[0]._id}>: ${m0}\n2nd <@${m[1]._id}>: ${m1}\n3rd <@${m[2]._id}>: ${m2}\n4th <@${m[3]._id}>: ${m3}\n5th <@${m[4]._id}>: ${m4}\n\n\n**<:berserker:852079613052059658> Most Kills**\n1st <@${k[0]._id}>: ${k[0].tkills}\n2nd <@${k[1]._id}>: ${k[1].tkills}\n3rd <@${k[2]._id}>: ${k[2].tkills}\n4th <@${k[3]._id}>: ${k[3].tkills}\n5th <@${k[4]._id}>: ${k[4].tkills}\n`)
    menu.edit({ embeds: [lb] })
  }
};