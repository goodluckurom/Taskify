import { notFound } from "next/navigation";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  ListTodo,
  Users,
} from "lucide-react";

import { ProjectActivityFeed } from "@/components/dashboard/project-activity-feed";
import { ProjectOverviewCard } from "@/components/dashboard/project-overview-card";
import { ProjectTaskList } from "@/components/dashboard/project-task-list";
import { Button } from "@/components/ui/button";
import { mockProjects } from "@/lib/mock-data";

export default function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = mockProjects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Project Overview</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">View Reports</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ProjectOverviewCard
          title="Total Tasks"
          value={project.stats.totalTasks.toString()}
          icon={ListTodo}
          description={`${project.stats.completedTasks} completed`}
          trend={project.stats.tasksTrend}
        />
        <ProjectOverviewCard
          title="Team Members"
          value={project.members.length.toString()}
          icon={Users}
          description="Active collaborators"
          trend={project.stats.membersTrend}
        />
        <ProjectOverviewCard
          title="Completion"
          value={`${project.stats.completionPercentage}%`}
          icon={CheckCircle2}
          description="Project progress"
          trend={project.stats.completionTrend}
        />
        <ProjectOverviewCard
          title="Time Remaining"
          value={project.stats.timeRemaining}
          icon={Clock}
          description={`Due on ${project.dueDate}`}
          trend={0}
          trendType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Tasks</h2>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <Button variant="outline" size="sm" asChild>
                  <a href={`/dashboard/project/${params.projectId}/tasks`}>
                    View All
                  </a>
                </Button>
              </div>
            </div>
            <ProjectTaskList projectId={params.projectId} limit={5} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Activity</h2>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <ProjectActivityFeed projectId={params.projectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
