import "@/styles/globals.css";

import { Noto_Sans_JP } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { clsx } from "clsx";
import { Footer } from "@/app/_components/footer";

const baseUrl = process.env.BASE_URL ?? "https://thanks-tech-blog.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "ありがとう、技術ブログ",
  robots: {
    index: true,
  },
  description: "私の課題を解決してくれたブログに感謝を",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const noto = Noto_Sans_JP({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={clsx(noto.className, "h-full")}>
      <head>
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/apple-touch-icon.png"
        ></link>
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png"></link>
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center">
        <main className="flex w-full max-w-2xl flex-grow items-start justify-center">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </main>
        <Footer />
        {process.env.GA_ID && <GoogleAnalytics gaId={process.env.GA_ID} />}
      </body>
    </html>
  );
}
