"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoHeartOutline, IoHeart, IoImageOutline } from "react-icons/io5";
import useProductStore from "@/lib/store";
import ProductDetailModal from "@/components/product-detail-modal";
import { Product } from "@/data/sample-products";

export default function HistoryPage() {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const products = useProductStore(state => state.products);
  const viewedProducts = useProductStore(state => state.viewedProducts);
  const likedProducts = useProductStore(state => state.likedProducts);
  const likeProduct = useProductStore(state => state.likeProduct);
  const removeLikedProduct = useProductStore(state => state.removeLikedProduct);
  
  // 閲覧履歴のアイテムを取得（最新順）
  const historyItems = viewedProducts
    .slice()
    .reverse()
    .map(item => {
      const product = products.find(p => p.id === item.id);
      return product ? { ...product, viewTimestamp: item.timestamp } : null;
    })
    .filter(Boolean) as (Product & { viewTimestamp: number })[];
  
  const handleShowDetails = (product: Product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };
  
  const isLiked = (id: string) => {
    return likedProducts.some(p => p.id === id);
  };
  
  const toggleLike = (id: string) => {
    if (isLiked(id)) {
      removeLikedProduct(id);
    } else {
      likeProduct(id);
    }
  };

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  return (
    <div className="p-4 pb-24">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1">閲覧履歴</h1>
        <p className="text-muted-foreground text-sm">合計 {historyItems.length}件</p>
      </header>

      {historyItems.length > 0 ? (
        <div className="space-y-4">
          {historyItems.map((product, index) => (
            <Card 
              key={`${product.id}-${product.viewTimestamp}-${index}`} 
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-row">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center bg-gray-50">
                  {!imageErrors[product.id] ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="max-h-full max-w-full"
                        style={{
                          objectFit: 'contain',
                          width: 'auto',
                          height: 'auto',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                        onClick={() => handleShowDetails(product)}
                        onError={() => handleImageError(product.id)}
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center bg-gray-50"
                      onClick={() => handleShowDetails(product)}
                    >
                      <IoImageOutline size={24} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-bold">¥{product.price.toLocaleString()}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(product.id);
                      }}
                    >
                      {isLiked(product.id) ? (
                        <IoHeart size={18} className="text-red-500" />
                      ) : (
                        <IoHeartOutline size={18} />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <p className="text-muted-foreground mb-2">閲覧履歴はありません。</p>
          <p className="text-muted-foreground">ホーム画面でアイテムをスワイプすると、ここに表示されます。</p>
        </div>
      )}
      
      <ProductDetailModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} 