require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const devGuild = process.env.DISCORD_DEV_GUILD;

const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const commands = [
    {
        name: 'ping',
        description: 'pong',
    },
];

const rest = new REST({ version: 10 }).setToken(token);
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    console.log('Refreshing commands...');
    await rest.put(Routes.applicationGuildCommands(clientId, devGuild), { body: commands });
    console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
    console.log(interaction);
    if (!interaction.isCommand()) return;

    if (interaction.commandName == 'ping') {
        await interaction.reply({
            fetchReply: true,
            content: '*unzips dick*',
        });
    }
});

// Login to Discord with your client's token
client.login(token);