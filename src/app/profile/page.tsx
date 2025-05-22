"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useProductStore from "@/lib/store";

export default function ProfilePage() {
  const likedProducts = useProductStore(state => state.likedProducts);
  const viewedProducts = useProductStore(state => state.viewedProducts);
  
  return (
    <div className="p-5 max-w-2xl mx-auto">
      <header className="mb-8 flex flex-col items-center">
        <Avatar className="h-28 w-28 mb-4 border-4 border-background shadow">
          <AvatarFallback className="text-3xl">ゲスト</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-1">ゲストユーザー</h1>
        <p className="text-muted-foreground text-sm">ログインすると履歴を保存できます</p>
      </header>
      
      <Card className="mb-5 shadow-sm">
        <CardHeader className="pb-3 px-6 pt-5">
          <CardTitle className="text-lg">アクティビティ</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-primary">{likedProducts.length}</p>
              <p className="text-muted-foreground text-sm mt-1">お気に入り</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-3xl font-bold text-primary">{viewedProducts.length}</p>
              <p className="text-muted-foreground text-sm mt-1">閲覧履歴</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-5 shadow-sm">
        <CardHeader className="pb-3 px-6 pt-5">
          <CardTitle className="text-lg">アカウント</CardTitle>
          <CardDescription className="text-sm">現在ゲストモードで利用中です</CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-5">
          <Button className="w-full" disabled>
            ログイン
          </Button>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-3 px-6 pt-5">
          <CardTitle className="text-lg">アプリについて</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-5 space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Parmile (パーミル) は、Tinderライクなスワイプ操作でファッションアイテムを発見できるアプリです。
          </p>
          <p className="text-sm text-muted-foreground">
            バージョン: 1.0.0
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 