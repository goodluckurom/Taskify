"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { mockProjects, mockTasks } from "@/lib/mock-data";
import type { Project, Task, TaskComment } from "@/lib/mock-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Helper: CSV export
function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const csv = [keys.join(",")]
    .concat(
      data.map((row) => keys.map((k) => JSON.stringify(row[k] ?? "")).join(","))
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Helper: get unique members from project and tasks
function getProjectMembers(
  project: Project | null,
  tasks: Task[]
): Project["members"] {
  if (!project) return [];
  const memberNames = new Set(project.members.map((m) => m.name));
  // Add assignees from tasks if not already in members
  tasks
    .filter((t) => t.assignee)
    .forEach((t) => {
      if (t.assignee && !memberNames.has(t.assignee.name)) {
        memberNames.add(t.assignee.name);
        project.members.push({
          name: t.assignee.name,
          role: "",
          email: "",
          status: "offline",
        });
      }
    });
  return project.members;
}

const STATUS_COLORS: Record<string, string> = {
  todo: "#e5e7eb",
  "in-progress": "#60a5fa",
  review: "#fde68a",
  completed: "#6ee7b7",
};

export default function ProjectAnalyticsPage() {
  const params = useParams() as { projectId?: string };
  const projectId = params?.projectId ?? "";

  // Simulate API loading
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Project["members"]>([]);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const proj = mockProjects.find((p) => p.id === projectId) ?? null;
      const t = mockTasks.filter((task) => task.projectId === projectId);
      setProject(proj);
      setTasks(t);
      setMembers(getProjectMembers(proj, t));
      setLoading(false);
    }, 800);
  }, [projectId]);

  // --- Analytics Computations ---
  // Project Overview
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const overdueTasks = tasks.filter((t) => {
    const due = t.dueDate ? new Date(t.dueDate) : null;
    return due && due < new Date() && t.status !== "completed";
  }).length;
  const completionPercent = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;
  // Active members: those who commented or were assigned in last 14 days
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const recentComments: TaskComment[] = tasks
    .flatMap((t) => t.comments)
    .filter((c) => new Date(c.created_at) > twoWeeksAgo);
  const activeMemberNames = new Set([
    ...recentComments.map((c) => c.author.name),
    ...tasks
      .filter((t) => t.assignee && new Date(t.updated_at) > twoWeeksAgo)
      .map((t) => t.assignee?.name ?? ""),
  ]);
  const activeMembers = members.filter((m) => activeMemberNames.has(m.name));
  // Upcoming deadlines: next 7 days
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const upcomingDeadlines = tasks.filter((t) => {
    const due = t.dueDate ? new Date(t.dueDate) : null;
    return due && due > now && due < new Date(now.getTime() + sevenDays);
  });

  // Task Progress & Trends
  // Burndown: count of incomplete tasks per day (last 14 days)
  const burndownData = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now.getTime() - (13 - i) * 24 * 60 * 60 * 1000);
      return d.toISOString().slice(0, 10);
    });
    return days.map((date) => {
      const remaining = tasks.filter(
        (t) =>
          t.status !== "completed" && new Date(t.created_at) <= new Date(date)
      ).length;
      return { date, remaining };
    });
  }, [tasks]);

  // Completion rate: completed per week (last 8 weeks)
  const completionRateData = useMemo(() => {
    const weeks = Array.from({ length: 8 }, (_, i) => {
      const start = new Date(now.getTime() - 7 * (7 - i) * 24 * 60 * 60 * 1000);
      const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
      const completed = tasks.filter(
        (t) =>
          t.status === "completed" &&
          new Date(t.updated_at) >= start &&
          new Date(t.updated_at) < end
      ).length;
      return { week: start.toISOString().slice(0, 10), completed };
    });
    return weeks;
  }, [tasks]);

  // Average completion time
  const avgCompletionTime = useMemo(() => {
    const completed = tasks.filter(
      (t) => t.status === "completed" && t.created_at && t.updated_at
    );
    if (!completed.length) return null;
    const avgMs =
      completed.reduce(
        (sum, t) =>
          sum +
          (new Date(t.updated_at).getTime() - new Date(t.created_at).getTime()),
        0
      ) / completed.length;
    const days = Math.round(avgMs / (1000 * 60 * 60 * 24));
    return days;
  }, [tasks]);

  // Task distribution
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      todo: 0,
      "in-progress": 0,
      review: 0,
      completed: 0,
    };
    tasks.forEach((t) => {
      counts[t.status] = (counts[t.status] || 0) + 1;
    });
    return counts;
  }, [tasks]);
  const statusPieData = Object.entries(statusCounts).map(([status, value]) => ({
    name: status,
    value,
  }));

  // Team & Member Analytics
  // Top contributors: most completed tasks
  const topContributors = useMemo(() => {
    const map: Record<string, number> = {};
    tasks
      .filter((t) => t.status === "completed" && t.assignee)
      .forEach((t) => {
        if (t.assignee) map[t.assignee.name] = (map[t.assignee.name] || 0) + 1;
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [tasks]);
  // Task assignment load
  const assignmentLoad = useMemo(() => {
    const map: Record<string, number> = {};
    tasks.forEach((t) => {
      if (t.assignee) map[t.assignee.name] = (map[t.assignee.name] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [tasks]);

  // CSV export data
  const csvData = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    status: t.status,
    assignee: t.assignee?.name || "",
    dueDate: t.dueDate,
    created_at: t.created_at,
    updated_at: t.updated_at,
  }));

  // --- Render ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
        <div className="text-lg text-muted-foreground">
          Loading analytics...
        </div>
      </div>
    );
  }
  if (!project) {
    return (
      <div className="text-center text-destructive py-12">
        Project not found.
      </div>
    );
  }
  if (!tasks.length) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No tasks found for this project.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-2 md:px-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {project.icon} {project.name}
            <span className="text-base font-normal text-muted-foreground ml-2">
              Analytics
            </span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Project analytics and insights
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => exportToCSV(csvData, `${project.name}-tasks.csv`)}
        >
          Download CSV
        </Button>
      </div>
      <Separator />
      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
            <CardDescription>All tasks in this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
            <CardDescription>Finished tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedTasks}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {completionPercent}% complete
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overdue Tasks</CardTitle>
            <CardDescription>Past due date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overdueTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Members</CardTitle>
            <CardDescription>Last 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeMembers.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {activeMembers.map((m) => m.name).join(", ")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingDeadlines.length}</div>
            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
              {upcomingDeadlines.slice(0, 3).map((t) => (
                <li key={t.id}>
                  {t.title} ({t.dueDate})
                </li>
              ))}
              {upcomingDeadlines.length > 3 && (
                <li>and {upcomingDeadlines.length - 3} more...</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
      {/* Trends & Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Burndown (last 14 days)</CardTitle>
            <CardDescription>Remaining tasks per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart
                data={burndownData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="remaining"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completion Rate (last 8 weeks)</CardTitle>
            <CardDescription>Tasks completed per week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={completionRateData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>By status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label={({ name, percent }) =>
                    `${name}: ${
                      typeof percent === "number"
                        ? (percent * 100).toFixed(0)
                        : 0
                    }%`
                  }
                >
                  {statusPieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] || "#8884d8"}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Completion Time</CardTitle>
            <CardDescription>Days (completed tasks)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {avgCompletionTime !== null ? avgCompletionTime : "-"}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Team & Member Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
            <CardDescription>Most completed tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={topContributors}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 12 }}
                  width={100}
                />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Assignment Load</CardTitle>
            <CardDescription>Tasks per member</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={assignmentLoad}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 12 }}
                  width={100}
                />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
