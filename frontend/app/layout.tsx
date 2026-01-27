import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corporate E-Learning Platform",
  description: "ระบบ E-Learning สำหรับพัฒนาบุคลากรภายในองค์กร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
