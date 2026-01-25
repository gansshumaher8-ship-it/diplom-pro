import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error('Tokens missing');
      return NextResponse.json({ error: 'Нет токенов' }, { status: 500 });
    }

    // Собираем сообщение со ВСЕМИ полями
    const message = `
🔥 <b>НОВАЯ ПОЛНАЯ ЗАЯВКА!</b>

➖➖ <b>КОНТАКТЫ</b> ➖➖
👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
📧 <b>Email:</b> ${data.email || '-'}
⏰ <b>Время связи:</b> ${data.time || '-'}
🏙 <b>Город:</b> ${data.city || '-'}

➖➖ <b>ДОКУМЕНТ</b> ➖➖
📄 <b>Тип:</b> ${data.documentType}
📝 <b>ФИО в диплом:</b> ${data.recipientName || '-'}
📅 <b>Дата рождения:</b> ${data.dob || '-'}
🎓 <b>ВУЗ:</b> ${data.institution || '-'}
⏳ <b>Годы:</b> ${data.years || '-'}
👨‍🎓 <b>Специальность:</b> ${data.specialty || '-'}
📂 <b>Пред. документ:</b> ${data.previousDoc || '-'}

💬 <b>Пожелания:</b>
${data.wishes || 'Нет комментариев'}
    `;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram API Error:', error);
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}