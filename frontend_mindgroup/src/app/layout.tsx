import type { Metadata } from "next";
import "./globals.css";
import {Montserrat} from 'next/font/google';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog de notícias",
};

const font = Montserrat({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={font.className}>
        {children}
        <Toaster theme='dark' richColors position="top-center" />
      </body>
    </html>
  );
}
