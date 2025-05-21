'use client';

import { useEffect, useState } from 'react';
import useProductStore from './store';

import { useEffect } from 'react';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreInitializer />
      {children}
    </>
  );
} 