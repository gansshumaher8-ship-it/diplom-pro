import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Заголовок (то, что видно синим цветом в поиске)
  // Формула: Главный запрос | Преимущество | Бренд или Гео
  title: 'Купить диплом о высшем образовании в Москве | Без предоплаты | ГОЗНАК',
  
  // Описание (серый текст под ссылкой)
  // Здесь нужно продать клик: сроки, качество, анонимность
  description: 'Официальное оформление документов об образовании. Дипломы ВУЗов, техникумов, колледжей и аттестаты. Оригинальные бланки ГОЗНАК. Полная конфиденциальность. Изготовление за 24 часа. Доставка курьером лично в руки.',
  
  // Ключевые слова (через запятую)
  keywords: [
    'купить диплом', 
    'купить диплом в москве', 
    'диплом гознак', 
    'купить диплом вуза', 
    'диплом без предоплаты', 
    'купить аттестат', 
    'диплом техникума', 
    'восстановление диплома'
  ],

  // Настройка для роботов (разрешаем индексацию)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Красивая карточка при отправке ссылки в Телеграм/WhatsApp (Open Graph)
  openGraph: {
    title: 'Изготовление дипломов и аттестатов на бланках ГОЗНАК',
    description: 'Без предоплаты. Любые ВУЗы РФ. Полная анонимность. Доставка лично в руки.',
    locale: 'ru_RU',
    type: 'website',
    // Если есть картинка-логотип, можно добавить сюда images: ['/logo.png']
  },

  // Иконки (если есть)
  icons: {
    icon: '/favicon.ico',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}{/* МИКРОРАЗМЕТКА SCHEMA.ORG ДЛЯ ЯНДЕКСА */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Оформление дипломов и аттестатов ГОЗНАК",
              "description": "Помощь в восстановлении документов об образовании. Официальные бланки. Любые ВУЗы Москвы и РФ. Без предоплаты.",
              "image": "https://diplom-pro.vercel.app/diplom.jpg", // Если есть картинка, лучше указать
              "brand": {
                "@type": "Brand",
                "name": "DiplomPro"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://diplom-pro.vercel.app",
                "priceCurrency": "RUB",
                "price": "27000",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "124"
              }
            })
          }}
        />
      </body>
    </html>
  );
}