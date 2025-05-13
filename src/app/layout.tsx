import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Agendamentos",
  description: "Gerenciar agendamentos e registros de caminhões",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <nav>
            <ul>
              <li>
                <Link href="/">Lista de Agendamentos</Link>
              </li>
              <li>
                <Link href="/new">Novo Agendamento</Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
