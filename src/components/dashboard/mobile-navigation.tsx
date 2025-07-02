"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  ClipboardList,
  CheckCircle,
  MessageSquare,
  User,
} from "lucide-react";

interface MobileNavigationProps {
  className?: string;
}

export default function MobileNavigation({ className }: MobileNavigationProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: ClipboardList,
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: CheckCircle,
    },
    {
      name: "Chat",
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <div className={cn("bg-background border-t", className)}>
      <div className="grid h-16 grid-cols-5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-primary"
              )}
            >
              <item.icon
                className={cn("h-5 w-5", isActive && "text-primary")}
              />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
