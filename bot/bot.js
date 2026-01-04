const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🎬 YouTube Promotion App", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Open App",
            web_app: {
              url: "https://YOUR_DOMAIN/webapp"
            }
          }
        ]
      ]
    }
  });
});
