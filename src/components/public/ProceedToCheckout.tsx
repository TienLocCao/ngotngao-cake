'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';


const ProceedToCheckout = () => {
    return (
        <>
            <motion.section
                id="checkout-page"
                className="container mx-auto px-4 py-8 hidden "
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                            <label for="credit-card" className="ml-3 flex items-center">
                                                <span className="text-sm font-medium text-gray-700 mr-2"
                                                >Credit Card</span
                                                >
                                                <i className="ri-visa-fill text-xl text-blue-600"></i>
                                                <i
                                                    className="ri-mastercard-fill text-xl text-orange-500 ml-1"
                                                ></i>
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
                                            <label for="paypal" className="ml-3 flex items-center">
                                                <span className="text-sm font-medium text-gray-700 mr-2"
                                                >PayPal</span>
                                                <i className="ri-paypal-fill text-xl text-blue-500"></i>
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
                        </div>
                        <div className="space-y-8">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                                    Order Summary
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div
                                            className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0"
                                        >
                                            <img
                                                src="https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20minimalist%20white%20sneaker%20with%20subtle%20design%20details%2C%20clean%20background%2C%20product%20photography%20style%2C%20high%20resolution%2C%20commercial%20quality&width=200&height=200&seq=1&orientation=squarish"
                                                alt="White Sneakers"
                                                className="w-full h-full object-cover object-top"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-sm font-medium text-gray-800">
                                                Premium White Sneakers
                                            </h3>
                                            <p className="text-sm text-gray-500">Qty: 1</p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900"
                                        >$129.00</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0"
                                        >
                                            <img
                                                src="https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20stylish%20leather%20crossbody%20bag%20in%20cognac%20brown%20color%2C%20clean%20background%2C%20product%20photography%20style%2C%20high%20resolution%2C%20commercial%20quality&width=200&height=200&seq=2&orientation=squarish"
                                                alt="Leather Bag"
                                                className="w-full h-full object-cover object-top"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-sm font-medium text-gray-800">
                                                Leather Crossbody Bag
                                            </h3>
                                            <p className="text-sm text-gray-500">Qty: 1</p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900"
                                        >$89.50</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0"
                                        >
                                            <img
                                                src="https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20minimalist%20gold%20watch%20with%20a%20leather%20strap%2C%20clean%20background%2C%20product%20photography%20style%2C%20high%20resolution%2C%20commercial%20quality&width=200&height=200&seq=3&orientation=squarish"
                                                alt="Gold Watch"
                                                className="w-full h-full object-cover object-top"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-sm font-medium text-gray-800">
                                                Minimalist Gold Watch
                                            </h3>
                                            <p className="text-sm text-gray-500">Qty: 1</p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900"
                                        >$159.00</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="text-gray-800 font-medium">$377.50</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="text-gray-800 font-medium">$12.99</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="text-gray-800 font-medium">$37.75</span>
                                        </div>
                                        <div className="pt-3 mt-3 border-t border-gray-200">
                                            <div className="flex justify-between">
                                                <span className="text-base font-semibold text-gray-900"
                                                >Total</span>
                                                <span className="text-base font-semibold text-gray-900"
                                                >$428.24</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                id="place-order-button"
                                className="w-full py-3 px-4 bg-primary text-white font-medium rounded hover:bg-primary/90 transition !rounded-button whitespace-nowrap"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </motion.section>

        </>
    );
};

export default ProceedToCheckout;
