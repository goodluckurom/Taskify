"use client";

import { useMemo } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { mockTasks, Task } from "@/lib/mock-data";

interface CalendarViewProps {
  projectId: string;
  month: number;
  year: number;
  view: "month" | "week" | "day";
}

export function CalendarView({
  projectId,
  month,
  year,
  view,
}: CalendarViewProps) {
  // Get all tasks for this project
  const projectTasks = mockTasks.filter((task) => task.projectId === projectId);

  // Parse task dates and create a map of dates to tasks
  const tasksByDate = useMemo(() => {
    const map: Record<string, Task[]> = {};

    projectTasks.forEach((task) => {
      // Convert "Nov 15" format to a date object
      const dateParts = task.dueDate.split(" ");
      const monthName = dateParts[0];
      const day = Number.parseInt(dateParts[1]);

      const monthMap: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };

      const taskMonth = monthMap[monthName];
      // Assume current year for simplicity
      const taskYear = year;

      const dateKey = `${taskYear}-${taskMonth}-${day}`;

      if (!map[dateKey]) {
        map[dateKey] = [];
      }

      map[dateKey].push(task);
    });

    return map;
  }, [projectTasks, year]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Create array for all days in the month
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 0, isCurrentMonth: false });
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        tasks: tasksByDate[`${year}-${month}-${i}`] || [],
      });
    }

    // Fill remaining cells to complete the grid (6 rows x 7 columns)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  }, [month, year, tasksByDate]);

  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Check if a day is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  if (view === "month") {
    return (
      <div className="w-full">
        <div className="grid grid-cols-7 gap-px rounded-t-lg bg-muted text-center text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="bg-background py-2 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px rounded-b-lg bg-muted">
          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={cn(
                  "min-h-[120px] bg-background p-2",
                  !day.isCurrentMonth && "bg-muted/50 text-muted-foreground",
                  isToday(day.day) &&
                    day.isCurrentMonth &&
                    "ring-2 ring-inset ring-primary"
                )}
              >
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                      isToday(day.day) &&
                        day.isCurrentMonth &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    {day.day > 0 ? day.day : ""}
                  </span>
                  {day.tasks && day.tasks.length > 0 && (
                    <Badge variant="outline" className="h-5 px-1 text-xs">
                      {day.tasks.length}
                    </Badge>
                  )}
                </div>
                {day.tasks && day.tasks.length > 0 && (
                  <ScrollArea className="mt-1 h-[80px]">
                    <div className="space-y-1">
                      {day.tasks.map((task) => (
                        <Link
                          href={`/dashboard/project/${projectId}/task/${task.id}`}
                          key={task.id}
                          className={cn(
                            "block truncate rounded px-1.5 py-1 text-xs",
                            task.priority === "high" &&
                              "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                            task.priority === "medium" &&
                              "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                            task.priority === "low" &&
                              "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          )}
                        >
                          {task.title}
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (view === "week") {
    // Find the current week
    const today = new Date();
    const currentDay = today.getDate();
    const currentWeekIndex = Math.floor(
      (currentDay + new Date(year, month, 1).getDay() - 1) / 7
    );
    const currentWeek = weeks[currentWeekIndex] || weeks[0];

    return (
      <div className="w-full">
        <div className="grid grid-cols-7 gap-px rounded-t-lg bg-muted text-center text-sm">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="bg-background py-2 font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px rounded-b-lg bg-muted">
          {currentWeek.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={cn(
                "min-h-[300px] bg-background p-2",
                !day.isCurrentMonth && "bg-muted/50 text-muted-foreground",
                isToday(day.day) &&
                  day.isCurrentMonth &&
                  "ring-2 ring-inset ring-primary"
              )}
            >
              <div className="flex justify-between">
                <span
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                    isToday(day.day) &&
                      day.isCurrentMonth &&
                      "bg-primary text-primary-foreground"
                  )}
                >
                  {day.day > 0 ? day.day : ""}
                </span>
                {day.tasks && day.tasks.length > 0 && (
                  <Badge variant="outline" className="h-5 px-1 text-xs">
                    {day.tasks.length}
                  </Badge>
                )}
              </div>
              {day.tasks && day.tasks.length > 0 ? (
                <ScrollArea className="mt-2 h-[250px]">
                  <div className="space-y-2">
                    {day.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "rounded-md border p-2 text-sm",
                          task.priority === "high" &&
                            "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20",
                          task.priority === "medium" &&
                            "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-900/20",
                          task.priority === "low" &&
                            "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20"
                        )}
                      >
                        <div className="font-medium">{task.title}</div>
                        <div className="mt-1 flex items-center justify-between text-xs">
                          <Badge variant="outline" className="h-5 px-1">
                            {task.status.replace("-", " ")}
                          </Badge>
                          {task.assignee && (
                            <span className="text-muted-foreground">
                              {task.assignee.name}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex h-[250px] flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground">No tasks</p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Task
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "day") {
    // Default to today or the first day of the month
    const today = new Date();
    const dayToShow =
      today.getMonth() === month && today.getFullYear() === year
        ? today.getDate()
        : 1;

    const dayData = calendarDays.find(
      (d) => d.day === dayToShow && d.isCurrentMonth
    );
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

    return (
      <div className="w-full">
        <div className="rounded-lg border bg-background p-4">
          <h3 className="mb-4 text-center text-lg font-medium">
            {new Date(year, month, dayToShow).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <div className="space-y-2">
            {hours.map((hour) => {
              const hourTasks = dayData?.tasks?.filter((task) => {
                // For demo purposes, randomly assign tasks to hours
                return task.id.charCodeAt(task.id.length - 1) % 12 === hour - 8;
              });

              return (
                <div
                  key={hour}
                  className="grid grid-cols-12 gap-4 border-t py-2"
                >
                  <div className="col-span-1 text-right text-sm text-muted-foreground">
                    {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "AM" : "PM"}
                  </div>
                  <div className="col-span-11">
                    {hourTasks && hourTasks.length > 0 ? (
                      <div className="space-y-2">
                        {hourTasks.map((task) => (
                          <div
                            key={task.id}
                            className={cn(
                              "rounded-md border p-2",
                              task.priority === "high" &&
                                "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20",
                              task.priority === "medium" &&
                                "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-900/20",
                              task.priority === "low" &&
                                "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20"
                            )}
                          >
                            <div className="font-medium">{task.title}</div>
                            <div className="mt-1 flex items-center justify-between text-xs">
                              <Badge variant="outline">
                                {task.status.replace("-", " ")}
                              </Badge>
                              {task.assignee && (
                                <span className="text-muted-foreground">
                                  {task.assignee.name}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-8 items-center rounded-md border border-dashed border-muted-foreground/20 px-2">
                        <span className="text-xs text-muted-foreground">
                          No tasks scheduled
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
