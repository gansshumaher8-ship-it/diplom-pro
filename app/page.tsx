"use client";

import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Clock, FileText, Send, ChevronRight, ChevronDown, ChevronUp, Phone, MapPin, Menu, X, Award, EyeOff, Globe, Truck, CreditCard } from 'lucide-react';

// --- КОМПОНЕНТЫ И СТИЛИ ---
const inputClass = "w-full bg-slate-100 border-2 border-transparent focus:border-blue-500 rounded-xl p-4 text-slate-900 outline-none transition font-medium placeholder:text-slate-400";
const labelClass = "block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider";

// Данные о товарах
const products = [
  { 
    id: 1, 
    title: "Диплом ВУЗа (Высшее)", 
    desc: "Бакалавр, Магистр, Специалист. Любые года (СССР - 2026).",
    price: "от 27 000 ₽", 
    oldPrice: "31 000 ₽",
    tag: "Хит продаж",
    image: "/vuz.png"
  },
  { 
    id: 2, 
    title: "Диплом Колледжа", 
    desc: "Среднее профессиональное образование (Техникум).",
    price: "от 25 000 ₽", 
    oldPrice: "29 000 ₽",
    tag: "",
    image: "/college.png"
  },
  { 
    id: 3, 
    title: "Школьный аттестат", 
    desc: "За 9 или 11 класс. Любые школы РФ и СССР.",
    price: "от 22 500 ₽", 
    oldPrice: "26 000 ₽",
    tag: "Популярно",
    image: "/school.png"
  },
  { 
    id: 4, 
    title: "Диплом ПТУ", 
    desc: "Начальное профессиональное образование. Рабочие профессии.",
    price: "от 24 500 ₽", 
    oldPrice: "28 000 ₽",
    tag: "",
    image: "/ptu.png"
  },
];

