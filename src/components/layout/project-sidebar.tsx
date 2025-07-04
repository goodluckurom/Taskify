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
  UserPlus,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProject } from "@/context/project-context";
import Logo from "../logo";

export function ProjectSidebar({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const { projectSidebarCollapsed, toggleSidebar } = useProject();

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
        "fixed inset-y-0 left-0 z-20 hidden lg:flex flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out",
        projectSidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4">
        <Link
          href={`/dashboard/project/${projectId}`}
          className="flex items-center gap-2 w-full"
        >
          <Logo className="h-8 w-8 text-primary" />
          {!projectSidebarCollapsed && (
            <span className="text-lg font-semibold">Project</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
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

      {/* Collapse Button */}
      <div className="border-t p-4">
        <button
          onClick={toggleSidebar}
          aria-label={
            projectSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
          className={cn(
            "flex items-center justify-center w-full rounded-lg p-2 transition-all hover:bg-muted",
            projectSidebarCollapsed ? "mx-auto w-10" : "justify-between"
          )}
        >
          {!projectSidebarCollapsed && (
            <span className="text-sm font-medium">Collapse</span>
          )}
          <span
            className={cn(
              "transition-transform duration-300",
              projectSidebarCollapsed ? "rotate-180" : "rotate-0"
            )}
          >
            {projectSidebarCollapsed ? (
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
        "flex items-center gap-3 rounded-lg p-3 transition-all",
        isActive ? "bg-primary text-white shadow-sm" : "hover:bg-muted/50",
        collapsed ? "justify-center" : "px-4"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 flex-shrink-0",
          isActive ? "text-white" : "text-muted-foreground"
        )}
      />
      {!collapsed && (
        <span
          className={cn(
            "text-sm font-medium transition-opacity",
            isActive ? "text-white" : "text-foreground"
          )}
        >
          {item.title}
        </span>
      )}
      {collapsed && <span className="sr-only ">{item.title}</span>}
    </Link>
  );
}
