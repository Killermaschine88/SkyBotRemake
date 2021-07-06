const Discord = require('discord.js');
const client = new Discord.Client({ intents: Discord.Intents.ALL });
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


/*//cycles status
client.on('ready' , () => {

  const arrayOfStatus = [ 
  `${client.guilds.cache.size} Servers`, 
  `${client.users.cache.size} Users`, 
  `help for help`, 
  `invite to Invite me!`
  ];

let index = 0;
setInterval(() => {
  if (index === arrayOfStatus.length) index
  const status = arrayOfStatus[Math.floor(Math.random()*arrayOfStatus.length)]
  client.user.setActivity(status , {type : 'WATCHING'});
  index++;
}, 30000); 
});*/

//Replies with the Prefix when Bot is mentioned
client.on('messageCreate', async message => {

  if (message.author.bot) return;
  let guildPrefixx = await prefixx.get(message.guild.id, { raw: false });
  if (guildPrefixx === null) guildPrefixx = ',';
  const bottag = message.mentions.users.first();
  if (bottag === client.user) {
    (message.channel.send(`My Prefix is \`${guildPrefixx}\``))
    return;
  }
});


//Command Loader
client.commands = new Discord.Collection();
client.cooldowns 

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
  if (gprefix === null) gprefix = ',';
  if (!message.content.startsWith(gprefix) || message.author.bot) return;
  if (message.author.bot) return

  const args = message.content.slice(gprefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

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
keepAlive();

/* how to export commands
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