import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  //?Methods
  //*Helpers
  getSummaryInfo: () => summaryReturn;

  //*Functions
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  RemoveProduct: (product: CartProduct) => void;
}

interface summaryReturn {
  subTotal: number;
  tax: number;
  total: number;
  numOfItems: number;
}

export const useCartStore = create<State>()(
  //Start of persist to save cart into local store
  persist(
    //start
    (set, get) => ({
      //Somtehing
      cart: [],

      getSummaryInfo: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (total, product) => total + product.quantity * product.price,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const numOfItems = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return { subTotal, tax, total, numOfItems };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        //* 1. Check if the product already exist with the selected size
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        //? If product in cart doesn't exist, spread the old cart and add the new product at the end
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //*2. I know the product with a specific size exist. i have to add to it
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      RemoveProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter((item) => {
          return !(item.id === product.id && item.size === product.size);
        });
        set({ cart: updatedCartProducts });
      },
    }),

    //finish

    {
      name: 'shopping-cart',
    }
  )
);
