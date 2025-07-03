"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Home,
  MessageSquare,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDashboard } from "@/context/dashboard-context";
import Logo from "../logo";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
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
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: CheckCircle,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: Users,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 hidden lg:flex flex-col  border-r transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        {!sidebarCollapsed && (
          <div className="flex items-center">
            <Logo className="h-10 w-10 text-blue-600" />
            <span className="text-lg font-semibold">Taskify</span>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="flex items-center justify-center w-full">
            <Logo className="h-10 w-10 text-blue-600" />
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1 py-2">
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
      <div className="mt-auto border-t px-4 py-3 relative">
        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -top-7 right-2 z-30 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-12 h-12"
          style={{ boxShadow: "0 4px 24px 0 rgba(80, 80, 200, 0.15)" }}
        >
          <span className="sr-only">
            {sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          </span>
          <span
            className="transition-transform duration-300"
            style={{
              transform: sidebarCollapsed ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </span>
        </button>
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">
                Project Manager
              </span>
              <span className="text-xs text-muted-foreground">
                admin@projectify.com
              </span>
            </div>
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
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

  if (collapsed) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex h-10 w-10 mx-auto items-center justify-center rounded-md transition-colors",
          isActive ? "bg-primary text-white" : "hover:bg-muted"
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="sr-only">{item.title}</span>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex h-10 items-center gap-3 rounded-md px-3 transition-colors",
        isActive ? "bg-primary text-white" : "hover:bg-muted"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{item.title}</span>
    </Link>
  );
}
