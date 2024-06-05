'use client';

import { titleFont } from '@/config/fonts';
import { useCartStore, useUiStore } from '@/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

export const TopMenu = () => {
  const openSideMenu = useUiStore((store) => store.openSideMenu);
  const totalItemsInCart = useCartStore(
    (store) => store.getSummaryInfo().numOfItems
  );

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Brand */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>
      {/* Center Menu */}
      <div className=" hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href={'/gender/men'}
        >
          Men
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href={'/gender/women'}
        >
          Women
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href={'/gender/kid'}
        >
          Kids
        </Link>
      </div>

      {/* Search, Cart, Menu */}

      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link
          href={`${totalItemsInCart > 0 && isLoaded ? '/cart' : '/empty'}`}
          className="mx-2"
        >
          <div className="relative">
            {isLoaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute text-xs rounded-full px-1 -top-2 -right-2 bg-blue-500 text-white">
                {totalItemsInCart}
              </span>
            )}

            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          onClick={openSideMenu}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
