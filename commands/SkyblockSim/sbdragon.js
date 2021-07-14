const Discord = require('discord.js');

module.exports = {
  name: "Sbdragon",
  description: "Slay Dragons",
  usage: "sbdragon",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbd'],
  cooldown: 30,
  async execute(client, message, args, mclient) {

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim');
    let found = await collection.findOne({ _id: message.author.id })
    
    if(found === null) {
      const noprofile = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('No Profile found')
      .setDescription('Create a Profile using \`sbstart\` or \`sbcreate\`')
      
      message.channel.send({embeds: [noprofile]})
      return;
    }
    

    const start = new Discord.MessageEmbed()
      .setDescription('<a:wait:847471618272002059> Slaying Dragons')
      .setColor('90EE90')

    const menu = await message.channel.send({ embeds: [start] })

    //Drop Calculations
    let rn = Math.floor(Math.random() * (15 - 1) + 1)

    let helmrn = Math.floor(Math.random() * (10 - 1) + 1)
    let cprn = Math.floor(Math.random() * (15 - 1) + 1)
    let legsrn = Math.floor(Math.random() * (10 - 1) + 1)
    let bootsrn = Math.floor(Math.random() * (10 - 1) + 1)
    let fragsamount = Math.floor(Math.random() * (15 - 3) + 3)

    //Dragon Name Decision
    let dragonnames = ['Protector', 'Old', 'Wise', 'Unstable', 'Young', 'Strong', 'Superior']
    let dragname = dragonnames[Math.floor(Math.random() * dragonnames.length)];
    let loot = ''

    //Drag Pet Drop
    let dragonpetrn = Math.floor(Math.random() * (50000 - 1) + 1)
    let dragrn = Math.floor(Math.random() * (50000 - 1) + 1)

    if (helmrn === rn) loot = 'Helmet'
    else if (cprn === rn) loot = 'Chestplate'
    else if (legsrn === rn) loot = 'Leggings'
    else if (bootsrn === rn) loot = 'Boots'
    else loot = 'Fragments'


    //Dragon Earned Calc
    let helm = 500000
    let chest = 1000000
    let legs = 750000
    let boots = 500000
    let frags = 20000
    let price = 0

    if (loot === 'Helmet') price = helm
    else if (loot === 'Chestplate') price = chest
    else if (loot === 'Leggings') price = legs
    else if (loot === 'Boots') price = boots
    else price = frags * fragsamount

    let multi = 1

    if (dragname === 'Protector') multi = 1.4
    else if (dragname === 'Old') multi = 1.2
    else if (dragname === 'Wise') multi = 2
    else if (dragname === 'Unstable') multi = 1.8
    else if (dragname === 'Young') multi = 1.2
    else if (dragname === 'Strong') multi = 2.5
    else if (dragname === 'Superior') multi = 5

    let earned = price * multi

    const end = new Discord.MessageEmbed()
      .setTitle('Dragon Loot')
      .setColor('90EE90')
      .setFooter('Skyblock Simulator\nThis is purely cosmetic as of now will change in the Future')
    if (loot === 'Fragments') {
      end.setDescription(`You killed an **${dragname} Dragon** which dropped you **${fragsamount}x ${loot}** earning you **<:coins:861974605203636253> ${earned} Coins**`)
    } else { end.setDescription(`You killed an **${dragname} Dragon** which dropped you **${loot}** earning you **<:coins:861974605203636253> ${earned} Coins**`) }
    
    if(dragonpetrn === dragrn) {
      end.addField('\u200b', '**DRAGON PET DROP**')
    }

    menu.edit({ embeds: [end] })

  }
};