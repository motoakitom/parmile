"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoTrashOutline, IoImageOutline } from "react-icons/io5";
import useProductStore from "@/lib/store";
import ProductDetailModal from "@/components/product-detail-modal";
import { Product } from "@/data/sample-products";

export default function LikesPage() {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const likedProducts = useProductStore(state => state.likedProducts);
  const removeLikedProduct = useProductStore(state => state.removeLikedProduct);
  
  const handleShowDetails = (product: Product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };
  
  const handleRemove = (id: string) => {
    removeLikedProduct(id);
  };

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  return (
    <div className="p-4 pb-24">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">お気に入り</h1>
        <p className="text-muted-foreground">{likedProducts.length}件のアイテム</p>
      </header>

      {likedProducts.length > 0 ? (
        <div className="space-y-4">
          {likedProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
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
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(product.id);
                      }}
                    >
                      <IoTrashOutline size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <p className="text-muted-foreground mb-2">お気に入りに追加したアイテムはありません。</p>
          <p className="text-muted-foreground">ホーム画面でアイテムを右にスワイプすると、お気に入りに追加できます。</p>
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