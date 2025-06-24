'use client';
import React from 'react';
import {
    RiSearchLine, RiCloseLine, RiHistoryLine, RiCake2Line,
    RiCake3Line,
    RiGalleryLine,
    RiCupLine
} from '@remixicon/react';

interface SearchOverlayProps {
    onClose: () => void;
}

const SearchOverlay = ({ onClose }: SearchOverlayProps) => (
    <div className="fixed top-[72px] left-0 w-full bg-white shadow-md z-40">
        <div className="container mx-auto px-4 py-6">
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <RiSearchLine className="text-gray-400 text-xl" />
                </div>
                <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 text-gray-700 bg-gray-100 rounded border-none focus:ring-2 focus:ring-primary focus:outline-none text-base"
                    placeholder="Search for products..."
                    autoFocus
                />
                <button
                    onClick={onClose}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700"
                >
                    <RiCloseLine className="text-xl" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Recent Searches</h3>
                    <ul className="space-y-3">
                        {["Wedding Cakes", "Birthday Cakes", "Custom Cakes", "Cupcakes"].map((item, idx) => (
                            <li key={idx}>
                                <a href="#" className="flex items-center text-gray-700 hover:text-primary">
                                    <RiHistoryLine className="mr-3" />{item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Popular Categories</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: <RiCake3Line />, label: "Wedding Cakes" },
                            { icon: <RiCake2Line />, label: "Birthday Cakes" },
                            { icon: <RiGalleryLine />, label: "Custom Cakes" },
                            { icon: <RiCupLine />, label: "Cupcakes" },
                        ].map((cat, idx) => (
                            <a key={idx} href="#" className="flex items-center p-3 bg-gray-100 rounded hover:bg-gray-200 transition">
                                <div className="w-8 h-8 flex items-center justify-center mr-3 text-primary">
                                    {cat.icon}
                                </div>
                                <span className="text-gray-700">{cat.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SearchOverlay;