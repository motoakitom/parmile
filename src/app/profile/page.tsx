"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useProductStore from "@/lib/store";

export default function ProfilePage() {
  const likedProducts = useProductStore(state => state.likedProducts);
  const viewedProducts = useProductStore(state => state.viewedProducts);
  
  return (
    <div className="p-4">
      <header className="mb-6 flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarFallback>ゲスト</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">ゲストユーザー</h1>
        <p className="text-muted-foreground">ログインすると履歴を保存できます</p>
      </header>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle>アクティビティ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{likedProducts.length}</p>
              <p className="text-muted-foreground text-sm">お気に入り</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{viewedProducts.length}</p>
              <p className="text-muted-foreground text-sm">閲覧履歴</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle>アカウント</CardTitle>
          <CardDescription>現在ゲストモードで利用中です</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" disabled>
            ログイン
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>アプリについて</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
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