// NumberInput.tsx
import React, { useState, useEffect } from 'react';

interface NumberInputProps {
  value: number | null;
  onChange: (rawValue: number | null) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  error?: string;
  className?: string;
}

const formatNumberWithCommas = (value: number | null) => {
  if (value === null || isNaN(Number(value))) return '';
  return value.toLocaleString('en-US');
};

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder = '',
  name,
  id,
  error,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(formatNumberWithCommas(value));

  useEffect(() => {
    if (value !== null && value !== undefined) {
      const numValue = Number(value);
      setDisplayValue(numValue.toLocaleString('en-US'));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw === '') {
      onChange(null);
    } else {
      onChange(Number(raw));
    }
  };

  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
          error ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-indigo-500'
        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-colors ${className}`}
        placeholder={placeholder}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default NumberInput;
