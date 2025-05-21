import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNav from "@/components/bottom-nav";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/lib/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parmile - ファッションアイテム発見アプリ",
  description: "Tinderライクなスワイプ操作でファッションアイテムを見つけよう",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} min-h-screen`}>
        <StoreProvider>
          <div className="max-w-md mx-auto pb-16">
            {children}
          </div>
          <BottomNav />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
