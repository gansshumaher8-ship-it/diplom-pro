import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, city, documentType, details } = body;

    // --- ЗОНА ТЕСТА (ВСТАВЬ ДАННЫЕ СЮДА) ---
    // Вставь токен прямо в кавычки, например: '54321:AAHGs...'
    const token = '8342323616:AAG1HzWu04JBGH9Wda8tc3UyRfJhlVaf6Es'; 
    
    // Вставь ID чата прямо в кавычки, например: '12345678'
    const chatId = '8342323616'; 
    // ----------------------------------------

    console.log("Попытка отправки...", { name, phone, token: token?.slice(0, 5), chatId });

    if (!token || !chatId || token === 'ТВОЙ_ТОКЕН_ЗДЕСЬ') {
      return NextResponse.json({ error: 'Вы не заменили токен в коде!' }, { status: 500 });
    }

    const message = `
🔥 <b>ТЕСТОВАЯ ЗАЯВКА</b>

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
📄 <b>Док:</b> ${documentType}
    `;

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
    console.log("Ответ Telegram:", result);

    if (!result.ok) {
        return NextResponse.json({ error: result.description }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Critical error:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}