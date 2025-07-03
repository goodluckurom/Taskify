"use client";

import { Bell, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDashboard } from "@/context/dashboard-context";

export default function DashboardNavbar() {
  const { isMobile, sidebarCollapsed } = useDashboard();
  const { theme, setTheme } = useTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = getGreeting(time.getHours());
  const timeString = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Sidebar left position for header
  const sidebarLeft =
    !isMobile && sidebarCollapsed ? "lg:left-20" : "lg:left-64";

  return (
    <header
      className={`fixed top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/60 dark:bg-white/5 backdrop-blur-md px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out right-0 ${sidebarLeft}`}
    >
      {/* Left Section */}
      <div className="flex flex-col">
        <span className="text-sm font-medium">{greeting}, David 👋</span>
        <span className="text-xs text-muted-foreground">{timeString}</span>
      </div>
      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        {/* Mobile only: Avatar & Theme Toggle */}
        {isMobile && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
          </>
        )}
      </div>
    </header>
  );
}

function getGreeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
