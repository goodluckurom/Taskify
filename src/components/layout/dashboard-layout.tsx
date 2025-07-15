"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/dashboard-context";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardNavbar from "./dasahboard-navbar";
import MobileNavigation from "../dashboard/mobile-navigation";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { sidebarCollapsed, isMobile } = useDashboard();
  const { user, loading, tokenExpired, setTokenExpired, logout } = useUser();
  const router = useRouter();

  // Route protection
  useEffect(() => {
    if (!loading && !user && !tokenExpired) {
      router.replace("/login");
    }
  }, [loading, user, tokenExpired, router]);

  // Token expiry modal actions
  function handleLogin() {
    setTokenExpired(false);
    logout();
    router.replace("/login");
  }
  function handleHome() {
    setTokenExpired(false);
    logout();
    router.replace("/");
  }

  // Show loading spinner while checking auth
  if (loading) {
    return <Loading />;
  }

  // Show token expired modal
  if (tokenExpired) {
    return (
      <Dialog open>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Session Expired</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            Your session has expired. Please log in again.
          </div>
          <DialogFooter className="flex gap-2 justify-center">
            <Button onClick={handleLogin}>Login</Button>
            <Button variant="secondary" onClick={handleHome}>
              Go to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

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
        <main className="flex-1 px-4 pb-12 md:pb-0 lg:pb-0 md:p-6 lg:p-8 relative z-10 mt-16">
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
