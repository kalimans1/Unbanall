const { Client, GatewayIntentBits, Partials } = require("discord.js")

const client = new Client({ intents: [Object.values(GatewayIntentBits)], partials: [Object.values(Partials)] })

client.on("ready", async() => {

    const guild = await client.guilds.cache.get("1214280471496892516")

    guild.bans.fetch().then(bans => {
        bans.forEach(ban => {

            guild.members.unban(ban.user.id)
            console.log("aÃ§tÄ±m: " + ban.user.username)

        })
    })
})

client.login(process.env.token)
