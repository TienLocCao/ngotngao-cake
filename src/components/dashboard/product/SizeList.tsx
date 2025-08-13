// ~/components/dashboard/product/SizeList.tsx
import React from "react";
import NumberInput from "@/components/dashboard/common/NumberInput";

interface Size {
  id: string;
  sizeLabel: string;
  price: number | null;
}

interface SizeError {
  id: string;
  sizeLabel: string;
  price: string;
}

interface SizeListProps {
  sizes: Size[];
  errors: SizeError[];
  onChange: (sizes: Size[]) => void;
}

const SizeList: React.FC<SizeListProps> = ({ sizes, errors, onChange }) => {
  const updateSize = (index: number, field: keyof Size, value: any) => {
    const updated = [...sizes];
    updated[index] = {
        ...updated[index],
        [field]: value,
    }
    onChange(updated);
  };

  const removeSize = (index: number) => {
    const updated = sizes.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="border border-gray-200 p-4">
      {sizes.map((size, index) => (
        <div key={size.id} className="mb-2 flex gap-2">
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Size Label"
              value={size.sizeLabel}
              onChange={(e) => updateSize(index, "sizeLabel", e.target.value)}
              className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors[index]?.sizeLabel
                  ? "ring-red-300 focus:ring-red-500"
                  : "ring-gray-300 focus:ring-indigo-500"
              }`}
            />
            {errors[index]?.sizeLabel && (
              <p className="text-sm text-red-600 mt-1">
                {errors[index]?.sizeLabel}
              </p>
            )}
          </div>

          <div className="w-1/2">
            <NumberInput
              id={`size-price-${size.id}`}
              name={`size-price-${size.id}`}
              value={size.price}
              onChange={(val) => updateSize(index, "price", val)}
              placeholder="Price"
              error={errors[index]?.price}
            />
          </div>

          <button
            type="button"
            onClick={() => removeSize(index)}
            className="text-red-600 hover:text-red-800"
          >
            ❌
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange([
            ...sizes,
            { id: `${Date.now()}`, sizeLabel: "", price: null },
          ])
        }
      >
        ➕ Add Size
      </button>
    </div>
  );
};

export default SizeList;
