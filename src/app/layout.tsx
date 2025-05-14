import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar";

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
        <Box
          sx={{
            width: "100vw",
            bgcolor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              p: 4,
            }}
          >
            <Sidebar />
            <Box sx={{ flex: 1 }}>{children}</Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
