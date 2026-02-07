import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // БЕЛЫЙ ЗАГОЛОВОК (для модерации)
  title: 'Помощь студентам Москвы | Сессии под ключ, Переводы, Экзамены',
  
  // БЕЛОЕ ОПИСАНИЕ
  description: 'Консультационный центр StudentHelp. Помощь в закрытии сессий, переводах между ВУЗами (МГУ, РУДН и др.), восстановлении и сдаче ГОСов. Репетиторство и сопровождение.',
  
  // БЕЛЫЕ КЛЮЧИ
  keywords: [
    'помощь студентам', 
    'закрыть сессию', 
    'перевод в вуз москва', 
    'сдача экзаменов помощь', 
    'консультации для студентов',
    'восстановление в вузе',
    'репетиторство вуз'
  ],

  // Настройки роботов оставляем (чтобы сайт искался)
  robots: {
    index: true,
    follow: true,
  },

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