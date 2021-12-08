/** @format */

const Command = require("../Structures/Command.js");

module.exports = new Command({
  name: "renew",
  description:
    "Creates a clone of the specified channel and deletes the old channel.",
  permission: "MANAGE_CHANNELS",
  async run(message, args, client) {
    if (!args[0])
      return message.reply(
        "Please enter the name of the channel to be deleted."
      );
    if (!message.mentions.channels.first()) {
      return message.channel.send("You have not mentioned a channel");
    }
    const delChannel = message.mentions.channels.first();
    delChannel.clone();
    delChannel.delete();
  },
});
