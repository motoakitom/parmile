"use client";

import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";
import { Product } from "@/data/sample-products";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SwipeCardProps {
  product: Product;
  onLike: () => void;
  onDislike: () => void;
  onShowDetails: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export default function SwipeCard({
  product,
  onLike,
  onDislike,
  onShowDetails,
  onUndo,
  canUndo,
}: SwipeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const isSwiping = useRef(false);

  // アニメーション用のスプリング
  const [{ x, y, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    config: { tension: 300, friction: 20 },
  }));

  // 反転アニメーション用のスタイル
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { duration: 300 },
  });

  // カードを反転させる関数
  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  // スワイプのジェスチャーを設定
  const [spring, springApi] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    config: { tension: 300, friction: 20 },
  }));

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir] }) => {
      // アクティブなドラッグ中は反転を無効化
      if (active) return;

      // スワイプの方向を検出
      if (Math.abs(mx) > 50) {
        setSwipeDirection(mx > 0 ? "right" : "left");
      } else {
        setSwipeDirection(null);
      }

      // スワイプの処理
      if (!active && Math.abs(mx) > 100) {
        // スワイプが閾値を超えた場合
        const dir = mx > 0 ? 1 : -1;
        springApi.start({
          x: dir * 500,
          rotate: dir * 30,
          onResolve: () => {
            if (dir > 0) {
              onLike();
            } else {
              onDislike();
            }
            isSwiping.current = false;
          },
        });
      } else {
        // スワイプがキャンセルされた場合
        springApi.start({
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        });
      }
    },
    {
      bounds: { left: -200, right: 200, top: -200, bottom: 200 },
      rubberband: 0.1,
    }
  );

  // カードの表面をレンダリングする関数
  const renderCardFront = () => (
    <div
      className="relative w-full h-auto bg-transparent"
      style={{ paddingTop: "133.33%" }}
      onClick={(e) => {
        e.stopPropagation();
        onShowDetails();
      }}
    >
      {product.images && product.images.length > 0 ? (
        <div className="absolute inset-0 w-full h-full bg-transparent">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            unoptimized={process.env.NODE_ENV !== "production"}
            style={{ backgroundColor: "transparent" }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">画像がありません</span>
        </div>
      )}
    </div>
  );

  // カードの裏面（商品詳細）をレンダリングする関数
  const renderCardBack = () => (
    <div
      className="absolute inset-0 bg-transparent p-6 flex flex-col overflow-y-auto"
      onClick={toggleFlip}
    >
      <h3 className="text-xl font-bold mb-4">{product.name}</h3>
      <div className="flex-1 space-y-4">
        <div className="aspect-square relative w-full overflow-hidden mb-4 bg-transparent">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              style={{ backgroundColor: "transparent" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={process.env.NODE_ENV !== "production"} // 開発環境では最適化を無効化
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">画像がありません</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-700">{product.description || '商品の説明がありません'}</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <p className="text-sm text-gray-500">ブランド</p>
              <p className="font-medium">{product.brand}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">価格</p>
              <p className="font-medium">¥{product.price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">カテゴリ</p>
              <p className="font-medium">{product.category}</p>
            </div>
            {product.size && (
              <div>
                <p className="text-sm text-gray-500">サイズ</p>
                <p className="font-medium">{product.size}</p>
              </div>
            )}
            {product.color && (
              <div>
                <p className="text-sm text-gray-500">カラー</p>
                <p className="font-medium">{product.color}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShowDetails();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          商品ページを見る
        </button>
        <button
          onClick={toggleFlip}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-start touch-none"
    >
      {/* スワイプ方向に応じたラベル */}
      {swipeDirection && (
        <div 
          className={`absolute top-1/2 z-50 text-4xl font-extrabold opacity-70 pointer-events-none transition-opacity duration-200 ${
            swipeDirection === 'right' 
              ? 'right-1/4 text-green-500' 
              : 'left-1/4 text-red-500'
          }`}
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            transform: `translateY(-50%) rotate(${swipeDirection === 'right' ? '10deg' : '-10deg'})`,
          }}
        >
          {swipeDirection === 'right' ? 'LIKE' : 'NOPE'}
        </div>
      )}

      {/* カードコンテナ */}
      <div className="relative w-full h-auto max-w-md mx-auto touch-pan-y">
        {/* カードの表面 */}
        <animated.div
          className="w-full h-auto max-h-full bg-white shadow-lg overflow-hidden cursor-pointer touch-none"
          style={{
            x: spring.x,
            y: spring.y,
            rotate: spring.rotate,
            scale: spring.scale,
            opacity: isFlipped ? 0 : 1,
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
            transition: isFlipped ? 'opacity 0.3s, transform 0.3s' : '',
            zIndex: isFlipped ? 1 : 2,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
          }}
          onClick={toggleFlip}
          {...bind()}
        >
          {renderCardFront()}
        </animated.div>

        {/* カードの裏面 */}
        <animated.div
          className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden"
          style={{
            opacity: isFlipped ? 1 : 0,
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transition: 'opacity 0.3s, transform 0.3s',
            zIndex: isFlipped ? 2 : 1,
          }}
        >
          {renderCardBack()}
        </animated.div>
      </div>

      {/* ボタンコントロール */}
      <div className="flex justify-center gap-4 mt-2">
        <button
          onClick={() => {
            if (isSwiping.current) return;
            isSwiping.current = true;
            setSwipeDirection('left');
            api.start({
              x: -500,
              y: 0,
              rotate: -30,
              onResolve: () => {
                onDislike();
                isSwiping.current = false;
              },
            });
          }}
          className="w-14 h-14 rounded-full bg-white border-2 border-red-300 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-400 transition-colors shadow-md"
          aria-label="Not"
          title="Not interested"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <button
          onClick={() => {
            if (isSwiping.current || !canUndo) return;
            isSwiping.current = true;
            setSwipeDirection(null);
            api.start({
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              onResolve: () => {
                onUndo();
                isSwiping.current = false;
              },
            });
          }}
          disabled={!canUndo}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md self-center transition-colors ${
            canUndo
              ? 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              : 'bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Undo"
          title="Undo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
 className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        <button
          onClick={() => {
            if (isSwiping.current) return;
            isSwiping.current = true;
            setSwipeDirection('right');
            api.start({
              x: 500,
              y: 0,
              rotate: 30,
              onResolve: () => {
                onLike();
                isSwiping.current = false;
              },
            });
          }}
          className="w-14 h-14 rounded-full bg-white border-2 border-green-300 flex items-center justify-center text-green-500 hover:bg-green-50 hover:border-green-400 transition-colors shadow-md"
          aria-label="Like"
          title="Like"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
} 