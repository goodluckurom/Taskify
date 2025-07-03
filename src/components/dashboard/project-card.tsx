import { CalendarClock, CheckCircle2, Star } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/mock-data";

interface ProjectCardProps {
  project: Project;
}
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group h-[240px] rounded-xl border border-border bg-white/60 dark:bg-white/5 p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-md">
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-md font-semibold text-white shadow-sm"
          )}
          style={{ backgroundColor: project.color }}
        >
          {project.icon}
        </div>

        <div className="flex items-center gap-2">
          <button className="text-muted-foreground hover:text-primary transition">
            <Star className="h-4 w-4" />
          </button>

          {/* Avatars */}
          {project.members && (
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member, i) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-background text-xs font-medium text-foreground"
                  title={member.name}
                >
                  {member.name.charAt(0)}
                </div>
              ))}
              {project.members.length > 3 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-foreground">
                  +{project.members.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Project Title */}
      <h3 className="mt-5 truncate text-base font-semibold text-foreground group-hover:text-primary">
        {project.name}
      </h3>

      {/* Description */}
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
        {project.description}
      </p>

      {/* Progress */}
      {project.stats && (
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-medium text-foreground">
              {project.stats.completionPercentage}%
            </span>
          </div>
          <Progress
            value={project.stats.completionPercentage}
            className="h-1.5 bg-muted"
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        {project.stats && (
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>
              {project.stats.completedTasks}/{project.stats.totalTasks} tasks
            </span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <CalendarClock className="h-3.5 w-3.5" />
          <span>Due {project.dueDate}</span>
        </div>
      </div>
    </div>
  );
}
