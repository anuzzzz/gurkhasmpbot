/** @format */

const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

const mc = require("minecraft_head");

module.exports = new Command({
  name: "whitelist",
  description: "Whitelists a member.",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    function getUserFromMention(mention) {
      if (!mention) return;

      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);

        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
      }
    }
    if (!message.member.roles.cache.has(config.moderatorroleid)) {
      return message.channel.send(
        "Only moderators or admins can perfrom this action."
      );
    }

    if (!args[1] || !args[2] || args[3]) {
      return message.channel.send(
        "Correct usage:\n`%whitelist <mention-discord-name> <minecraft-username>`"
      );
    }

    const user = getUserFromMention(args[1]);
    if (!user) {
      return message.channel.send(
        "Correct usage:\n`%whitelist <mention-discord-name> <minecraft-username>`"
      );
    }

    const tryuser = getUserFromMention(args[2]);
    if (tryuser) {
      return message.channel.send(
        "Correct usage:\n`%whitelist <mention-discord-name> <minecraft-username>`"
      );
    }

    const description = "||" + args[1] + "||";
    var mcuuid = "";
    try {
      let player = new mc.player(args[2]);
      var mcplayer = player;

      var uuid = mc.nameToUuid(mcplayer);

      mcuuid = await uuid.then((data) => data.uuid);
    } catch (err) {
      return message.channel.send(
        "The username `" + args[2] + "` was not found."
      );
    }
    const busturl = "https://crafatar.com/avatars/" + mcuuid;

    const whitelistEmbed = new Discord.MessageEmbed();
    whitelistEmbed
      .setColor("BLURPLE")
      .setTitle("Whitelist Notification")
      .setDescription(
        "The user with minecraft username **" +
          args[2] +
          "** has been whitelisted.\nPlease make sure that you follow all the rules from <#" +
          config.ruleschannelid +
          "> channel.\nInformation regarding server's website, ip and dynmap links can be found at <#" +
          config.informationchannelid +
          "> channel."
      )
      .setTimestamp()
      .setThumbnail(busturl);

    client.channels.cache
      .get(config.notificationchannelid)
      .send({ content: description, embeds: [whitelistEmbed] });

    message.channel.send(
      "The username `" + args[2] + "` has been whitelisted."
    );

    const consolemessage = "whitelist add " + args[2];
    client.channels.cache.get(config.consolechannelid).send(consolemessage);
  },
});
