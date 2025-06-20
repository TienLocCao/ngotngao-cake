"use client";
import React, { useState } from 'react';
import AppHeader from './AppHeader';
import SidebarNav from './SidebarNav';
import { CollapseProvider } from '@/contexts/CollapseContext';


const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 
  return (
    <CollapseProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppHeader />
          <main className="flex-1 p-4 bg-gray-100 flex flex-col overflow-hidden w-full">
            {children}
          </main>
        </div>
      </div>
    </CollapseProvider>
  );
}

export default DashboardLayout;