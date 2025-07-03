"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/dashboard-context";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardNavbar from "./dasahboard-navbar";
import MobileNavigation from "../dashboard/mobile-navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { sidebarCollapsed, isMobile } = useDashboard();

  // Define the prefix where you don't want the layout
  const hideLayout =
    pathname.startsWith("/dashboard/project") &&
    pathname !== "/dashboard/projects";

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar - hidden on mobile */}
      {!isMobile && <DashboardSidebar />}

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out relative overflow-hidden",
          !isMobile && sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        {/* Blur background effect for main content area */}
        <div className="absolute inset-0 blur-background">
          <div className="dashboard-floating-ball-1"></div>
          <div className="dashboard-floating-ball-2"></div>
          <div className="dashboard-floating-ball-3"></div>
        </div>

        <DashboardNavbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 relative z-10 mt-16">
          {children}
        </main>
      </div>

      {/* Mobile Navigation - shown on mobile and tablet */}
      {isMobile && (
        <MobileNavigation className="fixed bottom-0 left-0 z-50 w-full lg:hidden" />
      )}
    </div>
  );
}
