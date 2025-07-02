"use client";

import type React from "react";
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
  const { sidebarCollapsed, isMobile } = useDashboard();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar - hidden on mobile */}
      {!isMobile && <DashboardSidebar />}

      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          !isMobile && sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        )}
      >
        <DashboardNavbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>

      {/* Mobile Navigation - only shown on mobile */}
      {isMobile && (
        <MobileNavigation className="fixed bottom-0 left-0 z-50 w-full md:hidden" />
      )}
    </div>
  );
}
