/** @format */

const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
  name: "ip",
  description: "Shows the ip of the server.",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const embed = new Discord.MessageEmbed();

    embed
      .setColor("#0099ff")
      .setTitle("IP of GurkhaSMP Server")
      .setDescription("play.gurkhasmp.com")
      .setTimestamp();

    message.delete();

    message.channel.send({ embeds: [embed] });
  },
});
