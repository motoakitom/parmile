'use client';

import { useEffect } from 'react';
import useProductStore from './store';

function StoreInitializer() {
  useEffect(() => {
    // ストアを初期化
    useProductStore.persist.rehydrate();
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