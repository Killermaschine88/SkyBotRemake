const Discord = require('discord.js');
const prefix = require("@replit/database");
const prefixx = new prefix();

module.exports = {
  name: "Sbfarm",
  description: "Earnes you Money",
  usage: "sbfarm",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbgrind', 'sbf', 'sbg'],
  cooldown: 10,
  async execute(client, message, args, mclient) {

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim');
    let found = await collection.findOne({ _id: message.author.id })
    var gprefix = await prefixx.get(message.guild.id, { raw: false });
    if (gprefix === null) gprefix = ',';

    if (found === null) {
      const noprofile = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('No Profile found')
        .setDescription('Create a Profile using \`sbstart\` or \`sbcreate\`')
      message.channel.send({ embeds: [noprofile] })
      return;
    }

    const start = new Discord.MessageEmbed()
      .setColor('90EE90')
      .setDescription('<a:wait:847471618272002059> Killing Mobs')

    const menu = await message.channel.send({ embeds: [start] })

    let max = ''
    let min = ''

    if (found.sword === 'jerry') {
      max = 10
      min = 1
    } else if (found.sword === 'cleaver') {
      max = 12
      min = 2
    } else if (found.sword === 'aotd') {
      max = 14
      min = 3
    } else if (found.sword === 'dagger') {
      max = 16
      min = 4
    } else if (found.sword === 'hyp') {
      max = 20
      min = 5
    }

    let rn1 = Math.floor(Math.random() * (max - min) + min)
    let rn2 = Math.floor(Math.random() * (max - min) + min)

    //Phoenix Pet Drop Calculations
    let prn = Math.floor(Math.random() * (10000 - 1) + 1)
    if (prn === 6969) {
      await collection.updateOne(
        { _id: message.author.id },
        { $set: { phoenix: true } },
        { upsert: true })
    }

    let world = found.world
    let area = found.area

    let m1 = ''
    let m2 = ''

    let mb1 = ''
    let mb2 = ''

    //Money Calculations
    if (world === 0) {
      if (area === 0) {
        m1 = 500
        m2 = 1000
      } else if (area === 1) {
        m1 = 1500
        m2 = 2000
      } else if (area === 2) {
        m1 = 2500
        m2 = 3000
      } else if (area === 3) {
        m1 = 3500
        m2 = 4000
      } else if (area === 4) {
        m1 = 4500
        m2 = 5000
      } else {
        m1 = 5500
        m2 = 6000
      }
    } else if (world === 1) {
      if (area === 0) {
        m1 = 7000
        m2 = 8000
      } else if (area === 1) {
        m1 = 9000
        m2 = 10000
      } else if (area === 2) {
        m1 = 11000
        m2 = 12000
      } else if (area === 3) {
        m1 = 13000
        m2 = 14000
      } else if (area === 4) {
        m1 = 15000
        m2 = 16000
      } else {
        m1 = 17000
        m2 = 18000
      }
    } else if (world === 2) {
      if (area === 0) {
        m1 = 20000
        m2 = 22000
      } else if (area === 1) {
        m1 = 24000
        m2 = 26000
      } else if (area === 2) {
        m1 = 28000
        m2 = 30000
      } else if (area === 3) {
        m1 = 32000
        m2 = 34000
      } else if (area === 4) {
        m1 = 36000
        m2 = 38000
      } else {
        m1 = 40000
        m2 = 42000
      }
    } else if (world === 3) {
      if (area === 0) {
        m1 = 45000
        m2 = 50000
      } else if (area === 1) {
        m1 = 55000
        m2 = 60000
      } else if (area === 2) {
        m1 = 65000
        m2 = 70000
      } else if (area === 3) {
        m1 = 75000
        m2 = 80000
      } else if (area === 4) {
        m1 = 85000
        m2 = 90000
      } else {
        m1 = 95000
        m2 = 100000
      }
    } else if (world === 4) {
      if (area === 0) {
        m1 = 110000
        m2 = 120000
      } else if (area === 1) {
        m1 = 130000
        m2 = 14000
      } else if (area === 2) {
        m1 = 150000
        m2 = 160000
      } else if (area === 3) {
        m1 = 170000
        m2 = 180000
      } else if (area === 4) {
        m1 = 190000
        m2 = 200000
      } else {
        m1 = 210000
        m2 = 220000
      }
    }


    //Mob Name
    if (world === 0) { //Hub
      if (area === 0) {
        mb1 = 'Zombie'
        mb2 = 'Zombie Villager'
      } else if (area === 1) {
        mb1 = 'Creeper'
        mb2 = 'Lapis Zombie'
      } else if (area === 2) {
        mb1 = 'Redstone Pigman'
        mb2 = 'Emerald Slime'
      } else if (area === 3) {
        mb1 = 'Diamond Zombie'
        mb2 = 'Diamond Skeleton'
      } else if (area === 4) {
        mb1 = 'Ice Walker'
        mb2 = 'Treasure Hoarder'
      } else {
        mb1 = 'Angry Mineman'
        mb2 = 'Ghost'
      }
    } else if (world === 1) { //Spider's Den
      if (area === 0) {
        mb1 = 'Splitter Spider'
        mb2 = 'Silverfish'
      } else if (area === 1) {
        mb1 = 'Dasher Spider'
        mb2 = 'Weaver Spider'
      } else if (area === 2) {
        mb1 = 'Voracious Spider'
        mb2 = 'Rain Slime'
      } else if (area === 3) {
        mb1 = 'Jockey Skeleton'
        mb2 = 'Spider Jockey'
      } else if (area === 4) {
        mb1 = 'Cave Spider'
        mb2 = 'Broodmother'
      } else {
        mb1 = 'Arachne Keeper'
        mb2 = 'Arachne'
      }
    } else if (world === 2) { //Blazing Fortress
      if (area === 0) {
        mb1 = 'Zombie Pigman'
        mb2 = 'Zombified Pigman'
      } else if (area === 1) {
        mb1 = 'Blaze'
        mb2 = 'Molten Blaze'
      } else if (area === 2) {
        mb1 = 'Wither Skeleton'
        mb2 = 'Skeleton Soldier'
      } else if (area === 3) {
        mb1 = 'Wither Miner'
        mb2 = 'Fortified Wither Skeleton'
      } else if (area === 4) {
        mb1 = 'Ghast'
        mb2 = 'Lava Ghast'
      } else {
        mb1 = 'Lava Slime Summon'
        mb2 = 'Lava Slime'
      }
    } else if (world === 3) { //End
      if (area === 0) {
        mb1 = 'Endermite'
        mb2 = 'Enderling'
      } else if (area === 1) {
        mb1 = 'Enderman'
        mb2 = 'Enraged Enderman'
      } else if (area === 2) {
        mb1 = 'Watcher'
        mb2 = 'Obsidian Defender'
      } else if (area === 3) {
        mb1 = 'Zealot'
        mb2 = 'Special Zealot'
      } else if (area === 4) {
        mb1 = 'Endstone Summoner'
        mb2 = 'Dragonling'
      } else {
        mb1 = 'Endstone Protector'
        mb2 = 'Enderdragon'
      }
    } else if (world === 4) { //Magmatic 
      if (area === 0) {
        mb1 = 'aaaaaaa'
        mb2 = 'aaaaaaa'
      } else if (area === 1) {
        mb1 = 'aaaaaaa'
        mb2 = 'aaaaaaa'
      } else if (area === 2) {
        mb1 = 'aaaaaaa'
        mb2 = 'aaaaaaa'
      } else if (area === 3) {
        mb1 = 'aaaaaaa'
        mb2 = 'aaaaaaa'
      } else if (area === 4) {
        mb1 = 'aaaaaaa'
        mb2 = 'aaaaaaa'
      } else {
        mb1 = 'aaaaaaa'
        mb2 = 'aaaaaaa'
      }
    }

    //Adding Vote Multiplier

    //End Calculations
    let e1 = m1 * rn1
    let e2 = m2 * rn2
    let tk = rn1 + rn2
    let ttk = tk + found.tkills
    let tee = e1 + e2
    var multi = 1
    if (found.voted != 0) {
      multi = 2
    } else { multi = 1 }
    let te = tee * multi
    let tte = te + found.money

    let tcoins = Math.floor(tte / 1000)
    if (tcoins > 999999) { tcoins = Math.floor(tte / 1000000000) + '.' + Math.floor((tcoins % 1000000000) / 100000) + 'B' }
    else if (tcoins > 999) {
      { tcoins = Math.floor(tte / 1000000) + '.' + Math.floor((tte % 1000000) / 10000) + 'M' }
    } else { tcoins = tcoins + 'K' }


    const finish = new Discord.MessageEmbed()
      .setTitle('Results from Farming')
      .setColor('90EE90')
      .setDescription(`Earned **<:coins:861974605203636253> ${te}** Coins from killing **${rn1} ${mb1}s** and **${rn2} ${mb2}s**`)
      .setFooter(`Total Coins: ${tcoins}`)
    if (prn === 6969) {
      finish.addField('\u200b', '**PHOENIX DROP**')
    }
    if (found.voted != 0) {
      finish.addField('DOUBLE MONEY ACTIVE', '\u200b')
    } else {
      finish.addField('DOUBLE MONEY INACTIVE', `Earn Double Money by voting for me using **${gprefix}vote**`)
    }
    menu.edit({ embeds: [finish] })

    await collection.updateOne(
      { _id: message.author.id },
      { $set: { money: tte, tkills: ttk } },
      { upsert: true })

    var voteminus = found.voted - 1
    if (found.voted != 0) {
      await collection.updateOne(
        { _id: message.author.id },
        { $set: { voted: voteminus } },
        { upsert: true })
    }
  }
};