const faqs = [
  { q: "Нужна ли предоплата?", a: "Нет. В Москве и СПБ оплата происходит наличными курьеру ПОСЛЕ проверки документа. В регионы отправляем наложенным платежом." },
  { q: "Как быстро сделаете?", a: "Изготовление макета занимает 2-3 часа. Печать и сборка — 1 день. Если закажете сегодня утром, завтра документ будет у вас." },
  { q: "Это безопасно?", a: "Абсолютно. Мы удаляем все переписки и данные о клиенте сразу после подтверждения получения заказа. Никаких баз данных мы не ведем." },
  { q: "Бланки настоящие?", a: "Да, мы используем оригинальные бланки типографии ГОЗНАК со всеми степенями защиты (водяные знаки, микротекст, свечение в УФ)." },
];

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  // --- ДАННЫЕ ФОРМЫ (Полная анкета) ---
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', time: '', city: '',
    documentType: 'Диплом о Высшем образовании',
    recipientName: '', dob: '', institution: '', years: '', specialty: '', previousDoc: '', wishes: ''
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) return alert("Введите имя и телефон!");
    setStatus('loading');
    try {
      const res = await fetch('/api/send', { method: 'POST', body: JSON.stringify(formData) });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      
      {/* --- МОБИЛЬНОЕ МЕНЮ --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white p-6 flex flex-col gap-6 animate-fade-in">
           <div className="flex justify-between items-center">
              <span className="font-bold text-xl">Меню</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
           </div>
           <nav className="flex flex-col gap-4 text-lg font-medium">
              <a href="#catalog" onClick={() => setIsMobileMenuOpen(false)}>Цены и образцы</a>
              <a href="#guarantees" onClick={() => setIsMobileMenuOpen(false)}>Гарантии</a>
              <a href="#delivery" onClick={() => setIsMobileMenuOpen(false)}>Доставка</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>Вопросы</a>
           </nav>
           <button onClick={() => window.open('https://t.me/YOUR_BOT')} className="mt-auto w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Написать в Telegram</button>
        </div>
      )}

      {/* --- ШАПКА --- */}
      <header className="fixed w-full bg-white/90 backdrop-blur-lg shadow-sm z-50 border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-blue-200 shadow-lg">D</div>
             <div className="leading-tight">
                <div className="font-bold text-lg">Diplom<span className="text-blue-600">Pro</span></div>
                <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Официально</div>
             </div>
          </div>
          
          <nav className="hidden lg:flex gap-8 font-medium text-sm text-slate-500">
            <a href="#catalog" className="hover:text-blue-600 transition">Цены</a>
            <a href="#guarantees" className="hover:text-blue-600 transition">Гарантии</a>
            <a href="#delivery" className="hover:text-blue-600 transition">Доставка</a>
            <a href="#order" className="hover:text-blue-600 transition">Заказать</a>
          </nav>

          <div className="flex items-center gap-4">
             <a href="tel:84996434403" className="hidden md:block font-bold text-slate-900 hover:text-blue-600">8 (499) 643-44-03</a>
             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-900"><Menu className="w-7 h-7" /></button>
             <button onClick={() => window.open('https://t.me/YOUR_BOT')} className="hidden lg:flex bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition shadow-lg shadow-blue-200 items-center gap-2">
               <Send className="w-4 h-4" /> Telegram
             </button>
          </div>
        </div>
      </header>

      {/* --- ГЛАВНЫЙ ЭКРАН --- */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-6">
              <Shield className="w-4 h-4" /> ГАРАНТИЯ КАЧЕСТВА 100%
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 text-slate-900">
              Документы ВУЗов <br/>
              <span className="text-blue-600">без лишних вопросов</span>
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Восстановим диплом или аттестат за 24 часа. Оригинальные бланки ГОЗНАК. Полная конфиденциальность. Оплата при получении.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#order" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition shadow-xl shadow-blue-200 flex items-center justify-center gap-2">
                Рассчитать цену <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#catalog" className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-2">
                Смотреть образцы
              </a>
            </div>
          </div>
          
          {/* Визуализация карточки */}
          <div className="relative mx-auto w-full max-w-md">
             <div className="absolute inset-0 bg-blue-600 blur-[60px] opacity-20 rounded-full"></div>
             <div className="relative bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-100 rotate-3 hover:rotate-0 transition duration-500">
                <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                   <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Серия документа</div>
                      <div className="font-mono text-xl font-bold text-slate-900">RU-2948105</div>
                   </div>
                   <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> ПРОВЕРЕНО
                   </div>
                </div>
                <div className="space-y-4 mb-8">
                   <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                   <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                   <div className="h-4 bg-slate-100 rounded-full w-5/6"></div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="text-sm font-bold text-slate-400">Бланк ГОЗНАК</div>
                   <Award className="w-8 h-8 text-blue-600" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- ПРЕИМУЩЕСТВА --- */}
      <section id="guarantees" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Shield />, title: "Без предоплаты", text: "Оплата только после проверки документа лично в руки." },
                { icon: <Clock />, title: "Готовность 24ч", text: "Срочное изготовление. Сегодня заказали — завтра получили." },
                { icon: <Award />, title: "Бланки ГОЗНАК", text: "Водяные знаки, микротекст, свечение в ультрафиолете." },
                { icon: <EyeOff />, title: "Анонимно", text: "Удаляем все данные сразу после завершения сделки." },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">{item.icon}</div>
                   <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                   <p className="text-sm text-slate-500">{item.text}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- ЦЕНЫ (КАТАЛОГ) --- */}
      <section id="catalog" className="py-24">
         <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Стоимость документов</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {products.map((p) => (
                  <div key={p.id} className="group border border-slate-100 rounded-3xl p-4 hover:border-blue-200 hover:shadow-xl transition duration-300 bg-white">
                     <div className="h-48 bg-slate-100 rounded-2xl mb-4 overflow-hidden relative">
                        {p.tag && <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">{p.tag}</span>}
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={p.title} onError={(e:any) => e.target.src='https://placehold.co/400x300/f1f5f9/94a3b8?text=NO+IMAGE'} />
                     </div>
                     <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                     <p className="text-xs text-slate-500 mb-4">{p.desc}</p>
                     <div className="flex items-center justify-between mt-auto border-t border-slate-50 pt-4">
                        <div>
                           <span className="text-xs text-slate-400 line-through block">{p.oldPrice}</span>
                           <span className="text-xl font-bold text-blue-600">{p.price}</span>
                        </div>
                        <button onClick={() => { window.location.href = '#order'; }} className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition"><ChevronRight className="w-5 h-5" /></button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- ФОРМА ЗАКАЗА (Полная копия анкеты) --- */}
      <section id="order" className="py-24 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="container mx-auto px-4 max-w-4xl relative z-10">
            
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Оформить заявку</h2>
               <p className="text-slate-400">Заполните анкету для создания макета. Менеджер свяжется для проверки данных.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl text-slate-900">
               {status === 'success' ? (
                  <div className="text-center py-20">
                     <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10" /></div>
                     <h3 className="text-2xl font-bold mb-2">Заявка принята!</h3>
                     <p className="text-slate-500 mb-6">Мы уже начали обработку. Ожидайте звонка или сообщения в течение 15 минут.</p>
                     <button onClick={() => setStatus('idle')} className="text-blue-600 font-bold hover:underline">Отправить еще одну</button>
                  </div>
               ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                     
                     {/* Контакты */}
                     <div className="space-y-5">
                        <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold uppercase text-xs tracking-wider"><Phone className="w-4 h-4" /> Контакты</div>
                        <div><label className={labelClass}>Ваше имя *</label><input name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Иван" /></div>
                        <div><label className={labelClass}>Телефон *</label><input name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+7 (999) 000-00-00" /></div>
                        <div><label className={labelClass}>Email</label><input name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="mail@example.com" /></div>
                        <div><label className={labelClass}>Город доставки</label><input name="city" value={formData.city} onChange={handleChange} className={inputClass} placeholder="Москва" /></div>
                     </div>

                     {/* Документ */}
                     <div className="space-y-5">
                        <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold uppercase text-xs tracking-wider"><FileText className="w-4 h-4" /> Данные документа</div>
                        <div>
                           <label className={labelClass}>Тип документа</label>
                           <select name="documentType" value={formData.documentType} onChange={handleChange} className={inputClass}>
                              {products.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                              <option>Академическая справка</option>
                              <option>Свидетельство ЗАГС</option>
                              <option>Другое</option>
                           </select>
                        </div>
                        <div><label className={labelClass}>ФИО в документе</label><input name="recipientName" value={formData.recipientName} onChange={handleChange} className={inputClass} placeholder="Иванов Иван Иванович" /></div>
                        <div><label className={labelClass}>Дата рождения</label><input name="dob" value={formData.dob} onChange={handleChange} className={inputClass} placeholder="01.01.1990" /></div>
                        <div><label className={labelClass}>ВУЗ / Школа</label><input name="institution" value={formData.institution} onChange={handleChange} className={inputClass} placeholder="МГУ им. Ломоносова" /></div>
                        <div><label className={labelClass}>Годы обучения</label><input name="years" value={formData.years} onChange={handleChange} className={inputClass} placeholder="2010 - 2015" /></div>
                     </div>

                     {/* Пожелания (на всю ширину) */}
                     <div className="md:col-span-2 mt-4">
                        <label className={labelClass}>Дополнительные пожелания</label>
                        <textarea name="wishes" value={formData.wishes} onChange={handleChange} className={`${inputClass} h-32 resize-none`} placeholder="Например: нужна 'четверка' по высшей математике, тема диплома..." />
                     </div>

                     <div className="md:col-span-2 mt-4">
                        <button onClick={handleSubmit} disabled={status === 'loading'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl text-lg shadow-xl shadow-blue-200 transition flex items-center justify-center gap-2">
                           {status === 'loading' ? 'Отправка...' : 'ОТПРАВИТЬ ЗАЯВКУ'} <Send className="w-5 h-5" />
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4">Ваши данные надежно защищены и будут удалены после сделки.</p>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 bg-slate-50">
         <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Частые вопросы</h2>
            <div className="space-y-4">
               {faqs.map((f, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition hover:shadow-md">
                     <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left font-bold text-lg">
                        {f.q}
                        {expandedFaq === i ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-slate-400" />}
                     </button>
                     {expandedFaq === i && <div className="px-6 pb-6 text-slate-600 leading-relaxed">{f.a}</div>}
                  </div>
               ))}
            </div>
         </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
         <p>© 2026 DiplomPro. Все права защищены.</p>
      </footer>
    </div>
  );
}