const Command = require("../Structures/Command.js");

module.exports = new Command({
  name: "test",
  description: "Tests if the bot is online",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    message.reply("The bot is online!").then((msg) => {
      msg.delete({ timeout: 30000 });
    });
    message.delete();
  },
});
