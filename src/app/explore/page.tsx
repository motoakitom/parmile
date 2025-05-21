"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IoRefreshOutline, IoShuffleOutline } from "react-icons/io5";
import SwipeCard from "@/components/swipe-card";
import ProductDetailModal from "@/components/product-detail-modal";
import ProductFilter from "@/components/product-filter";
import useProductStore from "@/lib/store";
import { Product } from "@/data/sample-products";

export default function ExplorePage() {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const products = useProductStore(state => state.products);
  const currentIndex = useProductStore(state => state.currentIndex);
  const likeProduct = useProductStore(state => state.likeProduct);
  const dislikeProduct = useProductStore(state => state.dislikeProduct);
  const undoLastAction = useProductStore(state => state.undoLastAction);
  const filterBrands = useProductStore(state => state.filterBrands);
  const shuffleProducts = useProductStore(state => state.shuffleProducts);
  
  // ページ読み込み時の初期化
  useEffect(() => {
    // データが読み込まれたらローディング状態を解除
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);
  
  // フィルタリング適用
  const filteredProducts = products.filter(product => {
    // ブランドフィルターが指定されていない場合はすべて表示
    if (filterBrands.length === 0) return true;
    // ブランドフィルターに一致する商品のみを表示
    return filterBrands.includes(product.brand);
  });
  
  // 現在表示する商品
  const currentProduct = filteredProducts.length > 0 
    ? filteredProducts[currentIndex % filteredProducts.length] 
    : null;

  // 元に戻す操作
  const handleUndo = () => {
    undoLastAction();
    toast.success("前の商品に戻りました");
  };
  
  // 商品の詳細を表示
  const handleShowDetails = (product: Product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  // 商品をシャッフル
  const handleShuffle = () => {
    shuffleProducts();
    toast.success("商品をシャッフルしました");
  };

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-gray-50">
      <header className="flex-shrink-0 flex justify-between items-center px-4 py-2 h-14 border-b">
        <h1 className="text-xl font-bold">Parmile</h1>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handleShuffle}
            className="h-8 w-8"
            title="商品をシャッフル"
          >
            <IoShuffleOutline size={16} />
          </Button>
          <ProductFilter />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        ) : filteredProducts.length > 0 && currentProduct ? (
          <div className="relative w-full h-full max-h-[calc(100dvh-7rem)] flex items-center justify-center">
            {/* 現在の商品カード */}
            <SwipeCard
              key={currentProduct.id}
              product={currentProduct}
              onLike={() => likeProduct(currentProduct.id)}
              onDislike={() => dislikeProduct(currentProduct.id)}
              onShowDetails={() => handleShowDetails(currentProduct)}
              onUndo={handleUndo}
            />
            
            {/* もう一つ先の商品をプリロードしておく */}
            {filteredProducts.length > 1 && (
              <div className="absolute opacity-0 pointer-events-none">
                <SwipeCard
                  key={filteredProducts[(currentIndex + 1) % filteredProducts.length].id}
                  product={filteredProducts[(currentIndex + 1) % filteredProducts.length]}
                  onLike={() => {}}
                  onDislike={() => {}}
                  onShowDetails={() => {}}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground">
              表示できる商品がありません。フィルター設定を確認してください。
            </p>
          </div>
        )}
      </div>

      
      {/* 商品詳細モーダル */}
      <ProductDetailModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} 