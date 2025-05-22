"use client";

import { useEffect, useState } from "react";
import SwipeCard from "@/components/swipe-card";
import ProductDetailModal from "@/components/product-detail-modal";
import useProductStore from "@/lib/store";
import { Product } from "@/data/sample-products";
import { toast } from "sonner";

export default function ExplorePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = useProductStore(state => state.products);
  const currentIndex = useProductStore(state => state.currentIndex);
  const likeProduct = useProductStore(state => state.likeProduct);
  const dislikeProduct = useProductStore(state => state.dislikeProduct);
  const undoLastAction = useProductStore(state => state.undoLastAction);
  const lastAction = useProductStore(state => state.lastAction);
  const filteredProducts = products; // フィルタリングは一旦無効化
  const canUndo = !!lastAction;
  
  // 現在表示する商品
  const currentProduct = filteredProducts.length > 0 
    ? filteredProducts[currentIndex % filteredProducts.length] 
    : null;

  // ページ読み込み時の初期化
  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  const handleShowDetails = (product: Product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) return null;
  if (!currentProduct) return null;

  return (
    <div className="w-full">
      <SwipeCard
        key={currentProduct.id}
        product={currentProduct}
        onLike={() => {
          likeProduct(currentProduct.id);
          toast.success('商品を気に入りに追加しました');
        }}
        onDislike={() => {
          dislikeProduct(currentProduct.id);
          toast.info('商品をスキップしました');
        }}
        onShowDetails={() => handleShowDetails(currentProduct)}
        onUndo={() => {
          undoLastAction();
          toast.info('1つ前の操作を取り消しました');
        }}
        canUndo={canUndo}
      />
      <ProductDetailModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}