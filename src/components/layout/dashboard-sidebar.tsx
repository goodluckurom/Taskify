"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronRight,
  ClipboardList,
  Home,
  Settings,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDashboard } from "@/context/dashboard-context";
import Logo from "../logo";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useDashboard();

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: ClipboardList,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 hidden lg:flex flex-col border-r shadow-xl transition-all duration-300 ease-in-out bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 backdrop-blur-md",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo/Branding */}
      <div
        className={cn(
          "flex h-16 items-center border-b shrink-0",
          sidebarCollapsed ? "justify-center px-4" : "px-6"
        )}
      >
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-blue-600 shrink-0" />
            <span className="text-lg font-semibold tracking-wide truncate">
              Taskify
            </span>
          </div>
        ) : (
          <Logo className="h-8 w-8 text-blue-600" />
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <div className={cn("space-y-2", sidebarCollapsed ? "px-2" : "px-4")}>
          {mainNavItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              }
              collapsed={sidebarCollapsed}
            />
          ))}
        </div>
      </ScrollArea>

      {/* User Info */}
      <div
        className={cn(
          "mt-auto border-t shrink-0 py-4",
          sidebarCollapsed ? "px-2" : "px-4"
        )}
      >
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-medium leading-none truncate">
                Project Manager
              </span>
              <span className="text-xs text-muted-foreground truncate">
                admin@projectify.com
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      {/* Collapse/Expand Button */}
      <button
        onClick={toggleSidebar}
        aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-8 h-8 z-30",
          sidebarCollapsed ? "-right-4" : "-right-4"
        )}
        style={{
          boxShadow: "0 4px 24px 0 rgba(80, 80, 200, 0.15)",
          right: "-16px",
        }}
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            sidebarCollapsed ? "rotate-0" : "rotate-180"
          )}
        />
      </button>
    </div>
  );
}

function NavItem({
  item,
  isActive,
  collapsed,
}: {
  item: { title: string; href: string; icon: React.ElementType };
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  if (collapsed) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex h-12 w-12 mx-auto items-center justify-center rounded-lg transition-all duration-200 group relative",
          isActive
            ? "bg-primary text-white shadow-lg"
            : "hover:bg-muted text-muted-foreground hover:text-primary"
        )}
        title={item.title}
      >
        <Icon className="h-5 w-5  " />
        <span className="sr-only">{item.title}</span>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex h-12 items-center gap-3 rounded-lg px-3 transition-all duration-200 group relative",
        isActive
          ? "bg-primary text-white font-medium shadow-sm transition-all duration-200"
          : "hover:bg-muted text-muted-foreground hover:text-primary"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{item.title}</span>
      {isActive && (
        <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full" />
      )}
    </Link>
  );
}
