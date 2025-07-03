import Link from "next/link";
import { Bell, ChevronDown, Plus, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/lib/mock-data";

interface ProjectHeaderProps {
  project: Project;
  className?: string;
}

export function ProjectHeader({ project, className }: ProjectHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 flex h-16 items-center justify-between border-b border-border/50 bg-white/60 dark:bg-white/5 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 mb-8 ${
        className ?? ""
      }`}
    >
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
          </Link>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-md text-lg font-semibold"
            style={{ backgroundColor: project.color }}
          >
            {project.icon}
          </div>
          <h1 className="text-xl font-semibold">{project.name}</h1>
          <div className="hidden items-center rounded-full border px-3 py-1 text-xs md:flex">
            <span className="text-muted-foreground">Due {project.dueDate}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {/* Mobile Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="lg:hidden h-8 w-8 rounded-md hover:bg-muted transition-colors"
            disabled={!mounted}
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="outline" size="sm" className="hidden gap-1 md:flex">
            <Plus className="h-3.5 w-3.5" />
            Invite
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem
                    key={i}
                    className="flex items-start gap-2 p-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {project.members[
                          i % project.members.length
                        ].name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {project.members[i % project.members.length].name}
                        </span>{" "}
                        {i === 1
                          ? "commented on a task"
                          : i === 2
                          ? "completed a task"
                          : "mentioned you in a comment"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i === 1
                          ? "2 hours ago"
                          : i === 2
                          ? "Yesterday"
                          : "2 days ago"}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
