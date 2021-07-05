const Discord = require('discord.js');

module.exports = {
  name: "Purge",
  description: "Purge Messages",
  usage: "purge (Message Amount)\n\`Example: !purge 10\`\n Max Message Amount to delete is 100.",
  perms: "Manage Messages",
  folder: "Moderation",
  aliases: [],
  execute: (client, message, args) => {
    
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send("You are missing the Permission \`MANAGE_MESSAGES\`.");

    if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.channel.send('I don\'t have \`MANAGE_MESSAGES\` Permission.')
    if (!args[0]) return message.channel.send('<a:wait:847471618272002059> Please define how many Messages should be deleted.')
    message.channel.bulkDelete(args[0]);
    message.channel.send(`<a:yes:847468695772987423> Succesfully deleted ${args[0]} Messages`)
  }
};