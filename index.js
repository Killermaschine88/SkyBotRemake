const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_PRESENCES'] });
const config = require('./config.json');
const keepAlive = require('./keepAlive.js');
const fs = require('fs');
const chalk = require('chalk');
const prefix = require("@replit/database");
const prefixx = new prefix();
const mySecret = process.env['token'];
let c = 0;
let e = 0;
const urii = process.env['uri']

const MongoClient = require('mongodb').MongoClient;
const mclient = new MongoClient(urii, { useNewUrlParser: true, useUnifiedTopology: true });


//Topgg votes detection
const Topgg = require("@top-gg/sdk")
const express = require("express")

const app = express()

const webhook = new Topgg.Webhook("69420")

app.post("/dblwebhook", webhook.listener( async vote => {

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim');
    let found = await collection.findOne({ _id: vote.user })

  await collection.updateOne(
        { _id: vote.user },
        { $inc: { voted: 100} },
        { upsert: true })
  //Sending voted message
  client.channels.fetch('850847486826643516')
    .then(channel => channel.send(`<@${vote.user}> has voted for me.\nID: ${vote.user}`))
    .catch(console.error)
    console.log('Someone voted.')
}))

app.listen(80)




// Bot token login
client.login(mySecret);

// Send msg in Console when Bot is usable and set statusss
client.on('ready', () => {
  console.log(chalk.greenBright(`Logged in as ${client.user.username}!`));
  console.log(chalk.greenBright(`Loaded ${c} Commands and ${e} Events!`));
  client.user.setActivity(`${client.users.cache.size} Members and ${client.guilds.cache.size} Servers`, { type: 'WATCHING' });
  mclient.connect()
  console.log(chalk.greenBright(`Logged into MongoDB`));
});


//Replies with the Prefix when Bot is mentioned
client.on('messageCreate', async message => {

  if (message.author.bot) return;
  var gprefix = await prefixx.get(message.guild.id, { raw: false });
  if (gprefix === null) gprefix = '!';
  const bottag = message.mentions.users.first();
  if (bottag === client.user) {
    (message.channel.send(`My Prefix is \`${gprefix}\``))
    return;
  }
});


//Command Loader
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    c += 1;
    client.commands.set(command.name.toLowerCase(), command);
  }
}

//Command Handler
client.on('messageCreate', async message => {

  if (message.channel.type === 'dm') return message.channel.send('I dont work in DMs.')
  let gprefix = await prefixx.get(message.guild.id, { raw: false });
  if (gprefix === null) gprefix = '!';
  if (!message.content.startsWith(gprefix) || message.author.bot) return;
  if (message.author.bot) return

  const args = message.content.slice(gprefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  let cooldownAmount = (command.cooldown || 3) * 1000;

  //Owner Cooldown Bypass
  if (message.author.id === '570267487393021969') {
    cooldownAmount = 0
  }

  if (timestamps.has(message.author.id)) {
    let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    const collection = mclient.db('Sky-Bot').collection('SkyblockSim')
    const found = await collection.findOne({ _id: message.author.id })

    //Phoenix Pet Cooldown Reduction
    let cdr1 = 0
    let cdr2 = 0
    let cdr3 = 0
    let cdr4 = 0

    if (found.phoenix === true) {
      cdr1 = 2000
    }
    if(found.dragon === true) {
      cdr2 = 2000
    }
    if(found.luckcharm === true) {
      cdr3 = 1000 
    }
    if(found.enderman === true) {
      cdr4 = 1000
    }


    let reduced = cdr1 + cdr2 + cdr3 + cdr4
    let exptime = expirationTime - reduced



    if (now < exptime) {
      const timeLeft = (exptime - now) / 1000;
      return message.reply(`You need to wait **${timeLeft.toFixed(1)}s** before using \`${command.name}\` again.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(client, message, args, mclient);
  } catch (error) {
    console.error(error);
    message.reply('There was an Error trying to execute that Command!');
  }
});

//Event Handler
const eventFiles = fs
  .readdirSync('./events')
  .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
    e += 1;
  }
}

//Loophole to keep the Bot running
//keepAlive();

/* how to export commands 
//add cooldown: 0, to set a specific cooldown else it is 3 seconds
const Discord = require('discord.js');
module.exports = {
  name: "Name",
  description: "Description",
  usage: "Usage",
  perms: "Permissions Needed",
  folder: "folder",
  aliases: [],
    execute: (client, message, args) => {
      putmycodehere
    }
};
*/

/*
module.exports = {
	name: 'name',
	execute(client) {
    code here
	}
};
*/