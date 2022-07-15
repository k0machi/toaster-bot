/**
 * @typedef {function(import("discord.js").Interaction): import("discord.js").InteractionReplyOptions} ToasterFunction
 */

/**
 * @typedef {Object} ToasterCommand
 * @property {string} name - Name of the command
 * @property {string} description - Description of the command
 * @property {ToasterFunction} f - Callable function
 */

exports.unused = {};