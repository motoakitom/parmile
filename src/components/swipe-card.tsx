"use client";

import { useState } from "react";
import Image from "next/image";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";
import { Card } from "@/components/ui/card";
import { IoHeartOutline, IoCloseOutline, IoImageOutline } from "react-icons/io5";
import { Product } from "@/data/sample-products";

interface SwipeCardProps {
  product: Product;
  onLike: () => void;
  onDislike: () => void;
  onShowDetails: () => void;
  onUndo?: () => void;
}

export default function SwipeCard({ product, onLike, onDislike, onShowDetails, onUndo }: SwipeCardProps) {
  const [active, setActive] = useState(false);
  const [imageError, setImageError] = useState(false);

  // アニメーション用のスプリング
  const [{ x, y, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    config: { tension: 300, friction: 20 }
  }));

  // スワイプ動作のハンドリング
  const bind = useDrag(
    ({ active: isActive, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      // スワイプの方向と速度に基づいて判定
      const trigger = Math.abs(mx) > 100 || vx > 0.5;
      
      // カードをドラッグしている最中の状態
      if (isActive) {
        api.start({
          x: mx,
          rotate: mx / 15,
          scale: 1.05
        });
        setActive(mx > 20 || mx < -20);
        
      // ドラッグが終了したとき
      } else {
        // スワイプが発動条件に達した場合
        if (trigger) {
          const isRight = mx > 0 || xDir > 0;
          
          api.start({
            x: isRight ? 500 : -500,
            y: 0,
            rotate: isRight ? 30 : -30,
            onResolve: () => {
              if (isRight) {
                onLike();
              } else {
                onDislike();
              }
            }
          });
        // 条件に達していない場合は元の位置に戻る
        } else {
          api.start({ x: 0, y: 0, rotate: 0, scale: 1 });
          setActive(false);
        }
      }
    },
    { filterTaps: true }
  );

  const handleImageError = () => {
    setImageError(true);
  };

  // 直接ボタンでのアクション
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    api.start({
      x: 500,
      y: 0,
      rotate: 30,
      onResolve: onLike
    });
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    api.start({
      x: -500,
      y: 0,
      rotate: -30,
      onResolve: onDislike
    });
  };

  return (
    <animated.div
      className="absolute w-full max-w-sm h-full max-h-[calc(100dvh-7rem)] flex flex-col px-2"
      style={{ x, y, rotate, scale }}
      {...bind()}
    >
      <Card className="w-full h-full bg-white rounded-xl overflow-hidden shadow-sm flex flex-col">
        <div className="flex flex-col h-full">
          {/* 画像部分 */}
          <div 
            className="relative w-full flex-1 cursor-pointer"
            onClick={onShowDetails}
          >
            {!imageError ? (
              <Image
                src={product.images[0]} 
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 640px"
                priority
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center">
                  <IoImageOutline size={60} className="text-gray-400" />
                  <p className="text-gray-500 mt-2">画像を読み込めませんでした</p>
                  <p className="text-xs text-gray-400 mt-1">{product.brand}</p>
                </div>
              </div>
            )}
            
            {/* いいね/スキップオーバーレイ */}
            {active && (
              <div className="absolute inset-0 flex items-center justify-center">
                {x.get() > 0 ? (
                  <div className="border-4 border-green-500 rounded-full p-4 bg-white/30 backdrop-blur-sm">
                    <IoHeartOutline size={60} className="text-green-500" />
                  </div>
                ) : (
                  <div className="border-4 border-red-500 rounded-full p-4 bg-white/30 backdrop-blur-sm">
                    <IoCloseOutline size={60} className="text-red-500" />
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* 商品情報 - 画像の下に表示 */}
          <div className="px-3 py-2 flex-shrink-0">
            <h2 className="text-lg font-bold line-clamp-1">{product.name}</h2>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-medium text-gray-600">{product.brand}</span>
              <span className="font-bold text-base">¥{product.price.toLocaleString()}</span>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex justify-center gap-2 p-2">
            <button
              onClick={handleDislike}
              className="w-12 h-12 flex items-center justify-center bg-white border border-red-500 rounded-full shadow-sm hover:bg-red-50 transition-colors"
              aria-label="スキップ"
            >
              <IoCloseOutline size={24} className="text-red-500" />
            </button>
            
            {onUndo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUndo();
                }}
                className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="戻る"
              >
                <IoRefreshOutline size={20} className="text-gray-700" />
              </button>
            )}
            
            <button
              onClick={handleLike}
              className="w-12 h-12 flex items-center justify-center bg-white border border-green-500 rounded-full shadow-sm hover:bg-green-50 transition-colors"
              aria-label="いいね"
            >
              <IoHeartOutline size={24} className="text-green-500" />
            </button>
          </div>
        </div>
      </Card>
    </animated.div>
  );
} 