'use client';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function OrderSummary() {
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    setisLoaded(true);
  }, []);

  const { subTotal, total, tax, numOfItems } = useCartStore((store) =>
    store.getSummaryInfo()
  );
  return (
    <>
      {isLoaded && (
        <div className="bg-white rounded-xl p-7 shadow-xl h-fit">
          <h2 className="text-2xl mb-2">Order Summary</h2>
          <div className="grid grid-cols-2">
            <span className="">No. Products</span>
            <span className="text-right">{` ${
              numOfItems === 1 ? '1 item' : `${numOfItems} items`
            }`}</span>
            <span className="">Subtotal</span>
            <span className="text-right"> {currencyFormat(subTotal)} </span>
            <span className="">Taxes (15%)</span>
            <span className="text-right"> {currencyFormat(tax)} </span>
            <span className="text-2xl mt-5">Total</span>
            <span className="mt-5 text-2xl text-right">
              {currencyFormat(total)}
            </span>
          </div>
          <div className="mt-5 mb-2 w-full">
            <Link
              className={`flex btn-primary justify-center ${
                numOfItems === 0
                  ? 'pointer-events-none bg-gray-400 hover:bg-gray-400'
                  : 'y'
              }`}
              href={'/checkout/address'}
              aria-disabled={numOfItems === 0}
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
