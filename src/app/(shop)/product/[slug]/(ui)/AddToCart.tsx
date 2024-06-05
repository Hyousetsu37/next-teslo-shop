'use client';

import { getStockBySlug } from '@/actions';
import { QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';

interface Props {
  slug: string;
  product: Product;
}

export const AddToCart = ({ slug, product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [isOut, setIsOut] = useState(true);

  //* Start of Stock Label logic
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  };

  //* End of Stock Label logic

  //?Start of state definition for cart

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [pressed, setPressed] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      if (size) {
        setIsOut(false);
      }
    }, 200);
  }, [size]);

  //? End of state definition for cart

  //! Start Add to cart function
  const addToCart = () => {
    setPressed(true);
    if (!size) {
      return;
    }
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };
    addProductToCart(cartProduct);

    setPressed(false);
    setQuantity(1);
    setSize(undefined);
  };

  //! End of Add to cart function

  return (
    <>
      {pressed && (!size || isOut) && (
        <>
          <span
            className={`text-red-500 bg-red-200 flex items-center align-middle rounded w-fit px-2 ${
              pressed && !size ? 'fade-in' : 'fade-out'
            } `}
          >
            <IoWarningOutline />
            &nbsp; Please select a size
          </span>
        </>
      )}
      {/* Size selector */}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeChange={setSize}
      />
      {/* Quantity selector */}
      <QuantitySelector
        quantity={quantity}
        max={Math.min(stock, 5)}
        onQuantityChange={setQuantity}
      />
      {/* Button */}
      <StockLabel slug={slug} isLoading={isLoading} stock={stock} />
      <button
        className={` my-2 ${
          stock === 0
            ? ' py-2 px-4 rounded bg-gray-300 text-black'
            : 'btn-primary'
        }`}
        disabled={stock === 0}
        onClick={addToCart}
      >
        Add to cart
      </button>
    </>
  );
};
