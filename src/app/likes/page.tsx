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
    <div className="p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">お気に入り</h1>
        <p className="text-muted-foreground">{likedProducts.length}件のアイテム</p>
      </header>

      {likedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {likedProducts.map(product => (
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
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                    <p className="text-sm font-bold mt-1">¥{product.price.toLocaleString()}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleRemove(product.id)}
                  >
                    <IoTrashOutline size={16} />
                  </Button>
                </div>
              </CardContent>
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