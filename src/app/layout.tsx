import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import "./globals.css";
import "../styles/animations.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  variable: '--font-noto-serif-jp',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "パワーカップル診断 | You two",
  description: "あなたとパートナーのパワーカップル偏差値を診断。上位層にはYou two会員クラブへの招待状をお送りします。",
  openGraph: {
    title: "パワーカップル診断 | You two",
    description: "あなたとパートナーのパワーカップル偏差値を診断",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable}`}>
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
