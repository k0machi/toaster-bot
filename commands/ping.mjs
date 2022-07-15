/**
 * @param {import("discord.js").Interaction} interaction
 * @returns {import("discord.js").InteractionReplyOptions}
 */
// eslint-disable-next-line no-unused-vars
const helloWorld = function (interaction) {
    console.log(interaction);
    return {
        content: '*unzips dick*',
        fetchReply: true,
    };
};

/**
 * @type {import("../typedefs").ToasterCommand}
 */
export default {
    name: 'ping',
    description: 'heyyyy hana-chaaaaan',
    f: helloWorld,
};