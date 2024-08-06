```
const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'YOUR_BOT_TOKEN';
const prefix = '.';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.content.startsWith(`${prefix}unbanall`)) {
        if (!message.guild) return message.reply('This command can only be used in a server.');
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You do not have permission to unban members.');

        try {
            const bans = await message.guild.fetchBans();
            if (bans.size === 0) return message.reply('There are no banned users.');

            bans.forEach(async ban => {
                try {
                    await message.guild.unban(ban.user);
                    message.channel.send(`Unbanned ${ban.user.tag}`);
                } catch (err) {
                    console.error(err);
                    message.channel.send(`Failed to unban ${ban.user.tag}`);
                }
            });
        } catch (err) {
            console.error(err);
            message.reply('Failed to fetch bans.');
        }
    }
});

client.login(token);```
