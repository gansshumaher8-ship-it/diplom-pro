"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, CheckCircle, Clock, FileText, Send, ChevronRight, ChevronDown, ChevronUp, 
  Phone, Menu, X, Award, EyeOff, Truck, Star, Building, 
  GraduationCap, Calendar
} from 'lucide-react';

// --- ОБНОВЛЕННАЯ БАЗА ТОВАРОВ ---
const products = [
  // НОВЫЕ ОБРАЗЦЫ
  { 
    id: 1, category: "vuz", title: "Диплом Магистра", year: "2014-2026", 
    price: "28 000 ₽", oldPrice: "32 000 ₽", 
    image: "/diplom-new.jpg", tag: "NEW", color: "bg-blue-600",
    desc: "Новейший образец с QR-кодом (приложением). Полный комплект с вкладышем. Бланк Киржач."
  },
  { 
    id: 2, category: "vuz", title: "Диплом Бакалавра", year: "2014-2026", 
    price: "27 000 ₽", oldPrice: "31 000 ₽", 
    image: "/diplom-new.jpg", tag: "Хит", color: "bg-red-600",
    desc: "Самый популярный документ. Синяя или красная корка. Подходит для любых проверок."
  },
  
  // СТАРЫЕ ОБРАЗЦЫ
  { 
    id: 4, category: "old", title: "Диплом ВУЗа (Старый)", year: "2004-2013", 
    price: "26 000 ₽", oldPrice: "30 000 ₽", 
    image: "/diplom-old.jpg", tag: "", color: "bg-blue-800",
    desc: "Бланки предыдущего поколения. Твердая обложка, вкладыш на отдельном листе."
  },
  { 
    id: 5, category: "old", title: "Диплом ВУЗа (Архив)", year: "1997-2003", 
    price: "25 000 ₽", oldPrice: "29 000 ₽", 
    image: "/diplom-old.jpg", tag: "", color: "bg-indigo-900",
    desc: "Старые бланки с гербом РФ. Полное соответствие архивным стандартам тех лет."
  },
  { 
    id: 7, category: "old", title: "Диплом СССР", year: "до 1996", 
    price: "24 000 ₽", oldPrice: "28 000 ₽", 
    image: "/diplom-ussr.jpg", tag: "Раритет", color: "bg-green-800",
    desc: "Советский образец (книжка). Герб СССР или РФ (для 1992-1996). Заполнение тушью."
  },

  // КОЛЛЕДЖИ
  { 
    id: 8, category: "college", title: "Диплом Колледжа", year: "Любой", 
    price: "25 000 ₽", oldPrice: "29 000 ₽", 
    image: "/college.jpg", tag: "", color: "bg-purple-600",
    desc: "Среднее профессиональное образование (СПО). С приложением и оценками."
  },
  { 
    id: 10, category: "college", title: "Диплом ПТУ", year: "Любой", 
    price: "24 000 ₽", oldPrice: "28 000 ₽", 
    image: "/college.jpg", tag: "", color: "bg-gray-600",
    desc: "Начальное профессиональное образование. Рабочие специальности."
  },

  // ШКОЛА
  { 
    id: 11, category: "school", title: "Аттестат (11 классов)", year: "Любой", 
    price: "22 000 ₽", oldPrice: "26 000 ₽", 
    image: "/attestat.jpg", tag: "", color: "bg-teal-600",
    desc: "Полное среднее образование. Бланки всех годов. Приложение с оценками."
  },
  { 
    id: 13, category: "special", title: "Диплом Кандидата Наук", year: "Любой", 
    price: "35 000 ₽", oldPrice: "45 000 ₽", 
    image: "/diplom-new.jpg", tag: "VIP", color: "bg-yellow-600",
    desc: "Ученая степень. Максимальное качество. Диплом аспиранта."
  },
];

// ... (Остальные массивы reviews и faqs остаются без изменений, скопируй их из прошлого файла) ...
const reviews = [
  { name: "Александр, Москва", text: "Потерял диплом 2003 года при переезде. Восстанавливать официально — куча бюрократии. Здесь сделали копию на старом бланке за день. Бумага та самая, шершавая.", date: "24.01.2026" },
  { name: "Ирина В.", text: "Заказывала диплом магистра 2024 года. Очень переживала за проверку, но бланк светится под ультрафиолетом как надо. Водяные знаки есть. Спасибо!", date: "21.01.2026" },
  { name: "Сергей Петрович", text: "Брал диплом СССР для отца. Сделали всё грамотно, заполнили каллиграфическим почерком, чернилами, а не принтером. Выглядит очень достойно.", date: "15.01.2026" },
  { name: "Дмитрий", text: "Работаю в IT, нужен был диплом для галочки HR-отдела. Взял бакалавра, сделали быстро. Оплатил курьеру после того, как все проверил. Сервис честный.", date: "10.01.2026" },
];

