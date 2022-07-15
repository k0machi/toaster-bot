require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

const fs = require('fs/promises');
const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

/**
 * @type {{ string: import('./typedefs').ToasterFunction}}
 */
const commandMapping = {};

/**
 * @returns {Promise<import('./typedefs').ToasterCommand[]>}
 */
const commandsLoader = async function () {
    const modules = await fs.readdir(__dirname + '/commands');
    const commands = [];
    for (const moduleName of modules) {
        const module = await import(__dirname + '/commands/' + moduleName);
        commands.push(module.default);
    }
    return commands;
};

const rest = new REST({ version: 10 }).setToken(token);
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    console.log('Refreshing commands...');
    const commands = await commandsLoader();
    const interactions = commands.map((command) => {
        commandMapping[command.name] = command.f;
        return {
            name: command.name,
            description: command.description,
        };
    });
    for (const [id, guild] of await client.guilds.fetch()) {
        console.log(`Registering commands for guild ${guild.name}`);
        await rest.put(Routes.applicationGuildCommands(client.application.id, id), { body: interactions });
    }
    console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {

    if (!interaction.isCommand()) return;

    const f = commandMapping[interaction.commandName];
    if (f) {
        await interaction.reply(f(interaction));
    }
});

// Login to Discord with your client's token
client.login(token);