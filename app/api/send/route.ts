import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, city, documentType, details } = body;

    // --- ТВОИ ДАННЫЕ (Взяты с твоего скриншота) ---
    const token = '8342323616:AAG1HzWuO4JBGH9Wda8tc3UyRfJhlVaf6Es';
    const chatId = '7833997285'; 
    // ----------------------------------------------

    console.log("Попытка отправки...", { name, phone });

    // Формируем сообщение
    const message = `
🔥 <b>НОВАЯ ЗАЯВКА</b>

👤 <b>Имя:</b> ${name}
📞 <b>Тел:</b> ${phone}
🏙 <b>Город:</b> ${city || '-'}
📄 <b>Док:</b> ${documentType}
📝 <b>Инфо:</b> ${details || '-'}
    `;

    // Отправляем
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
        console.error("Telegram Error:", result);
        return NextResponse.json({ error: result.description }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}