const faqs = [
  { q: "Это настоящие бланки?", a: "Мы используем оригинальные списанные бланки фабрик ГОЗНАК и Киржачской типографии. Все степени защиты (микротекст, водяные знаки, УФ-волокна) присутствуют." },
  { q: "Как происходит доставка?", a: "В Москве и Санкт-Петербурге доставляем курьером лично в руки (бесплатно). В регионы отправляем Почтой России (наложенный платеж) или СДЭК/DHL." },
  { q: "Нужна ли предоплата?", a: "Нет. Мы работаем без предоплаты. Вы платите только после того, как получите документ на руки и проверите правильность заполнения." },
  { q: "Соблюдается ли анонимность?", a: "Строго. После завершения сделки мы безвозвратно удаляем все переписки, макеты и личные данные клиента с наших серверов." },
];

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Данные формы
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '',
    documentType: 'Диплом ВУЗа (2014-2026)',
    details: '' 
  });

  useEffect(() => setMounted(true), []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) return alert("Пожалуйста, заполните Имя и Телефон!");
    setStatus('loading');
    
    try {
      const res = await fetch('/api/send', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) 
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch { 
        setStatus('error'); 
    }
  };

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const filteredProducts = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      
      {/* МОБИЛЬНОЕ МЕНЮ */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white p-6 flex flex-col animate-fade-in">
           <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-2xl">Меню</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
           </div>
           <nav className="flex flex-col gap-6 text-xl font-medium">
              <a href="#catalog" onClick={() => setIsMobileMenuOpen(false)}>Каталог</a>
              <a href="#guarantees" onClick={() => setIsMobileMenuOpen(false)}>Гарантии</a>
              <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>Отзывы</a>
              <a href="#delivery" onClick={() => setIsMobileMenuOpen(false)}>Доставка</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>Вопросы</a>
           </nav>
           <button onClick={() => window.open('https://t.me/DiplomMoskvaBot')} className="mt-auto w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg">Написать в Telegram</button>
        </div>
      )}

      {/* ШАПКА */}
      <header className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-slate-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">D</div>
             <div className="leading-none">
                <div className="font-bold text-lg">Diplom<span className="text-blue-600">Pro</span></div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Москва и РФ</div>
             </div>
          </div>
          
          <nav className="hidden xl:flex gap-8 font-medium text-sm text-slate-600">
            <a href="#catalog" className="hover:text-blue-600 transition">Каталог</a>
            <a href="#guarantees" className="hover:text-blue-600 transition">Оригинал</a>
            <a href="#reviews" className="hover:text-blue-600 transition">Отзывы</a>
            <a href="#delivery" className="hover:text-blue-600 transition">Доставка</a>
            <a href="#order" className="text-blue-600 font-bold transition">Заказать</a>
          </nav>

          <div className="flex items-center gap-4">
             <a href="tel:84996434403" className="hidden md:block font-bold text-slate-900 hover:text-blue-600">8 (499) 643-44-03</a>
             <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden p-2"><Menu className="w-8 h-8 text-slate-800" /></button>
             <button onClick={() => window.open('https://t.me/DiplomMoskvaBot')} className="hidden xl:flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition shadow-lg shadow-blue-200 items-center gap-2">
               <Send className="w-4 h-4" /> Telegram
             </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 relative overflow-hidden bg-white">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-6 animate-pulse">
              <CheckCircle className="w-4 h-4" /> БЕЗ ПРЕДОПЛАТЫ
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 text-slate-900">
              Купить диплом <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">любого ВУЗа РФ</span>
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
              Восстановим диплом института, колледжа или аттестат школы. Оригинальные бланки ГОЗНАК. Любой год (СССР – 2026). Строго конфиденциально.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#order" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition shadow-xl shadow-blue-300 flex items-center justify-center gap-2">
                Рассчитать цену
              </a>
              <a href="#catalog" className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-2">
                Смотреть образцы
              </a>
            </div>
          </div>
          
          <div className="relative mx-auto w-full max-w-md">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 blur-[60px] opacity-20 rounded-full"></div>
             <div className="relative bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition duration-500 cursor-default">
                <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                   <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Документ</div>
                      <div className="font-serif text-xl font-bold text-slate-900">ДИПЛОМ</div>
                   </div>
                   <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Award className="w-3 h-3" /> ОРИГИНАЛ
                   </div>
                </div>
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><Building className="w-4 h-4 text-slate-400"/></div>
                       <div className="h-2 bg-slate-100 rounded-full w-full"></div>
                   </div>
                   <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-slate-400"/></div>
                       <div className="h-2 bg-slate-100 rounded-full w-3/4"></div>
                   </div>
                   <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><Calendar className="w-4 h-4 text-slate-400"/></div>
                       <div className="h-2 bg-slate-100 rounded-full w-1/2"></div>
                   </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 flex justify-between items-center">
                   <div className="text-sm font-bold text-slate-500">Статус проверки:</div>
                   <div className="text-green-600 font-bold flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Успешно</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* КАТАЛОГ С КАРТИНКАМИ */}
      <section id="catalog" className="py-20 bg-slate-50">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Стоимость документов</h2>
               <p className="text-slate-500">Все документы включают: настоящий бланк, приложение с оценками и твердую обложку.</p>
            </div>

            {/* Фильтры */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
               {[
                 { id: "all", label: "Все" },
                 { id: "vuz", label: "Высшее образование" },
                 { id: "old", label: "СССР и Старые" },
                 { id: "college", label: "Колледжи / ПТУ" },
                 { id: "school", label: "Аттестаты" },
               ].map((cat) => (
                  <button 
                    key={cat.id} 
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition duration-300 ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' : 'bg-white text-slate-600 hover:bg-slate-200'}`}
                  >
                    {cat.label}
                  </button>
               ))}
            </div>

            {/* Сетка товаров */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredProducts.map((p) => (
                  <div key={p.id} className="group bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition duration-500 border border-slate-100 flex flex-col">
                     <div className="h-48 bg-slate-100 rounded-2xl mb-5 overflow-hidden relative">
                        {p.tag && <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10 shadow-md">{p.tag}</span>}
                        {/* Цветной бейдж типа */}
                        <div className={`absolute top-0 right-0 w-24 h-24 ${p.color || 'bg-blue-600'} opacity-10 rounded-bl-[4rem]`}></div>
                        
                        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg z-10 shadow-sm flex items-center gap-1">
                           <Calendar className="w-3 h-3 text-blue-600" /> {p.year}
                        </div>
                        {/* Изображение */}
                        <img 
                            src={p.image} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                            alt={p.title} 
                            onError={(e:any) => {
                                // Если картинка не найдена, показываем заглушку
                                e.target.onerror=null; 
                                e.target.parentElement.innerHTML=`<div class=\"flex items-center justify-center w-full h-full ${p.color ? p.color.replace('bg-', 'bg-opacity-10 bg-') : 'bg-slate-100'}\"><div class=\"text-center\"><div class=\"font-bold text-slate-400 text-sm\">ФОТО</div><div class=\"text-[10px] text-slate-300\">${p.title}</div></div></div>`
                            }} 
                        />
                     </div>
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xl text-slate-900 leading-tight">{p.title}</h3>
                     </div>
                     <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-3">{p.desc}</p>
                     <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                        <div>
                           <div className="text-xs text-slate-400 line-through font-medium ml-1">{p.oldPrice}</div>
                           <div className="text-2xl font-bold text-blue-600">{p.price}</div>
                        </div>
                        <button onClick={() => { window.location.href = '#order'; }} className="w-12 h-12 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center transition shadow-lg group-hover:scale-110">
                           <ChevronRight className="w-6 h-6" />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ОСТАЛЬНЫЕ СЕКЦИИ (Гарантии, Отзывы, Форма) ОСТАЮТСЯ ТЕМИ ЖЕ */}
      <section id="guarantees" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Защита <span className="text-blue-600">ГОЗНАК</span></h2>
                 <p className="text-slate-500 mb-8 text-lg leading-relaxed">
                    Мы не печатаем "картинки" на принтере. Мы используем списанные оригинальные бланки государственных типографий. Такой документ пройдет любую проверку, включая визуальную и инструментальную.
                 </p>
                 <div className="space-y-8">
                    <div className="flex gap-5">
                       <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><Shield className="w-7 h-7" /></div>
                       <div><h4 className="font-bold text-xl mb-1">Водяные знаки</h4><p className="text-slate-500">Четкие объемные знаки "РФ", видимые на просвет.</p></div>
                    </div>
                    <div className="flex gap-5">
                       <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><EyeOff className="w-7 h-7" /></div>
                       <div><h4 className="font-bold text-xl mb-1">УФ-защита</h4><p className="text-slate-500">Светящиеся волокна и герб под ультрафиолетовой лампой.</p></div>
                    </div>
                 </div>
              </div>
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[100px] opacity-40"></div>
                 <div className="relative z-10">
                    <h3 id="delivery" className="text-2xl font-bold mb-8 flex items-center gap-3">
                       <Truck className="w-6 h-6 text-blue-400" /> Доставка и Оплата
                    </h3>
                    <div className="space-y-8 border-l-2 border-slate-700 pl-8 ml-2">
                       <div className="relative">
                          <span className="absolute -left-[39px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-900"></span>
                          <strong className="block text-lg mb-1">Москва и СПБ</strong>
                          <p className="text-slate-400">Курьером лично в руки. Оплата <span className="text-white font-bold">наличными при получении</span>.</p>
                       </div>
                       <div className="relative">
                          <span className="absolute -left-[39px] top-1 w-5 h-5 bg-slate-700 rounded-full border-4 border-slate-900"></span>
                          <strong className="block text-lg mb-1">Регионы России</strong>
                          <p className="text-slate-400">Почта России или СДЭК. Видео-отчет перед отправкой.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section id="reviews" className="py-24 bg-slate-50">
         <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Отзывы клиентов</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {reviews.map((r, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                     <div className="flex gap-1 mb-4">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-current" />)}
                     </div>
                     <p className="text-slate-600 mb-6 text-sm leading-relaxed italic">"{r.text}"</p>
                     <div className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-50">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-xs uppercase">{r.name[0]}</div>
                        <div><div className="font-bold text-sm text-slate-900">{r.name}</div><div className="text-xs text-slate-400">{r.date}</div></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section id="order" className="py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Оформить заявку</h2>
               <p className="text-slate-400 max-w-xl mx-auto text-lg">Менеджер свяжется с вами через 15 минут, уточнит детали и пришлет макет на проверку.</p>
            </div>
            <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl">
               {status === 'success' ? (
                  <div className="text-center py-20 animate-fade-in">
                     <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-12 h-12" /></div>
                     <h3 className="text-3xl font-bold mb-4 text-slate-900">Заявка принята!</h3>
                     <p className="text-slate-500 mb-8 text-lg">Мы свяжемся с вами в ближайшее время (Telegram/WhatsApp).</p>
                     <button onClick={() => setStatus('idle')} className="text-blue-600 font-bold hover:bg-blue-50 px-6 py-3 rounded-xl transition">Отправить еще одну</button>
                  </div>
               ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-2"><Phone className="w-5 h-5 text-blue-600" /> Контакты</h4>
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Ваше имя</label><input name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-100 rounded-xl p-4 font-medium outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Алексей" /></div>
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Телефон</label><input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-100 rounded-xl p-4 font-medium outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="+7 (999) 000-00-00" /></div>
                     </div>
                     <div className="space-y-6">
                        <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-2"><FileText className="w-5 h-5 text-blue-600" /> Детали заказа</h4>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Что нужно?</label>
                           <select name="documentType" value={formData.documentType} onChange={handleChange} className="w-full bg-slate-100 rounded-xl p-4 font-medium outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none cursor-pointer">
                              {products.map(p => <option key={p.id} value={p.title}>{p.title} ({p.year})</option>)}
                              <option>Другое</option>
                           </select>
                        </div>
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Комментарий</label><textarea name="details" value={formData.details} onChange={handleChange} className="w-full h-32 bg-slate-100 rounded-xl p-4 font-medium outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" placeholder="ВУЗ, год, город..." /></div>
                     </div>
                     <div className="md:col-span-2 pt-4">
                        <button onClick={handleSubmit} disabled={status === 'loading'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-5 rounded-2xl shadow-xl shadow-blue-200 transition active:scale-[0.99] flex items-center justify-center gap-3">
                           {status === 'loading' ? 'Отправка...' : 'ОТПРАВИТЬ ЗАЯВКУ'} <Send className="w-6 h-6" />
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </section>

      <section id="faq" className="py-20 bg-white">
         <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Вопрос - Ответ</h2>
            <div className="space-y-4">
               {faqs.map((f, i) => (
                  <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 transition">
                     <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left font-bold text-lg text-slate-800 bg-white hover:bg-slate-50 transition">
                        {f.q} {expandedFaq === i ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-slate-400" />}
                     </button>
                     {expandedFaq === i && <div className="px-6 pb-6 pt-2 bg-slate-50 text-slate-600 leading-relaxed border-t border-slate-100">{f.a}</div>}
                  </div>
               ))}
            </div>
         </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
         <div className="container mx-auto px-4 text-center">
             <div className="flex items-center justify-center gap-2 mb-6 text-white font-bold text-2xl">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">D</div>Diplom<span className="text-blue-500">Pro</span>
             </div>
             <p className="text-sm mb-8 opacity-50">© 2026. Сервис помощи в оформлении документов.</p>
         </div>
      </footer>
    </div>
  );
}