'use client';

import React from 'react';
import {
  RiUserLine,
  RiUserSettingsLine,
  RiShoppingBagLine,
  RiHeartLine,
  RiSettingsLine,
  RiLogoutBoxLine,
} from '@remixicon/react';

const UserDropdown = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="user-dropdown absolute right-4 top-[72px] w-64 bg-white rounded shadow-lg z-40 border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <RiUserLine className="text-xl" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">Emily Johnson</p>
            <p className="text-xs text-gray-500">emily.johnson@example.com</p>
          </div>
        </div>
      </div>
      <ul className="py-2">
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <div className="w-8 h-8 flex items-center justify-center text-gray-500">
              <RiUserSettingsLine />
            </div>
            <span className="ml-3">My Account</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <div className="w-8 h-8 flex items-center justify-center text-gray-500">
              <RiShoppingBagLine />
            </div>
            <span className="ml-3">My Orders</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <div className="w-8 h-8 flex items-center justify-center text-gray-500">
              <RiHeartLine />
            </div>
            <span className="ml-3">Wishlist</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <div className="w-8 h-8 flex items-center justify-center text-gray-500">
              <RiSettingsLine />
            </div>
            <span className="ml-3">Settings</span>
          </a>
        </li>
      </ul>
      <div className="p-3 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
        >
          <div className="w-8 h-8 flex items-center justify-center text-gray-500">
            <RiLogoutBoxLine />
          </div>
          <span className="ml-3">Sign Out</span>
        </a>
      </div>
    </div>
  );
};

export default UserDropdown;