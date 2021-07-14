const Discord = require('discord.js');
const prefix = require("@replit/database");
const prefixx = new prefix();

module.exports = {
  name: "Sbguide",
  description: "Shows a Guide for Skyblock Simulator",
  usage: "sbguide",
  perms: "None",
  folder: "SkyblockSim",
  aliases: [],
  cooldown: 10,
  async execute(client, message, args) {

    var gprefix = await prefixx.get(message.guild.id, { raw: false });
    if (gprefix === null) gprefix = ',';

    const guide = new Discord.MessageEmbed()
      .setTitle('Skyblock Simulator Guide')
      .setColor('90EE90')
      .setFooter(`${gprefix}help <CommandName> for some Extra Info`)
      .setDescription(`To start playing **Skyblock Simulator** type \`${gprefix}sbstart\` after doing so your Profile will be created and you can start playing by using \`${gprefix}sbfarm\`\n\nTo view the Leaderboard for the Top 5 Coins, Kills and Skills use \`${gprefix}sblb\`\n\nThe Shop is used to buy Swords and Pets the Shop will only Show Items you don't own and can be purchased using \`${gprefix}sbshop <Itemname>\`\n\nThere are 6 Areas per World and theres a Total of 5 Worlds.\nThose Worlds and Areas raise the Amount of Coins u get per Kill.\n\n**Skill Grinding**\nYou can use \`${gprefix}mining\`, \`${gprefix}foraging\`, \`${gprefix}enchanting\`, \`${gprefix}farming\`, \`${gprefix}combat\`, \`${gprefix}fishing\`, \`${gprefix}alchemy\` and \`${gprefix}taming\` to earn Skill XP for those Skills and some Coins.\n(1 Minute Cooldown)\n\n**Vote Rewards**\nIf you vote for me at [Top.gg](https://top.gg/bot/839835292785704980) you earn DOUBLE COINS for 100 Sells\n\n**Item Overview**\nDragon Pet, Phoenix Pet, Enderman Pet reduce Cooldowns when owned.\nJerry Sword, Gold Cleaver, AOTD, Livid Dagger and Hyperion increase the Amount of Mobs u can kill.`)

    message.channel.send({ embeds: [guide] })

  }
};