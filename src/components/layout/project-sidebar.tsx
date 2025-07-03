"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Home,
  ListTodo,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  UserPlus,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Logo from "../logo";
import { useProject } from "@/context/project-context";

export function ProjectSidebar({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const { projectSidebarCollapsed, toggleSidebar } = useProject();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    {
      title: "Overview",
      href: `/dashboard/project/${projectId}`,
      icon: Home,
    },
    {
      title: "Tasks",
      href: `/dashboard/project/${projectId}/tasks`,
      icon: ListTodo,
    },
    {
      title: "Task Pool",
      href: `/dashboard/project/${projectId}/task-pool`,
      icon: UserPlus,
    },
    {
      title: "Calendar",
      href: `/dashboard/project/${projectId}/calendar`,
      icon: Calendar,
    },
    {
      title: "Team",
      href: `/dashboard/project/${projectId}/users`,
      icon: Users,
    },
    {
      title: "Messages",
      href: `/dashboard/project/${projectId}/messages`,
      icon: MessageSquare,
    },
    {
      title: "Files",
      href: `/dashboard/project/${projectId}/files`,
      icon: FileText,
    },
    {
      title: "Analytics",
      href: `/dashboard/project/${projectId}/analytics`,
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: `/dashboard/project/${projectId}/settings`,
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 hidden lg:flex flex-col border-r transition-all duration-300 ease-in-out",
        projectSidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        {!projectSidebarCollapsed ? (
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-blue-600" />
            <span className="text-lg font-semibold">Project</span>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <Logo className="h-8 w-8 text-blue-600" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1 py-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              collapsed={projectSidebarCollapsed}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Controls */}
      <div className="border-t p-3 space-y-2">
        {/* Theme Toggle */}
        <div className="flex justify-center">
          {projectSidebarCollapsed ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-10 w-10 rounded-md hover:bg-muted transition-colors"
              disabled={!mounted}
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="w-full justify-start gap-3 h-10 rounded-md hover:bg-muted transition-colors"
              disabled={!mounted}
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span>
                {mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </Button>
          )}
        </div>

        {/* Collapse/Expand Button */}
        <div className="flex justify-center">
          <button
            onClick={toggleSidebar}
            aria-label={
              projectSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 w-12 h-12"
            style={{ boxShadow: "0 4px 24px 0 rgba(80, 80, 200, 0.15)" }}
          >
            <span className="sr-only">
              {projectSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            </span>
            <span
              className="transition-transform duration-300"
              style={{
                transform: projectSidebarCollapsed
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            >
              {projectSidebarCollapsed ? (
                <ChevronRight className="h-6 w-6" />
              ) : (
                <ChevronLeft className="h-6 w-6" />
              )}
            </span>
          </button>
        </div>
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
