'use client';
import { Dispatch, SetStateAction } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  max?: number;

  onQuantityChange?: Dispatch<SetStateAction<number>>;
  onCartQuantityChange?: (quantity: number) => void;
}

export const QuantitySelector = ({
  quantity,
  max,
  onQuantityChange,
  onCartQuantityChange,
}: Props) => {
  const onValueChanged = (value: number) => {
    if (onQuantityChange) {
      onQuantityChange((state) => {
        if ((state === 1 && value < 0) || (state === max && value > 0)) {
          return state;
        }
        return state + value;
      });
    }
    if (onCartQuantityChange) {
      if (quantity + value < 1 || (max && quantity + value > max)) return;
      onCartQuantityChange(quantity + value);
    }
  };
  return (
    <div className="flex">
      <button
        onClick={() => onValueChanged(-1)}
        disabled={quantity === 1}
        className={`${quantity === 1 ? 'text-gray-400' : ''}`}
      >
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>
      <button
        onClick={() => onValueChanged(1)}
        disabled={quantity === max}
        className={`${quantity === max ? 'text-gray-400' : ''}`}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
