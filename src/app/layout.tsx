import type React from "react";
import type { Metadata } from "next";
import { Merriweather, Teachers } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProvider } from "@/components/scroll-provider";
import Head from "next/head";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const teachers = Teachers({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nommygraphy | Elegant Photography",
  description:
    "Capturing life's most precious moments with artistry and a touch of magic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6960007850934047"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body
        className={`${merriweather.variable} ${teachers.variable} font-sans`}
      >
        <ScrollProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ScrollProvider>
      </body>
    </html>
  );
}
