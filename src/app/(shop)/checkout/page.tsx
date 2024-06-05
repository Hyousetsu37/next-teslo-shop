import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';

const productsInCart = [
  initialData.products[0],
  initialData.products[2],
  initialData.products[4],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust your items</span>
            <Link href={'/cart'} className="underline mb-5">
              Edit your cart
            </Link>

            {/* Items */}
            {productsInCart.map((prod) => (
              <div key={prod.slug} className="flex mb-5">
                <Image
                  src={`/products/${prod.images[0]}`}
                  width={100}
                  height={100}
                  style={{ width: '100px', height: '100px' }}
                  alt={prod.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{prod.title} </p>
                  <p>${prod.price} x3 </p>
                  <p className="font-bold">Subtotal: ${prod.price * 3} </p>
                  <button className="underline mt-3">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl p-7 shadow-xl">
            <h2 className="text-2xl font-bold mb-2">Shipping address</h2>
            <div className="mb-10">
              <p className="text-xl">Test Subject</p>
              <p>Test Address</p>
              <p>Test City</p>
              <p>3213213213</p>
              <p>Zip 321321</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span className="">No. Products</span>
              <span className="text-right"> 3 items</span>
              <span className="">Subtotal</span>
              <span className="text-right"> $100</span>
              <span className="">Taxes (15%)</span>
              <span className="text-right"> $15</span>
              <span className="text-2xl mt-5">Total</span>
              <span className="mt-5 text-2xl text-right">$115</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs ">
                  Placing the order means you accept our{' '}
                  <a href="#" className="underline">
                    terms and conditions
                  </a>{' '}
                  and our{' '}
                  <a href="#" className="underline">
                    privacy policies
                  </a>
                </span>
              </p>
              <Link
                className="flex btn-primary justify-center"
                href={'/orders/123'}
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
