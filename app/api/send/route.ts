import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Получаем данные из новой формы
    const { name, phone, email, city, documentType, details } = await req.json();

    // 1. Проверка настроек (Токен и ID чата должны быть в .env или настройках Vercel)
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Токен или Chat ID не найдены!");
      return NextResponse.json({ error: 'Config missing' }, { status: 500 });
    }

    // 2. Формируем красивое сообщение
    const message = `
🔥 <b>НОВАЯ ЗАЯВКА (DiplomPro)</b>

👤 <b>Клиент:</b> ${name}
📞 <b>Телефон:</b> <code>${phone}</code>
📧 <b>Email:</b> ${email ? email : 'Не указан'}
🏙 <b>Город:</b> ${city || 'Не указан'}

📄 <b>Документ:</b> ${documentType}
📝 <b>Комментарий:</b>
<i>${details || 'Нет комментария'}</i>
    `;

    // 3. Отправляем в Telegram
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
        console.error("Ошибка Telegram API:", await response.text());
        return NextResponse.json({ error: 'Telegram Error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка сервера:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}