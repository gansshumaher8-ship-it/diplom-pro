import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, city, documentType, details } = body;

    // --- ТВОИ ДАННЫЕ (Вставлены из сообщения) ---
    // Токен (обрати внимание на символы, скопировано точь-в-точь)
    const token = '8342323616:AAG1HzWu04JBGH9Wda8tc3UyRfJhlVaf6Es';
    // Твой личный Chat ID
    const chatId = '7833997285'; 
    // -------------------------------------------

    console.log("Отправка заявки...", { name, phone });

    // Текст сообщения
    const message = `
🔥 <b>НОВАЯ ЗАЯВКА</b>

👤 <b>Имя:</b> ${name}
📞 <b>Тел:</b> ${phone}
🏙 <b>Город:</b> ${city || 'Не указан'}
📄 <b>Документ:</b> ${documentType}
📝 <b>Инфо:</b> ${details || 'Нет'}
    `;

    // Запрос к Telegram
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    if (!result.ok) {
        console.error("Telegram API Error:", result);
        return NextResponse.json({ error: result.description }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}