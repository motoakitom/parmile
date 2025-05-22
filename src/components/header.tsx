"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoShuffleOutline } from "react-icons/io5";
import ProductFilter from "@/components/product-filter";
import { usePathname } from "next/navigation";
import useProductStore from "@/lib/store";
import { toast } from "sonner";

export default function Header() {
  const pathname = usePathname();
  const isExplorePage = pathname === "/explore";
  const shuffleProducts = useProductStore(state => state.shuffleProducts);

  // 商品をシャッフル
  const handleShuffle = () => {
    shuffleProducts();
    toast.success("商品をシャッフルしました");
  };

  return (
    <header className="w-full bg-background border-b sticky top-0 z-10" data-component-name="Header">
      <div className="max-w-md mx-auto w-full px-4" data-component-name="HeaderContent">
        <div className="flex justify-between items-center h-14" data-component-name="HeaderInner">
          <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity" data-component-name="LogoLink">
            Parmile
          </Link>
          {isExplorePage && (
            <div className="flex gap-1" data-component-name="HeaderActions">
              <Button
                variant="outline"
                size="icon"
                onClick={handleShuffle}
                className="h-8 w-8"
                title="商品をシャッフル"
                data-component-name="ShuffleButton"
              >
                <IoShuffleOutline size={16} data-component-name="ShuffleIcon" />
              </Button>
              <div data-component-name="ProductFilterWrapper">
                <ProductFilter />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
