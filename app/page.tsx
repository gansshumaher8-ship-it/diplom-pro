'use client';
import { useState } from 'react';
import { Send, GraduationCap, CheckCircle, BookOpen, HelpCircle } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'Сессия под ключ' });
  const [status, setStatus] = useState('');

  // Услуги точь-в-точь как на твоем скриншоте
  const mainServices = [
    { title: "ЗАЧИСЛЕНИЯ", sub: "Помощь с поступлением" },
    { title: "ПЕРЕВОДЫ", sub: "Между ВУЗами без потерь" },
    { title: "СЕССИИ", sub: "Закроем долги и хвосты" },
    { title: "ЭКЗАМЕНЫ", sub: "Гарантия сдачи" },
    { title: "ЗАЧЕТЫ", sub: "Помощь в получении" },
    { title: "ДОП. ПЕРЕСДАЧИ", sub: "Решение с комиссией" },
  ];

  // "Серые" услуги (выделим их визуально, но аккуратно)
  const specialServices = [
    { title: "ДИПЛОМЫ", sub: "СПЕЦ. ЗАКАЗ (ОБСУЖДАЕТСЯ)" },
    { title: "ВОССТАНОВЛЕНИЯ", sub: "ЧЕРЕЗ АРХИВ / ОФИЦИАЛЬНО" },
  ];

  const universities = [
    "РУДН", "МГУ", "РАНХиГС", "ПМГМУ им. Сеченова", 
    "Дипломатическая академия", "РУМ", "РГСУ", 
    "ГУП", "Синергия", "МГИМО", "МГЮА", 
    "МГТУ Баумана", "Губкинский"
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus('loading');
    
    // Отправляем данные в твоего рабочего бота
    try {
        const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name: formData.name, 
            phone: formData.phone, 
            documentType: formData.service, // Какую кнопку выбрал клиент
            details: "Заявка с White Page (Помощь студентам)",
            city: "Не указан"
        }),
        });

        if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', service: 'Сессия под ключ' });
        } else {
        setStatus('error');
        }
    } catch (e) {
        setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-700 tracking-tighter">
            <GraduationCap className="w-8 h-8" />
            STUDENT<span className="text-slate-900">HELP</span>
          </div>
          <a href="https://t.me/Diplompro777" className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-700 transition flex items-center gap-2">
            <Send className="w-4 h-4" /> Telegram
          </a>
        </div>
      </header>

      {/* HERO SECTION (СИНИЙ ФОН КАК НА СКРИНЕ) */}
      <section className="bg-blue-600 text-white pt-16 pb-32 px-4 text-center rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        {/* Декор фона */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 uppercase tracking-tight drop-shadow-md">
            Помощь <br/> Студентам
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">
            Официальное сопровождение в ВУЗах Москвы и РФ. <br/>
            Решаем сложные вопросы с деканатом, сессиями и документами.
          </p>

          {/* СЕТКА УСЛУГ (СИНИЕ КНОПКИ) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {mainServices.map((s, i) => (
              <div key={i} className="bg-blue-500 hover:bg-blue-400 border border-blue-400 p-4 rounded-2xl cursor-pointer transition transform hover:scale-[1.02] shadow-lg flex flex-col items-center justify-center h-24 group"
                   onClick={() => {
                     setFormData({...formData, service: s.title});
                     document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
                   }}>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide group-hover:text-white transition">{s.title}</h3>
                <span className="text-xs text-blue-200 font-bold uppercase tracking-widest">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* СПЕЦ УСЛУГИ (ВЫДЕЛЕНЫ) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mt-4">
            {specialServices.map((s, i) => (
              <div key={i} className="bg-white text-blue-900 p-4 rounded-2xl cursor-pointer transition transform hover:scale-[1.02] shadow-xl border-4 border-blue-300 flex flex-col items-center justify-center h-28 group relative overflow-hidden"
                   onClick={() => {
                     setFormData({...formData, service: s.title + " (Спецзаказ)"});
                     document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
                   }}>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">HOT</div>
                <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">{s.title}</h3>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{s.sub}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* СПИСОК ВУЗОВ */}
      <section className="py-12 px-4 text-center -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Работаем с университетами:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {universities.map((u, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 transition cursor-default">
                {u}
              </span>
            ))}
            <span className="bg-slate-100 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm">и другие...</span>
          </div>
        </div>
      </section>

      {/* ФОРМА ЗАЯВКИ */}
      <section id="form" className="py-16 px-4 bg-slate-50">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Оставить заявку</h2>
            <p className="text-slate-500 mt-2">Менеджер свяжется через 5 минут в Telegram или WhatsApp.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Отправлено!</h3>
                <p className="text-slate-500">Ожидайте ответа менеджера.</p>
                <button onClick={() => setStatus('')} className="mt-6 text-blue-600 font-bold">Отправить еще</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2">Интересующая услуга</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-slate-50 p-4 rounded-xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 mt-1"
                  >
                    {[...mainServices, ...specialServices].map(s => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                
                <input 
                  type="text" 
                  placeholder="Ваше Имя" 
                  className="w-full bg-slate-50 p-4 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                
                <input 
                  type="tel" 
                  placeholder="Телефон / Telegram" 
                  className="w-full bg-slate-50 p-4 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? 'ОТПРАВКА...' : 'ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ'}
                </button>
                
                <p className="text-center text-xs text-slate-400 mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Анонимно.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-sm">
        <p>© 2026 Student Help Center. Консалтинговые услуги.</p>
      </footer>
    </main>
  );
}