require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const WEB_APP_URL = 'https://your-domain.com/pay'; // ваш WebApp (мини-приложение)

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Привет! Купи бокс за звезды:', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Купить за Telegram Stars',
                        web_app: { url: WEB_APP_URL }
                    }
                ]
            ]
        }
    });
});
