"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type ProjectContextType = {
  projectSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projectSidebarCollapsed, setProjectSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("projectSidebarCollapsed");
    if (savedState !== null) {
      setProjectSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem(
      "sidebarCollapsed",
      JSON.stringify(projectSidebarCollapsed)
    );
  }, [projectSidebarCollapsed]);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setProjectSidebarCollapsed((prev) => !prev);
  };

  return (
    <ProjectContext.Provider
      value={{
        projectSidebarCollapsed,
        toggleSidebar,
        isMobile,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
