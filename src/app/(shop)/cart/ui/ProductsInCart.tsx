'use client';

import { useCartStore } from '@/store';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';

interface Props {}

export function ProductsInCart({}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const productsInCart = useCartStore((store) => store.cart);

  useEffect(() => {
    setIsLoaded(true);
    if (productsInCart.length === 0 && isLoaded) redirect('/empty');
  }, [productsInCart.length, isLoaded]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {productsInCart.map((prod) => (
        <ProductCard key={`${prod.slug}-${prod.size}`} product={prod} />
      ))}
    </>
  );
}
