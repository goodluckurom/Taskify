"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, ListTodo, MessageSquare, Users } from "lucide-react"

import { cn } from "@/lib/utils"

interface MobileProjectNavigationProps {
  className?: string
  projectId: string
}

export function MobileProjectNavigation({ className, projectId }: MobileProjectNavigationProps) {
  const pathname = usePathname()

  const navItems = [
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
  ]

  return (
    <div className={cn("bg-background border-t", className)}>
      <div className="grid h-16 grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-primary",
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span className="text-xs">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
