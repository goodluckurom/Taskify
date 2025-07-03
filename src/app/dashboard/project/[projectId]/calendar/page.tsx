"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { CalendarView } from "@/components/dashboard/calendar-view";
import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockProjects } from "@/lib/mock-data";

export default function CalendarPage({
  params,
}: {
  params: { projectId: string };
}) {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">(
    "month"
  );

  const project = mockProjects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <Button
          onClick={() => setIsCreateTaskOpen(true)}
          size="sm"
          className="gap-1 sm:self-start"
        >
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const now = new Date();
              setCurrentMonth(now.getMonth());
              setCurrentYear(now.getFullYear());
            }}
          >
            Today
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={calendarView}
            onValueChange={(value) =>
              setCalendarView(value as "month" | "week" | "day")
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border bg-background p-4">
        <CalendarView
          projectId={params.projectId}
          month={currentMonth}
          year={currentYear}
          view={calendarView}
        />
      </div>

      <CreateTaskDialog
        open={isCreateTaskOpen}
        onOpenChange={setIsCreateTaskOpen}
        projectId={params.projectId}
      />
    </div>
  );
}
