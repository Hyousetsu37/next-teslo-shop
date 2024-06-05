'use client';

import { QuantitySelector } from '@/components';
import { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

export function ProductCard({ product }: { product: CartProduct }) {
  const removeProduct = useCartStore((store) => store.RemoveProduct);
  const updateProductQuantity = useCartStore(
    (store) => store.updateProductQuantity
  );
  return (
    <>
      <div className="flex mb-5">
        <Image
          src={`/products/${product.image}`}
          width={100}
          height={100}
          style={{ width: '100px', height: '100px' }}
          alt={product.title}
          className="mr-5 rounded"
        />
        <div>
          <Link href={`/product/${product.slug}`}>
            {`${product.size} - ${product.title}`}
          </Link>
          <p>{currencyFormat(product.price)} </p>
          <QuantitySelector
            quantity={product.quantity}
            onCartQuantityChange={(quantity) =>
              updateProductQuantity(product, quantity)
            }
          />
          <button
            className="underline mt-3"
            onClick={() => removeProduct(product)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
}
