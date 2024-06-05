import { titleFont } from '@/config/fonts';

interface Props {
  slug: string;
  stock: number;
  isLoading: boolean;
}
export function StockLabel({ slug, stock, isLoading }: Props) {
  return (
    <>
      {isLoading ? (
        <div className="w-full h-7 bg-gradient-to-b rounded from-gray-400 to-gray-200 animate-pulse mt-2">
          &nbsp;
        </div>
      ) : (
        <h2
          className={`${
            titleFont.className
          } antialiased font-bold text-lg mt-2 ${
            stock === 0 ? 'text-gray-400' : ''
          }`}
        >
          {stock === 0 ? 'Out of stock' : `Stock: ${stock}`}
        </h2>
      )}
    </>
  );
}
