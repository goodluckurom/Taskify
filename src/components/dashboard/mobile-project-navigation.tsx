"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  ListTodo,
  MessageSquare,
  Users,
  Plus,
  FileText,
  BarChart3,
  Settings,
  UserPlus,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MobileProjectNavigationProps {
  className?: string;
  projectId: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS_STORAGE_KEY = "mobile-project-navigation-items";

export function MobileProjectNavigation({
  className,
  projectId,
}: MobileProjectNavigationProps) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // All available navigation items
  const allNavItems: NavItem[] = [
    {
      name: "Overview",
      href: `/dashboard/project/${projectId}`,
      icon: Home,
    },
    {
      name: "Tasks",
      href: `/dashboard/project/${projectId}/tasks`,
      icon: ListTodo,
    },
    {
      name: "Task Pool",
      href: `/dashboard/project/${projectId}/task-pool`,
      icon: UserPlus,
    },
    {
      name: "Calendar",
      href: `/dashboard/project/${projectId}/calendar`,
      icon: Calendar,
    },
    {
      name: "Team",
      href: `/dashboard/project/${projectId}/users`,
      icon: Users,
    },
    {
      name: "Messages",
      href: `/dashboard/project/${projectId}/messages`,
      icon: MessageSquare,
    },
    {
      name: "Files",
      href: `/dashboard/project/${projectId}/files`,
      icon: FileText,
    },
    {
      name: "Analytics",
      href: `/dashboard/project/${projectId}/analytics`,
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: `/dashboard/project/${projectId}/settings`,
      icon: Settings,
    },
  ];

  // Load visible items from localStorage or use default
  const [visibleItems, setVisibleItems] = useState<NavItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem(NAV_ITEMS_STORAGE_KEY);
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          // Map stored items to actual components
          return parsedItems
            .map((storedItem: { name: string; href: string }) => {
              const foundItem = allNavItems.find(
                (item) => item.href === storedItem.href
              );
              return foundItem || allNavItems[0]; // fallback to first item if not found
            })
            .slice(0, 4); // Ensure we only take 4 items
        } catch (e) {
          console.error("Failed to parse stored nav items", e);
        }
      }
    }
    // Default visible items (first 4)
    return [
      allNavItems[0], // Overview
      allNavItems[1], // Tasks
      allNavItems[3], // Calendar
      allNavItems[4], // Team
    ];
  });

  // Save to localStorage whenever visibleItems changes
  useEffect(() => {
    localStorage.setItem(
      NAV_ITEMS_STORAGE_KEY,
      JSON.stringify(visibleItems.map(({ name, href }) => ({ name, href })))
    );
  }, [visibleItems]);

  // Get hidden items (items not in visible items)
  const hiddenItems = allNavItems.filter(
    (item) => !visibleItems.some((visible) => visible.href === item.href)
  );

  // Handle item swap and navigation
  const handleItemSwap = (selectedItem: NavItem) => {
    // Create new visible items array with the selected item replacing the last one
    const newVisibleItems = [...visibleItems.slice(0, -1), selectedItem];
    setVisibleItems(newVisibleItems);
    setIsDrawerOpen(false);
  };

  // Close drawer when clicking outside or on overlay
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed bottom-16 left-0 right-0 bg-app-gradient border-t border-x rounded-t-xl shadow-lg z-50 lg:hidden transition-transform duration-300 ease-in-out",
          isDrawerOpen ? "translate-y-0" : "translate-y-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">More Options</h3>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 max-h-80 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {hiddenItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemSwap(item);
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-4 rounded-lg border transition-colors hover:bg-muted",
                    isActive && "bg-primary/10 border-primary"
                  )}
                >
                  <IconComponent
                    className={cn("h-6 w-6", isActive && "text-primary")}
                  />
                  <span className={cn("text-sm", isActive && "text-primary")}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {hiddenItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>All items are currently visible in the navigation bar</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={cn("bg-app-gradient border-t", className)}>
        <div className="grid h-16 grid-cols-5">
          {/* Visible navigation items */}
          {visibleItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-primary"
                )}
              >
                <IconComponent
                  className={cn("h-5 w-5", isActive && "text-primary")}
                />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}

          {/* Plus button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDrawerOpen(!isDrawerOpen);
            }}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground",
              isDrawerOpen && "text-primary"
            )}
          >
            <Plus className={cn("h-5 w-5", isDrawerOpen && "text-primary")} />
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>
    </>
  );
}
