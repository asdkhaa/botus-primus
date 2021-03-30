// LIBRARIES
const Discord = require('discord.js');
const client = new Discord.Client();
const ping = require('minecraft-server-util');
const fs = require('fs');
const mongoose = require('mongoose')

// BOT SETTINGS - Change these to deploy the bot locally 
const PREFIX = process.env.PREFIX;
const TOKEN = process.env.BOT_TOKEN;
const DB_LOGIN = process.env.DB_LOGIN;

// CONNECT TO DATABASE
mongoose.connect(`mongodb+srv://asdkhaa:${DB_LOGIN}@cluster0.dfwri.mongodb.net/botus-primus`, { useNewUrlParser: true, useUnifiedTopology: true})

var prev_status = false;

client.commands = new Discord.Collection();

// READ COMMAND DIRECTORY
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// STARTUP
client.on('ready', () =>{
    console.log('Bot is online.');
    client.user.setActivity(`${PREFIX}help`, {type:'LISTENING'})
    updateStatusText();
    setInterval(updateStatusText, 1 * 60 * 1000)
})

// STATUS TEXT QUERY
function updateStatusText() {
    ping('afb.servegame.com', 25565, (error, response) => {
        console.log('Query was made.')
        if (response !== null && prev_status == false) {
            console.log('started')
            //channel.send('Server has started')
            prev_status = true
        }
        if (response == null && prev_status == true) {
            console.log('stopped')
            //channel.send('Server has stoped')
            prev_status = false
        }
    });
};

// CHAT COMMANDS
client.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case 'help':
            client.commands.get('help').execute(message, args, Discord);
        break;
        case 'ping':
            client.commands.get('ping').execute(message, args);
        break;
        case 'communism':
            client.commands.get('communism').execute(message, args);
        break;
        case 'role':
            client.commands.get('role').execute(message, args);
        break;
        case 'status':
            client.commands.get('status').execute(message, args, ping, Discord);
        break;
        case 'event':
            client.commands.get('event').execute(message, args, Discord);
        break;
        case 'roll':
            client.commands.get('roll').execute(message, args);
        break;
        case 'championpool':
            client.commands.get('championpool').execute(message, args);
        break;
        case 'cdr':
            client.commands.get('cdr').execute(message, args);
        break;
        case 'ah':
            client.commands.get('ah').execute(message, args);
        break;    
        default:
            message.channel.send(`The following command does not exists: **${PREFIX}` + command + `**\nWrite **${PREFIX}help** to see the list of things I can do.`);
    }
})

// BOT LOGIN
client.login(TOKEN);
