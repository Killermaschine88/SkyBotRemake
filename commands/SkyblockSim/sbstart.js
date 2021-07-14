const Discord = require('discord.js');
const prefix = require("@replit/database");
const prefixx = new prefix();

module.exports = {
  name: "Sbstart",
  description: "Creates your Profile for Skyblock Simulator",
  usage: "sbstart",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbcreate'],
  cooldown: 10,
  async execute(client, message, args, mclient, gprefix) {

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim');
    let found = await collection.findOne({ _id: message.author.id })

    const start = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription('<a:wait:847471618272002059> Creating Profile')

    const menu = await message.channel.send({ embeds: [start] })


    var gprefix = await prefixx.get(message.guild.id, { raw: false });
    if (gprefix === null) gprefix = '!';

    if (found === null) {
      await collection.updateOne(
        { _id: message.author.id },
        { $set: { money: 0, world: 0, area: 0, tkills: 0, dragon: false, phoenix: false, enderman: false, luckcharm: false, voted: 0, sword: 'jerry', eyes: 0, dkills: 0, dragunlocked: false, prestige: 0, mining: 0, foraging: 0, enchanting: 0, farming: 0, combat: 0, fishing: 0, alchemy: 0, taming: 0 } },
        { upsert: true })


      const created = new Discord.MessageEmbed()
        .setColor('90EE90')
        .setTitle('<a:yes:847468695772987423> Profile Created')
        .setDescription(`To start Grinding Coins use \`${gprefix}sbgrind\` or \`${gprefix}sbfarm\`\nTo view your Profile or another Persons Profile use \`${gprefix}sbinfo (ID/@User)\`\n**FOR A GUIDE ON HOW TO PLAY USE \`${gprefix}sbguide\`**`)
        .setFooter('Skyblock Simulator\nValues in () aren\'t needed')

      menu.edit({ embeds: [created] })
      return;
    } else {
      const profilealready = new Discord.MessageEmbed()
        .setFooter('Values in () aren\'t needed')
        .setColor('90EE90')
        .setTitle('You already have a Profile')
        .setDescription(`Use \`${gprefix}sbinfo (ID/ @User)\` to see your Stats and \`${gprefix}sbgrind\` or \`${gprefix}sbfarm\` to earn Money`)
        .setFooter('Skyblock Simulator')
      menu.edit({ embeds: [profilealready] })
    }
  }
};