module.exports = {
    name: 'help',
    description: 'This command lists all commands',
    execute(message, args, Discord) {
        const Embed = new Discord.MessageEmbed()
            .setAuthor('The list of things I can do')
            .setDescription('Use the ! key before commands to make them work.')
            .addFields(
                {name: 'Usable commands:', value: '> help\n> role\n> ping\n> status\n> communism\n> roll -  from 1 to 6 > roll [#to] - from 1 to # > roll [#from] [#to] - from #1 to #2'}
            )
            .setFooter('Brought to you with love from Commissar Botus Primus.', 'https://cdn.discordapp.com/attachments/630197241033785344/697888385338966076/123.jpg')
            .setTimestamp()
            ;
        message.channel.send(Embed);
    }
}
