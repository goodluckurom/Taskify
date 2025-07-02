"use client"

import { useState } from "react"
import { CheckCircle2, Clock, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { mockTasks } from "@/lib/mock-data"

interface ProjectTaskListProps {
  projectId: string
  limit?: number
  filterMine?: boolean
  filterStatus?: "upcoming" | "completed"
  searchQuery?: string
}

export function ProjectTaskList({
  projectId,
  limit,
  filterMine = false,
  filterStatus,
  searchQuery = "",
}: ProjectTaskListProps) {
  const [tasks, setTasks] = useState(mockTasks.filter((task) => task.projectId === projectId))

  let filteredTasks = [...tasks]

  if (filterMine) {
    filteredTasks = filteredTasks.filter((task) => task.assignee?.name === "John Doe")
  }

  if (filterStatus === "upcoming") {
    filteredTasks = filteredTasks.filter((task) => task.status !== "completed")
  }

  if (filterStatus === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.status === "completed")
  }

  if (searchQuery) {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  if (limit) {
    filteredTasks = filteredTasks.slice(0, limit)
  }

  const handleTaskStatusChange = (taskId: string, checked: boolean) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: checked ? "completed" : "todo" } : task)))
  }

  return (
    <div className="divide-y">
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-2 text-lg font-medium">No tasks found</h3>
          <p className="mt-1 text-sm text-muted-foreground">There are no tasks matching your criteria</p>
          <Button variant="outline" className="mt-4">
            Create a new task
          </Button>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.status === "completed"}
                onCheckedChange={(checked) => handleTaskStatusChange(task.id, checked as boolean)}
              />
              <div>
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn("font-medium", task.status === "completed" && "text-muted-foreground line-through")}
                >
                  {task.title}
                </label>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      task.priority === "high" && "border-red-500 text-red-500",
                      task.priority === "medium" && "border-amber-500 text-amber-500",
                      task.priority === "low" && "border-green-500 text-green-500",
                    )}
                  >
                    {task.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      task.status === "todo" && "border-slate-500 text-slate-500",
                      task.status === "in-progress" && "border-blue-500 text-blue-500",
                      task.status === "review" && "border-purple-500 text-purple-500",
                      task.status === "completed" && "border-green-500 text-green-500",
                    )}
                  >
                    {task.status.replace("-", " ")}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {task.dueDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {task.assignee && (
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs">{task.assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem>Change Assignee</DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Change Status</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
