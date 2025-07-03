"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Grid, List, Plus, Search } from "lucide-react";
import { UserPlus } from "lucide-react";
import Link from "next/link";

import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog";
import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { ProjectTaskList } from "@/components/dashboard/project-task-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { mockProjects } from "@/lib/mock-data";

export default function TasksPage({
  params,
}: {
  params: { projectId: string };
}) {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const project = mockProjects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <div className="flex gap-2">
          <Button asChild size="sm" className="gap-1 sm:self-start">
            <Link href={`/dashboard/project/${params.projectId}/task-pool`}>
              <UserPlus className="h-4 w-4" />
              Task Pool
            </Link>
          </Button>
          <Button
            onClick={() => setIsCreateTaskOpen(true)}
            size="sm"
            className="gap-1 sm:self-start"
          >
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
              <SelectItem value="done">Completed</SelectItem>
            </SelectContent>
          </Select>
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) =>
              value && setViewMode(value as "list" | "kanban")
            }
          >
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="kanban" aria-label="Kanban view">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 ">
          {viewMode === "list" ? (
            <div className="rounded-xl border bg-background">
              <ProjectTaskList
                projectId={params.projectId}
                searchQuery={searchQuery}
              />
            </div>
          ) : (
            <KanbanBoard
              projectId={params.projectId}
              searchQuery={searchQuery}
            />
          )}
        </TabsContent>
        <TabsContent value="my-tasks" className="mt-4">
          {viewMode === "list" ? (
            <div className="rounded-xl border bg-background">
              <ProjectTaskList
                projectId={params.projectId}
                filterMine={true}
                searchQuery={searchQuery}
              />
            </div>
          ) : (
            <KanbanBoard
              projectId={params.projectId}
              filterMine={true}
              searchQuery={searchQuery}
            />
          )}
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          {viewMode === "list" ? (
            <div className="rounded-xl border bg-background">
              <ProjectTaskList
                projectId={params.projectId}
                filterStatus="upcoming"
                searchQuery={searchQuery}
              />
            </div>
          ) : (
            <KanbanBoard
              projectId={params.projectId}
              filterStatus="upcoming"
              searchQuery={searchQuery}
            />
          )}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {viewMode === "list" ? (
            <div className="rounded-xl border bg-background">
              <ProjectTaskList
                projectId={params.projectId}
                filterStatus="completed"
                searchQuery={searchQuery}
              />
            </div>
          ) : (
            <KanbanBoard
              projectId={params.projectId}
              filterStatus="completed"
              searchQuery={searchQuery}
            />
          )}
        </TabsContent>
      </Tabs>

      <CreateTaskDialog
        open={isCreateTaskOpen}
        onOpenChange={setIsCreateTaskOpen}
        projectId={params.projectId}
      />
    </div>
  );
}
