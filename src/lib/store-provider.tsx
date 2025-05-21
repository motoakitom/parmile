'use client';

import { useEffect, useState } from 'react';
import useProductStore from './store';

export function StoreInitializer() {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    // ストアを初期化
    useProductStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);
  
  return null;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreInitializer />
      {children}
    </>
  );
} 