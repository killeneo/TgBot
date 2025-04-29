require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

app.post('/stars/payment', (req, res) => {
  const { user, transaction } = req.body;

  if (!user || !transaction) {
    return res.status(400).send('Invalid payload');
  }

  const { payload, amount } = transaction;

  // ✅ Пример простой проверки payload
  if (payload !== 'buy_okup_box' || amount !== 20) {
    return res.status(400).send('Invalid purchase data');
  }

  // 📝 Логируем покупку
  const logEntry = `[${new Date().toISOString()}] Покупка от ${user.id} (${user.username || 'без ника'}): ${amount}⭐️ — ${payload}\n`;

  fs.appendFile('purchases.log', logEntry, (err) => {
    if (err) {
      console.error('Ошибка при записи в лог:', err);
      return res.sendStatus(500);
    }

    console.log('Покупка успешно обработана и записана.');
    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
