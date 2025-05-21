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
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];
  
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
    <div className="p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">閲覧履歴</h1>
        <p className="text-muted-foreground">{historyItems.length}件のアイテム</p>
      </header>

      {historyItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {historyItems.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48">
                {!imageErrors[product.id] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                    onClick={() => handleShowDetails(product)}
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center bg-gray-100"
                    onClick={() => handleShowDetails(product)}
                  >
                    <IoImageOutline size={32} className="text-gray-400" />
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 bg-white/70 h-8 w-8 rounded-full"
                  onClick={() => toggleLike(product.id)}
                >
                  {isLiked(product.id) ? (
                    <IoHeart size={18} className="text-red-500" />
                  ) : (
                    <IoHeartOutline size={18} />
                  )}
                </Button>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <p className="text-sm font-bold mt-1">¥{product.price.toLocaleString()}</p>
              </CardContent>
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