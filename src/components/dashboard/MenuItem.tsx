"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCollapse } from "@/contexts/CollapseContext";

type MenuItemType = {
  id: number;
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: { label: string; path: string }[];
};

type Props = {
  item: MenuItemType;
  isOpen: boolean;
  onToggleOpen: (id: number) => void;
};

const MenuItem = ({ item, isOpen, onToggleOpen }: Props) => {
  const router = useRouter();
  const { isCollapsed } = useCollapse();
  const [idHover, setIdHover] = useState<number | null>(null);

  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      onToggleOpen(item.id);
    } else if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <li className="relative mb-2 z-[999]">
      <div
        className={`relative flex items-center p-2 rounded-md cursor-pointer ${
          isCollapsed ? "justify-center" : "justify-start"
        } hover:bg-gray-200`}
        onClick={handleClick}
        onMouseEnter={() => isCollapsed && setIdHover(item.id)}
        onMouseLeave={() => isCollapsed && setIdHover(null)}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {!isCollapsed && <span>{item.label}</span>}
        {hasChildren && !isCollapsed && (
          <span className="ml-auto">
            {isOpen ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </span>
        )}

        {/* Hover menu (when collapsed) */}
        {hasChildren && idHover === item.id && (
          <div className="absolute top-0 left-full pl-2 w-max">
            <div className="bg-white shadow-md rounded-md p-2">
              <ul>
                {item.children?.map((child) => (
                  <li key={child.label} className="p-2 hover:bg-gray-200">
                    <a href={child.path}>{child.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Click menu (when expanded) */}
      {!isCollapsed && isOpen && hasChildren && (
        <ul className="ml-4">
          {item.children?.map((child) => (
            <li key={child.label} className="p-2 hover:bg-gray-200">
              <a href={child.path}>{child.label}</a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
