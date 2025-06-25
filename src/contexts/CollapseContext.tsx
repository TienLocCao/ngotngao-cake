"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type CollapseContextType = {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isReady: boolean;
};

const CollapseContext = createContext<CollapseContextType>({
  isCollapsed: true,
  toggleCollapse: () => {},
  isReady: false,
});

export const CollapseProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored !== null) {
      setIsCollapsed(stored === "true");
    }
    setIsReady(true); // Chỉ set sau khi đọc xong
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", newState.toString());
  };

  return (
    <CollapseContext.Provider value={{ isCollapsed, toggleCollapse, isReady }}>
      {isReady ? children : null}
    </CollapseContext.Provider>
  );
};

export const useCollapse = () => useContext(CollapseContext);
