'use client';

import React from 'react';
import { RiVisaFill, RiMastercardFill, RiPaypalFill } from '@remixicon/react';
import { useCart } from '@/lib/context/CartContext';
import PaymentMethodForm from './PaymentMethodForm';

const CheckoutsDetail = () => {
    const { cartItems } = useCart();

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 30000;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
            <section id="checkout-page" className="container mx-auto">
                <div className="max-w-[90vw] mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* LEFT - FORM */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                                    Contact Information
                                </h2>
                                <form id="contact-form" className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2"
                                        >Email Address</label
                                        >
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2"
                                        >Phone Number</label
                                        >
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                                    Shipping Address
                                </h2>
                                <form id="shipping-form" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >First Name</label
                                            >
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >Last Name</label
                                            >
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2"
                                        >Address</label
                                        >
                                        <input
                                            type="text"
                                            name="address"
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2"
                                        >Apartment, suite, etc.</label
                                        >
                                        <input
                                            type="text"
                                            name="apartment"
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >City</label
                                            >
                                            <input
                                                type="text"
                                                name="city"
                                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >Postal Code</label
                                            >
                                            <input
                                                type="text"
                                                name="postalCode"
                                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                                    Payment Method
                                </h2>
                                <form id="payment-form" className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="credit-card"
                                                name="payment"
                                                value="credit-card"
                                                className="w-4 h-4 text-primary"
                                                checked
                                            />
                                            <label htmlFor="credit-card" className="ml-3 flex items-center">
                                                <span className="text-sm font-medium text-gray-700 mr-2"
                                                >Credit Card</span
                                                >
                                                <RiVisaFill className="ri-visa-fill text-xl text-blue-600" />
                                                <RiMastercardFill
                                                    className="text-xl text-orange-500 ml-1"
                                                />
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="paypal"
                                                name="payment"
                                                value="paypal"
                                                className="w-4 h-4 text-primary"
                                            />
                                            <label htmlFor="paypal" className="ml-3 flex items-center">
                                                <span className="text-sm font-medium text-gray-700 mr-2"
                                                >PayPal</span>
                                                <RiPaypalFill className=" text-xl text-blue-500" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="pt-4 space-y-4">
                                        <div>
                                            <label
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >Card Number</label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="1234 5678 9012 3456"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium text-gray-700 mb-2"
                                                >Expiry Date</label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    placeholder="MM/YY"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    className="block text-sm font-medium text-gray-700 mb-2"
                                                >CVV</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    placeholder="123"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        <PaymentMethodForm />
                        </div>

                        {/* RIGHT - ORDER SUMMARY */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-lg shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6  p-6">Order Summary</h2>

                                <div className="space-y-4 h-[calc(100vh-410px)] min-h-[400px] overflow-auto  p-6">
                                    {cartItems.map((item) => (
                                        <div
                                            key={`${item.id}-${item.sizeId}`}
                                            className="flex items-center"
                                        >
                                            <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover object-top"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                ${(item.price * item.quantity).toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3  p-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-800 font-medium">${subtotal.toLocaleString('vi-VN')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-gray-800 font-medium">${shipping.toLocaleString('vi-VN')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="text-gray-800 font-medium">${tax.toLocaleString('vi-VN')}</span>
                                    </div>
                                    <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between text-base font-semibold text-gray-900">
                                        <span>Total</span>
                                        <span>${total.toLocaleString('vi-VN')}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                id="place-order-button"
                                className="w-full py-3 px-4 bg-primary text-white font-medium rounded hover:bg-primary/90 transition"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default CheckoutsDetail;
