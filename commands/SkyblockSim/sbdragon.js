const Discord = require('discord.js');
const prefix = require("@replit/database");
const prefixx = new prefix();

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


    let min = 1
    let max = 2

    let helmrn = Math.floor(Math.random() * (max - min) + min)
    let cprn = Math.floor(Math.random() * (max - min) + min)
    let legsrn = Math.floor(Math.random() * (max - min) + min)
    let bootsrn = Math.floor(Math.random() * (max - min) + min)
    let fragsamount = Math.floor(Math.random() * (15 - 3) + 3)

    let dragonnames = ['Protector', 'Old', 'Wise', 'Unstable', 'Young', 'Strong']
    let dragname = dragonnames[Math.floor(Math.random() * dragonnames.length)];


  }
};