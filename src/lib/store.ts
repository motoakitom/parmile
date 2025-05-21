import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/data/sample-products";
import { getRandomizedProducts } from "@/lib/product-fetcher";

interface ProductState {
  products: Product[];
  currentIndex: number;
  likedProducts: Product[];
  viewedProducts: string[];
  filterBrands: string[];
  lastAction: { type: string; product: Product | undefined } | null;
  
  // アクション
  likeProduct: (id: string) => void;
  dislikeProduct: (id: string) => void;
  undoLastAction: () => void;
  setFilterBrands: (brands: string[]) => void;
  removeLikedProduct: (id: string) => void;
  shuffleProducts: () => void;
}

// クライアントサイドでのみ実行するためのチェック
const isClient = typeof window !== 'undefined';

// サンプルデータと外部データを結合してランダムに並び替え
const allProducts = getRandomizedProducts();

const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: allProducts,
      currentIndex: 0,
      likedProducts: [],
      viewedProducts: [],
      filterBrands: [],
      lastAction: null,
      
      likeProduct: (id: string) => {
        const { products } = get();
        const product = products.find(p => p.id === id);
        
        if (product) {
          set(state => ({
            likedProducts: [...state.likedProducts, product],
            viewedProducts: [...state.viewedProducts, id],
            currentIndex: state.currentIndex + 1,
            lastAction: { type: 'like', product }
          }));
        }
      },
      
      dislikeProduct: (id: string) => {
        const { products } = get();
        set(state => ({
          viewedProducts: [...state.viewedProducts, id],
          currentIndex: state.currentIndex + 1,
          lastAction: { type: 'dislike', product: products.find(p => p.id === id) }
        }));
      },
      
      undoLastAction: () => {
        const { viewedProducts, likedProducts, currentIndex } = get();
        
        if (currentIndex > 0 && viewedProducts.length > 0) {
          const lastViewedId = viewedProducts[viewedProducts.length - 1];
          const newViewedProducts = viewedProducts.slice(0, -1);
          
          // 最後にいいねした商品を取り消す場合
          const likedProductIndex = likedProducts.findIndex(p => p.id === lastViewedId);
          const newLikedProducts = likedProductIndex !== -1 
            ? likedProducts.filter((_, i) => i !== likedProductIndex)
            : likedProducts;
            
          set({
            viewedProducts: newViewedProducts,
            likedProducts: newLikedProducts,
            currentIndex: currentIndex - 1
          });
        }
      },
      
      setFilterBrands: (brands: string[]) => {
        set({ filterBrands: brands });
      },
      
      removeLikedProduct: (id: string) => {
        set(state => ({
          likedProducts: state.likedProducts.filter(p => p.id !== id)
        }));
      },
      
      shuffleProducts: () => {
        set({ 
          products: getRandomizedProducts(),
          currentIndex: 0
        });
      }
    }),
    {
      name: "parmile-storage",
      storage: isClient ? createJSONStorage(() => localStorage) : undefined,
      skipHydration: true,
    }
  )
);

export default useProductStore; 