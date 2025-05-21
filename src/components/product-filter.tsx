"use client";

import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { IoFilterOutline } from "react-icons/io5";
import useProductStore from "@/lib/store";

export default function ProductFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const filterBrands = useProductStore(state => state.filterBrands);
  const setFilterBrands = useProductStore(state => state.setFilterBrands);
  const products = useProductStore(state => state.products);

  // 利用可能なブランド一覧を重複なしで取得
  const availableBrands = useMemo(() => {
    const brands = products.map(product => product.brand);
    return Array.from(new Set(brands)).sort();
  }, [products]);

  // ブランドのセレクト状態を切り替え
  const toggleBrand = (brand: string) => {
    if (filterBrands.includes(brand)) {
      setFilterBrands(filterBrands.filter(b => b !== brand));
    } else {
      setFilterBrands([...filterBrands, brand]);
    }
  };

  // すべてのブランドを選択/解除
  const toggleAll = (selectAll: boolean) => {
    if (selectAll) {
      setFilterBrands(availableBrands);
    } else {
      setFilterBrands([]);
    }
  };

  // 選択済みフィルタの数を表示用に計算
  const activeFilterCount = filterBrands.length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <IoFilterOutline size={18} />
          フィルター
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[70vh] p-0">
        <SheetHeader>
          <SheetTitle>フィルター</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => toggleAll(true)}
              disabled={filterBrands.length === availableBrands.length}
            >
              すべて選択
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => toggleAll(false)}
              disabled={filterBrands.length === 0}
            >
              すべて解除
            </Button>
          </div>
          
          <h3 className="font-medium mb-2">ブランド</h3>
          <div className="flex flex-wrap gap-2">
            {availableBrands.map(brand => (
              <Button
                key={brand}
                variant={filterBrands.includes(brand) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleBrand(brand)}
              >
                {brand}
              </Button>
            ))}
          </div>
          
          {/* 将来的に他のフィルターを追加する場所 */}
          
          <div className="mt-8 flex gap-2">
            <Button 
              className="flex-1" 
              onClick={() => setIsOpen(false)}
            >
              適用する
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 