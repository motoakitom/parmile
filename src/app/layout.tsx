import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNav from "@/components/bottom-nav";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/lib/store-provider";
import Header from "@/components/header";

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
    <html lang="ja" data-component-name="Root">
      <body className={`${inter.className} min-h-screen bg-gray-50`} data-component-name="Body">
        <StoreProvider>
          <div className="min-h-screen flex flex-col w-full" data-component-name="AppContainer">
            <div className="w-full bg-white" data-component-name="HeaderContainer">
              <Header />
            </div>
            <div className="flex-1 flex flex-col max-w-md mx-auto w-full h-[calc(100vh-4rem)]">
              <main className="flex-1 overflow-y-auto w-full px-4 pt-4 pb-4" data-component-name="MainContent">
                {children}
              </main>
              <div className="w-full bg-white border-t" data-component-name="BottomNavContainer">
                <BottomNav />
              </div>
            </div>
          </div>
          <Toaster position="top-center" />
        </StoreProvider>
      </body>
    </html>
  );
}
