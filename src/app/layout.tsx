import type { Metadata } from "next";
import "./globals.css";
import { geistSans } from "@/lib/fonts";
import { Footer } from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Search Engine App",
  description: "Search Engine Kelompok 9",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['apple-touch-icon.png']
  }
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased relative h-full w-full bg-[#151515] `}
      >
        {children}
        <Footer/>
      </body>
    </html>
  );
}
