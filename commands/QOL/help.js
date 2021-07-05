const Discord = require('discord.js');
const fs = require('fs')

module.exports = {
  name: "Help",
  description: "Help me",
  usage: "help <Command Name>",
  perms: "None",
  folder: "QOL",
  aliases: [],
  async execute(client, message, args) {

    if (args[0] === undefined) {
      const mainembed = new Discord.MessageEmbed()
        .setTitle('Sky Bot Help')
        .setDescription('\n\`help <Command Name>\`\nFor a more Detailed view on Commands\n\n🤖 - Bot Help\n🔧 - Config Help\n🎲 - Fun Help\n🔨 - Moderation Help\n❓ - QOL Help\n🏝️ - Skyblock Help\n⚠️ - Work in Progress Help')
        .setColor('ORANGE')
        .setFooter('You have 15 Seconds to React then the Menu will stop working.')

      const menu = await message.channel.send({ embeds: [mainembed] })

      menu.react('🤖')
        .then(() => menu.react('🔧'))
        .then(() => menu.react('🎲'))
        .then(() => menu.react('🔨'))
        .then(() => menu.react('❓'))
        .then(() => menu.react('🏝️'))
        .then(() => menu.react('⚠️'))
        .then(setTimeout(function () { menu.reactions.removeAll(); }, 15000));

   // if(message.guild.me.permissions.has('MANAGE_REACTIONS'))


      const filter = (reaction, user) => {
        return ['🤖', '🔧', '🎲', '🔨', '❓', '🏝️', '⚠️'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      menu.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          let embed = getEmbed(reaction.emoji);

          if (embed.valid) {
            menu.reactions.removeAll();
            menu.edit({ embeds: [embed.embed] });
          }
        }).catch(collected => { }) //This Line is so it dont throw Error upon Collection ending
    }

    const name = args[0].toLowerCase();
    const command = message.client.commands.get(name);

    if (!command) {
      return message.channel.send({embeds: [
        new Discord.MessageEmbed()
          .setDescription(`Command \`${name}\` wasn\'t found.\nUse \`!help\` to see all the Valid Commands. `)
          .setColor('RED')
      ]});
    }

    let embed = new Discord.MessageEmbed()
      .setAuthor(`Help -> ${command.folder} -> ${command.name}`)
      .setColor('616060')

let aliases = ''
if(!command.aliases[0]) {
  aliases = 'None'
} else { aliases = command.aliases }

    embed.setDescription(`${command.description}`)
    embed.addField('Permissions Needed to Execute', `${command.perms}`)
    embed.addField('Usage', `${command.usage}`)
    embed.addField('Aliases', `${aliases}`)

    return message.channel.send({embeds: [embed]})
  }
};


function getEmbed(emoji) {
  let tempEmbed = new Discord.MessageEmbed();
  tempEmbed.setFooter('help <Command Name> for a more detailed Command Info')
  let type = "";

  tempEmbed.setColor("ORANGE")


  switch (emoji.name) {
    case "🤖":
      tempEmbed.setTitle("Bot Help");
      type = "Bot";
      break;
    case "🔧":
      tempEmbed.setTitle("Config Help");
      type = "Config";
      break;
    case "🎲":
      tempEmbed.setTitle("Fun Help");
      type = "Fun";
      break;
    case "🔨":
      tempEmbed.setTitle("Moderation Help");
      type = "Moderation";
      break;
    case "❓":
      tempEmbed.setTitle("QOL Help");
      type = "QOL";
      break;
    case "🏝️":
      tempEmbed.setTitle("Skyblock Help");
      type = "Skyblock";
      break;
    case "⚠️":
      tempEmbed.setTitle("Work in Progress Help");
      type = "WIP";
      break;
  }


  if (type.length > 2) {
    const commandFiles = fs.readdirSync(`./commands/${type}`).filter(file => file.endsWith('.js'));
    const descriptions = [];

    commandFiles.forEach(file => {
      const command = require(`../${type}/${file}`);
      let currentCommand = [];
      currentCommand.push(`\`${command.name.charAt(0).toUpperCase() + command.name.slice(1)}\``);
      currentCommand.push('-');
      currentCommand.push(command.description);
      descriptions.push(currentCommand.join(' '));
    })

    tempEmbed.setDescription(descriptions.join("\n"));

    return {
      embed: tempEmbed,
      valid: true
    }
  } else {
    return {
      valid: false
    }
  }
}