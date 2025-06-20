"use client";
import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  FolderIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useCollapse } from "@/contexts/CollapseContext";
import MenuItem from "./MenuItem";

const menuItems = [
  {
    id: 1,
    label: "Home",
    icon: HomeIcon,
    path: "/dashboard",
  },
  {
    id: 2,
    label: "Projects",
    icon: FolderIcon,
    children: [{ label: "Project List", path: "/projects" }],
  },
  {
    id: 3,
    label: "Settings",
    icon: Cog6ToothIcon,
    children: [
      { label: "General Settings", path: "/settings/general" },
      { label: "Appearance", path: "/settings/appearance" },
    ],
  },
];

const SidebarNav = () => {
  const { isCollapsed, isReady } = useCollapse();

  const [openStates, setOpenStates] = useState<{ [id: number]: boolean }>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sidebar-openStates");
      try {
        return stored ? JSON.parse(stored) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("sidebar-openStates", JSON.stringify(openStates));
  }, [openStates]);

  const handleToggleOpen = (id: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isReady) return null;

  return (
    <div
      className={`h-screen sticky top-0 transition-all duration-200 z-[999] ${
        isCollapsed ? "w-16" : "w-64"
      } shadow-md flex flex-col bg-white`}
    >
      <div
        className={`p-4 ${
          isCollapsed ? "justify-center" : "justify-start"
        } text-center font-bold text-2xl`}
      >
        CT
      </div>

      <ul className="flex-grow p-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isOpen={!!openStates[item.id]}
            onToggleOpen={handleToggleOpen}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarNav;
