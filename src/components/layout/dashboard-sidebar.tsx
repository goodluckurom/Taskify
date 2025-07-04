"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
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
        "fixed inset-y-0 left-0 z-20 hidden lg:flex flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo/Branding */}
      <div
        className={cn(
          "flex h-16 items-center border-b shrink-0 px-4",
          sidebarCollapsed ? "justify-center" : "px-6"
        )}
      >
        <Link href="/dashboard" className="flex items-center gap-2 w-full">
          <Logo className="h-8 w-8 text-primary" />
          {!sidebarCollapsed && (
            <span className="text-lg font-semibold">Taskify</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <div className={cn("space-y-1", sidebarCollapsed ? "px-2" : "px-3")}>
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
          "mt-auto border-t shrink-0 p-3",
          sidebarCollapsed ? "px-2" : "px-3"
        )}
      >
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Avatar className="h-9 w-9 shrink-0">
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
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <div className="border-t p-3">
        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex items-center justify-center w-full rounded-lg p-2 transition-all hover:bg-muted/50",
            sidebarCollapsed ? "mx-auto w-10" : "justify-between"
          )}
        >
          {!sidebarCollapsed && (
            <span className="text-sm font-medium">Collapse</span>
          )}
          <span
            className={cn(
              "transition-transform duration-300",
              sidebarCollapsed ? "rotate-180" : "rotate-0"
            )}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </span>
        </button>
      </div>
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

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg p-3 transition-all group",
        isActive
          ? "bg-primary text-white shadow-sm"
          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
        collapsed ? "justify-center" : "px-4"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 flex-shrink-0",
          isActive ? "text-white" : "text-current"
        )}
      />
      {!collapsed && (
        <span
          className={cn(
            "text-sm font-medium transition-opacity",
            isActive ? "text-white" : "text-current"
          )}
        >
          {item.title}
        </span>
      )}
      {collapsed && <span className="sr-only">{item.title}</span>}
    </Link>
  );
}
