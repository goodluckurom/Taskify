"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Search,
  UserPlus,
  Eye,
  MessageSquare,
} from "lucide-react";
import { mockUnassignedTasks, mockProjects } from "@/lib/mock-data";
import Link from "next/link";

export default function TaskPoolPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");

  // Filter tasks for current project
  const projectTasks = mockUnassignedTasks.filter(
    (task) => task.projectId === projectId
  );
  const currentProject = mockProjects.find((p) => p.id === projectId);

  // Filter and sort tasks
  const filteredTasks = projectTasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "due":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return (
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
          );
        case "created":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

  const handleClaimTask = (taskId: string) => {
    // In a real app, this would make an API call to assign the task to the current user
    console.log(`Claiming task: ${taskId}`);
    // You could show a toast notification here
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task Pool</h1>
          <p className="text-muted-foreground">
            Available tasks for {currentProject?.name || "this project"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <UserPlus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Available Tasks
                  </p>
                  <p className="text-2xl font-bold">{filteredTasks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    High Priority
                  </p>
                  <p className="text-2xl font-bold">
                    {filteredTasks.filter((t) => t.priority === "high").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Due This Week
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      filteredTasks.filter((t) => {
                        const dueDate = new Date(t.dueDate);
                        const now = new Date();
                        const weekFromNow = new Date(
                          now.getTime() + 7 * 24 * 60 * 60 * 1000
                        );
                        return dueDate <= weekFromNow;
                      }).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Recently Created</SelectItem>
                <SelectItem value="due">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <UserPlus className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">No tasks available</h3>
                <p className="text-muted-foreground">
                  {searchTerm || priorityFilter !== "all"
                    ? "Try adjusting your filters to see more tasks."
                    : "All tasks have been claimed or there are no unassigned tasks in this project."}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {task.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority} priority
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        Due {task.dueDate}
                      </Badge>
                      {task.comments.length > 0 && (
                        <Badge variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {task.comments.length} comment
                          {task.comments.length !== 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Created {formatDate(task.created_at)}</span>
                      <span>•</span>
                      <span>Updated {formatDate(task.updated_at)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                    <Button
                      onClick={() => handleClaimTask(task.id)}
                      className="w-full sm:w-auto lg:w-full"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Claim Task
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="w-full sm:w-auto lg:w-full"
                    >
                      <Link
                        href={`/dashboard/project/${projectId}/task/${task.id}`}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
