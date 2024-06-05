import type { Size } from '@/interfaces';

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSizeChange: (size: Size) => void;
}

export function SizeSelector({
  selectedSize,
  availableSizes,
  onSizeChange,
}: Props) {
  //*onchangeSize
  const onChangeSize = (size: Size) => {
    onSizeChange(size);
  };
  return (
    <div className="my-5">
      <h3 className="mb-4 font-bold">Available Sizes</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onChangeSize(size)}
            className={`mx-2 hover:underline text-lg ${
              selectedSize === size ? 'underline' : ''
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
