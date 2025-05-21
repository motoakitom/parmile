"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoChevronBack, IoChevronForward, IoHeartOutline, IoHeart, IoImageOutline } from "react-icons/io5";
import { Product } from "@/data/sample-products";
import useProductStore from "@/lib/store";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const likedProducts = useProductStore(state => state.likedProducts);
  const likeProduct = useProductStore(state => state.likeProduct);
  const removeLikedProduct = useProductStore(state => state.removeLikedProduct);

  if (!product) return null;

  const isLiked = likedProducts.some(p => p.id === product.id);

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
    setImageError(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
    setImageError(false);
  };

  const toggleLike = () => {
    if (isLiked) {
      removeLikedProduct(product.id);
    } else {
      likeProduct(product.id);
    }
  };

  const handleBuy = () => {
    window.open(product.url, "_blank");
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden max-h-[90vh] rounded-lg">
        <div className="overflow-y-auto">
          {/* 画像カルーセル */}
          <div className="relative w-full aspect-square">
            {!imageError ? (
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-contain"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center">
                  <IoImageOutline size={60} className="text-gray-400" />
                  <p className="text-gray-500 mt-2">画像を読み込めませんでした</p>
                  <p className="text-xs text-gray-400 mt-1">{product.brand} - {product.name}</p>
                </div>
              </div>
            )}
            
            {/* カルーセル矢印 - 画像が正常に読み込まれた場合のみ表示 */}
            {product.images.length > 1 && !imageError && (
              <>
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                >
                  <IoChevronBack size={24} />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                >
                  <IoChevronForward size={24} />
                </button>
              </>
            )}
            
            {/* 画像インジケーター - 画像が正常に読み込まれた場合のみ表示 */}
            {product.images.length > 1 && !imageError && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {product.images.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-primary" : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* 商品情報 */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>
              <p className="text-xl font-bold">¥{product.price.toLocaleString()}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold mb-1">説明</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-semibold mb-1">カテゴリー</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">カラー</h3>
                <p className="text-sm text-muted-foreground">{product.color}</p>
              </div>
            </div>
            
            {product.material && (
              <div className="mt-4">
                <h3 className="font-semibold mb-1">素材</h3>
                <p className="text-sm text-muted-foreground">{product.material}</p>
              </div>
            )}
            
            {/* アクションボタン */}
            <div className="flex gap-2 mt-6">
              <Button 
                variant={isLiked ? "destructive" : "outline"} 
                onClick={toggleLike}
                className="flex-1 gap-1"
              >
                {isLiked ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
                {isLiked ? "お気に入り解除" : "お気に入り"}
              </Button>
              <Button onClick={handleBuy} className="flex-1">
                購入サイトへ
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 