'use client';
import { useEffect, useRef, useState } from 'react';

type Option = { label: string; value: string };

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Chọn...',
  searchable = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleOpen = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 240; // 240px là chiều cao giả định của dropdown
      const spaceBelow = viewportHeight - rect.bottom;
      setDropUp(spaceBelow < dropdownHeight);
    }
    setOpen(prev => !prev);
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={handleOpen}
        className="w-full border border-gray-300 rounded px-3 py-2 text-left flex justify-between items-center"
        >
        <span
            className={`flex-1 truncate ${value ? 'text-black' : 'text-gray-400'}`}
            title={selected?.label || placeholder}
        >
            {selected?.label || placeholder}
        </span>
        <svg
            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        </button>


      {open && (
        <div
          className={`absolute z-10 w-full rounded border border-gray-300 bg-white shadow-lg min-w-[200px] 
            ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'}`}
        >
          {searchable && (
            <div className="px-3 py-2 border-b border-gray-300 bg-white sticky top-0 z-10">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none"
              />
            </div>
          )}
          <ul className="max-h-60 overflow-auto text-sm">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-gray-500 italic">Không có kết quả</li>
            ) : (
              filteredOptions.map(option => (
                <li
                  key={option.value}
                  className={`cursor-pointer px-3 py-2 hover:bg-blue-500 hover:text-white ${
                    option.value === value ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
