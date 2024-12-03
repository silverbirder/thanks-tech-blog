import "@/styles/globals.css";

import { Noto_Sans_JP } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { clsx } from "clsx";
import { Footer } from "@/app/_components/footer";

export const metadata: Metadata = {
  title: "ありがとう、技術ブログ",
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
      <body className="flex min-h-screen flex-col items-center justify-center">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
        {process.env.GA_ID && <GoogleAnalytics gaId={process.env.GA_ID} />}
      </body>
    </html>
  );
}
