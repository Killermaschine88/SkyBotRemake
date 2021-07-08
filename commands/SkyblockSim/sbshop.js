const Discord = require('discord.js');
const prefix = require("@replit/database");
const prefixx = new prefix();

module.exports = {
  name: "Sbshop",
  description: "Shows Skyblock Simulator Shop to buy Upgrades",
  usage: "sbshop <Item to buy>",
  perms: "None",
  folder: "SkyblockSim",
  aliases: ['sbsh'],
  cooldown: 10,
  async execute(client, message, args, mclient) {

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim');
    const found = await collection.findOne({ _id: message.author.id })

    var gprefix = await prefixx.get(message.guild.id, { raw: false });
    if (gprefix === null) gprefix = ',';

    const store = new Discord.MessageEmbed()
      .setDescription('<a:wait:847471618272002059> Refreshing the Store')
      .setColor('90EE90')

    const menu = await message.channel.send({ embeds: [store] })

    //Getting Data needed
    let world = found.world
    let area = found.area
    let coins = found.money
    let areaa = area + 1
    let worldd = world + 1

    if (!args[0]) {
      const shop = new Discord.MessageEmbed()
        .setColor('90EE90')
        .setFooter('')
        .setTitle('Skyblock Simulator Shop')
        .setDescription(`Here you can buy **Upgrades** for your Profile such as **Pets**, stronger Mobs to kill and **Armor** to help you earn more Coins\n\n**Worlds and Areas**\nTo buy a new Area use \`${gprefix}sbshop area\`\nTo buy a new World use \`${gprefix}sbshop world\`\n\n**Pets and Armor**\nTo buy the LuckyCharm Pet use \`${gprefix}sbshop luckycharm\`\nTo buy the Swords use \`${gprefix}sbshop sword\``)
        .setFooter('Skyblock Simulator')

      //World and Area Price
      if (world === 0) {
        if (area === 0) {
          shop.addField(`Area ${areaa}-0`, '1M Coins', true)
        } else if (area === 1) {
          shop.addField(`Area ${areaa}-0`, '2M', true)
        } else if (area === 2) {
          shop.addField(`Area ${areaa}-0`, '4M', true)
        } else if (area === 3) {
          shop.addField(`Area ${areaa}-0`, '6M', true)
        } else if (area === 4) {
          shop.addField(`Area ${areaa}-0`, '8M', true)
        } else {
          shop.addField(`World 0-${worldd}`, '20M', true)
        }
      } else if (world === 1) {
        if (area === 0) {
          shop.addField(`Area ${areaa}-1`, '20M', true)
        } else if (area === 1) {
          shop.addField(`Area ${areaa}-1`, '25M', true)
        } else if (area === 2) {
          shop.addField(`Area ${areaa}-1`, '30M', true)
        } else if (area === 3) {
          shop.addField(`Area ${areaa}-1`, '35M', true)
        } else if (area === 4) {
          shop.addField(`Area ${areaa}-1`, '40m', true)
        } else {
          shop.addField(`World 0-${worldd}`, '50M', true)
        }
      } else if (world === 2) {
        if (area === 0) {
          shop.addField(`Area ${areaa}-2`, '60M', true)
        } else if (area === 1) {
          shop.addField(`Area ${areaa}-2`, '70M', true)
        } else if (area === 2) {
          shop.addField(`Area ${areaa}-2`, '80M', true)
        } else if (area === 3) {
          shop.addField(`Area ${areaa}-2`, '90M', true)
        } else if (area === 4) {
          shop.addField(`Area ${areaa}-2`, '100M', true)
        } else {
          shop.addField(`World 0-${worldd}`, '100M', true)
        }
      } else if (world === 3) {
        if (area === 0) {
          shop.addField(`Area ${areaa}-3`, 'Price', true)
        } else if (area === 1) {
          shop.addField(`Area ${areaa}-3`, 'Price', true)
        } else if (area === 2) {
          shop.addField(`Area ${areaa}-3`, 'Price', true)
        } else if (area === 3) {
          shop.addField(`Area ${areaa}-3`, 'Price', true)
        } else if (area === 4) {
          shop.addField(`Area ${areaa}-3`, 'Price', true)
        } else {
          shop.addField(`World 0-${worldd}`, '200M', true)
        }
      } else if (world === 4) {
        if (area === 0) {
          shop.addField(`Area ${areaa}-4`, 'Price', true)
        } else if (area === 1) {
          shop.addField(`Area ${areaa}-4`, 'Price', true)
        } else if (area === 2) {
          shop.addField(`Area ${areaa}-4`, 'Price', true)
        } else if (area === 3) {
          shop.addField(`Area ${areaa}-4`, 'Price', true)
        } else if (area === 4) {
          shop.addField(`Area ${areaa}-4`, '200M', true)
        }
      }

      //Armor and Pet Price
      if (found.luckycharm === false) {
        shop.addField('Luckycharm Pet', '5M', true)
      }
      if (found.sword === 'jerry') {
        shop.addField('Gold Cleaver', '15M', true)
      } else if (found.sword === 'cleaver') {
        shop.addField('AOTD', '50M', true)
      } else if (found.sword === 'aotd') {
        shop.addField('Livid Dagger', '100M', true)
      } else if (found.sword === 'dagger') {
        shop.addField('Hyperion', '250M', true)
      }
      menu.edit({ embeds: [shop] })

    } else {
      //Area Upgrades
      if (args[0] === 'area') {
        //World 0
        if (world === 0 && area === 0 && coins > 1000000) {
          let endmoney = found.money - 1000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 1 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 1-0 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 0 && area === 1 && coins > 2000000) {
          let endmoney = found.money - 2000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 2 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 2-0 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 0 && area === 2 && coins > 4000000) {
          let endmoney = found.money - 4000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 3 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 3-0 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 0 && area === 3 && coins > 6000000) {
          let endmoney = found.money - 6000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 4 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 4-0 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 0 && area === 4 && coins > 8000000) {
          let endmoney = found.money - 8000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 5 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 5-0 Upgrade')
          menu.edit({ embeds: [purchased] })
        }

      //World 1
        if (world === 1 && area === 0 && coins > 20000000) {
          let endmoney = found.money - 20000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 1 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 1-1 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 1 && area === 1 && coins > 25000000) {
          let endmoney = found.money - 25000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 2 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 2-1 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 1 && area === 2 && coins > 30000000) {
          let endmoney = found.money - 30000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 3 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 3-1 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 1 && area === 3 && coins > 35000000) {
          let endmoney = found.money - 35000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 4 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 4-1 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 1 && area === 4 && coins > 40000000) {
          let endmoney = found.money - 40000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 5 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 5-1 Upgrade')
          menu.edit({ embeds: [purchased] })
        }

      //World 2
        if (world === 2 && area === 0 && coins > 60000000) {
          let endmoney = found.money - 60000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 1 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 1-2 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 2 && area === 1 && coins > 70000000) {
          let endmoney = found.money - 70000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 2 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 2-2 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 2 && area === 2 && coins > 80000000) {
          let endmoney = found.money - 80000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 3 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 3-2 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 2 && area === 3 && coins > 90000000) {
          let endmoney = found.money - 90000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 4 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 4-2 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 2 && area === 4 && coins > 100000000) {
          let endmoney = found.money - 100000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 5 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 5-2 Upgrade')
          menu.edit({ embeds: [purchased] })
        }

        //World 3
        if (world === 3 && area === 0 && coins > 60000000) {
          let endmoney = found.money - 60000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 1 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 1-3 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 3 && area === 1 && coins > 70000000) {
          let endmoney = found.money - 70000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 2 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 2-3 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 3 && area === 2 && coins > 80000000) {
          let endmoney = found.money - 80000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 3 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 3-3 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 3 && area === 3 && coins > 90000000) {
          let endmoney = found.money - 90000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 4 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 4-3 Upgrade')
          menu.edit({ embeds: [purchased] })
        } if (world === 3 && area === 4 && coins > 100000000) {
          let endmoney = found.money - 100000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 5 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Area 5-3 Upgrade')
          menu.edit({ embeds: [purchased] })
        }

        //World Upgrades
      } else if (args[0] === 'world') {
        if (world === 0 && area === 5 && coins > 20000000) {
          let endmoney = found.money - 20000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 0, world: 1 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased World 0-1 Upgrade')
          menu.edit({ embeds: [purchased] })
        } else if (world === 1 && area === 5 && coins > 50000000) {
          let endmoney = found.money - 50000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 0, world: 2 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased World 0-2 Upgrade')
          menu.edit({ embeds: [purchased] })
        } else if (world === 2 && area === 5 && coins > 100000000) {
          let endmoney = found.money - 100000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 0, world: 3 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased World 0-3 Upgrade')
          menu.edit({ embeds: [purchased] })
        } else if (world === 3 && area === 5 && coins > 200000000) {
          let endmoney = found.money - 200000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, area: 0, world: 4 } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased World 0-4 Upgrade')
          menu.edit({ embeds: [purchased] })
        } else {
          const nocash = new Discord.MessageEmbed()
            .setDescription('Not enough Money to buy or all Items owned from this Category')
            .setColor('RED')
          menu.edit({ embeds: [nocash] })
        }

        //Sword Upgrades
      } else if (args[0] === 'sword') {
        if (found.sword === 'jerry' && coins > 15000000) {
          let endmoney = found.money - 15000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, sword: 'cleaver' } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Golden Cleaver')
          menu.edit({ embeds: [purchased] })
        } else if (found.sword === 'cleaver' && coins > 50000000) {
          let endmoney = found.money - 50000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, sword: 'aotd' } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased AOTD')
          menu.edit({ embeds: [purchased] })
        } else if (found.sword === 'aotd' && coins > 100000000) {
          let endmoney = found.money - 100000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, sword: 'dagger' } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Livid Dagger')
          menu.edit({ embeds: [purchased] })
        } else if (found.sword === 'dagger' && coins > 250000000) {
          let endmoney = found.money - 250000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, sword: 'hyp' } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Hyperion')
          menu.edit({ embeds: [purchased] })
        } else {
          const nocash = new Discord.MessageEmbed()
            .setDescription('Not enough Money to buy or all Items owned from this Category')
            .setColor('RED')
          menu.edit({ embeds: [nocash] })
        }

        //Pet Upgrade
      } else if (args[0] === 'luckycharm') {
        if (found.luckycharm === false && coins > 5000000) {
          let endmoney = found.money - 5000000
          await collection.updateOne(
            { _id: message.author.id },
            { $set: { money: endmoney, luckycharm: true } },
            { upsert: true })
          const purchased = new Discord.MessageEmbed()
            .setColor('90EE90')
            .setDescription('Purchased Luckycharm Pet')
          menu.edit({ embeds: [purchased] })
        } else {
          const nocash = new Discord.MessageEmbed()
            .setDescription('Not enough Money to buy or all Items owned from this Category')
            .setColor('RED')
          menu.edit({ embeds: [nocash] })
        }
      } else {
        const notfound = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription(`**Upgrade ${args[0]} not found!**\n\n**Valid Upgrades:**\narea\nworld\nluckycharm\nsword`)
        menu.edit({ embeds: [notfound] })
        return;
      }



    }




  }
};