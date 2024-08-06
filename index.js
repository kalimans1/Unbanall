const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const prefix = '.';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.content.startsWith(`${prefix}unbanall`)) {
        if (!message.guild) return message.reply('This command can only be used in a server.');
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You do not have permission to unban members.');

        message.guild.fetchBans()
            .then(bans => {
                if (bans.size === 0) return message.reply('There are no banned users.');

                bans.forEach(ban => {
                    message.guild.unban(ban.user.id)
                        .then(() => {
                            message.channel.send(`Unbanned ${ban.user.tag}`);
                        })
                        .catch(err => {
                            console.error(err);
                            message.channel.send(`Failed to unban ${ban.user.tag}`);
                        });
                });
            })
            .catch(err => {
                console.error(err);
                message.reply('Failed to fetch bans.');
            });
    }
});

client.login(token);
