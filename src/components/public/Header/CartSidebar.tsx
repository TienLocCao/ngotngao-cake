// CartSidebar.tsx
"use client";
import React from "react";
import { RiCloseLine, RiSubtractLine, RiAddLine, RiDeleteBinLine } from "@remixicon/react";

interface CartSidebarProps {
    onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ onClose }) => {
    const sampleProducts = [
        {
            title: "Chocolate Dream",
            image:
                "https://readdy.ai/api/search-image?query=A%20classic%20chocolate%20cake%20with%20rich%20chocolate%20ganache%2C%20decorated%20with%20chocolate%20shavings%20and%20fresh%20berries.%20The%20cake%20looks%20moist%20and%20decadent%20with%20a%20glossy%20finish&width=400&height=400&seq=13&orientation=squarish",
            price: "$49.99",
            description: "Rich chocolate layers with ganache",
            badge: "Best Seller",
        },
        {
            title: "Red Velvet",
            image:
                "https://readdy.ai/api/search-image?query=A%20red%20velvet%20cake%20with%20cream%20cheese%20frosting%2C%20decorated%20with%20red%20velvet%20crumbs%20and%20white%20chocolate%20pieces.%20The%20cake%20has%20a%20striking%20red%20color%20and%20elegant%20presentation&width=400&height=400&seq=14&orientation=squarish",
            price: "$44.99",
            description: "Classic red velvet with cream cheese",
            badge: "New",
        },
        {
            title: "Strawberry Delight",
            image:
                "https://readdy.ai/api/search-image?query=A%20vanilla%20strawberry%20cake%20with%20fresh%20strawberries%20and%20light%20cream%20frosting.%20The%20cake%20features%20layers%20of%20fresh%20fruit%20and%20a%20light%2C%20airy%20texture&width=400&height=400&seq=15&orientation=squarish",
            price: "$39.99",
            description: "Fresh strawberries and cream",
        }]
    return (
        <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-50 overflow-y-auto">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Your Cart (3)</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded"
                    >
                        <RiCloseLine className="text-xl" />
                    </button>
                </div>

                <div className="divide-y divide-gray-200">
                    {sampleProducts.map((product, idx) => (
                        <div className="py-4 flex" key={idx}>
                            <div className="w-20 h-20 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                <img
                                    src={product.image}
                                    alt="Cart Item"
                                    className="w-full h-full object-cover object-top"
                                    loading="lazy"
                                />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium text-gray-800">{product.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-medium text-gray-900">{product.price}</span>
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700">
                                            <RiSubtractLine />
                                        </button>
                                        <span className="w-8 text-center text-sm">1</span>
                                        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700">
                                            <RiAddLine />
                                        </button>
                                    </div>
                                </div>
                                <button className="mt-2 text-xs text-primary hover:text-primary-dark flex items-center">
                                    <RiDeleteBinLine className="mr-1" /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="text-sm font-medium text-gray-800">$299.97</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Shipping</span>
                        <span className="text-sm font-medium text-gray-800">$10.00</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Tax</span>
                        <span className="text-sm font-medium text-gray-800">$30.00</span>
                    </div>
                    <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                        <span className="text-base font-semibold text-gray-900">Total</span>
                        <span className="text-base font-semibold text-gray-900">$339.97</span>
                    </div>
                </div>

                <div className="mt-8 space-y-3">
                    <button className="w-full py-3 px-4 bg-primary text-white font-medium rounded hover:bg-primary/90 transition">
                        Proceed to Checkout
                    </button>
                    <button className="w-full py-3 px-4 bg-gray-100 text-gray-800 font-medium rounded hover:bg-gray-200 transition">
                        View Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
