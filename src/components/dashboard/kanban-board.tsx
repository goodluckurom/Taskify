"use client";

import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { CheckCircle2, Clock, MoreHorizontal, Plus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { mockTasks } from "@/lib/mock-data";
import type { Task } from "@/lib/mock-data";
import { toast } from "sonner";

interface KanbanBoardProps {
  projectId: string;
  filterMine?: boolean;
  filterStatus?: "upcoming" | "completed";
  searchQuery?: string;
}

export function KanbanBoard({
  projectId,
  filterMine = false,
  filterStatus,
  searchQuery = "",
}: KanbanBoardProps) {
  // Initialize tasks from mock data
  const initialTasks = mockTasks.filter((task) => task.projectId === projectId);

  // Apply filters
  let filteredTasks = [...initialTasks];

  if (filterMine) {
    filteredTasks = filteredTasks.filter(
      (task) => task.assignee?.name === "John Doe"
    );
  }

  if (filterStatus === "upcoming") {
    filteredTasks = filteredTasks.filter((task) => task.status !== "completed");
  }

  if (filterStatus === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.status === "completed");
  }

  if (searchQuery) {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Group tasks by status
  const [columns, setColumns] = useState<{
    [key: string]: {
      title: string;
      items: Task[];
    };
  }>({
    todo: {
      title: "To Do",
      items: filteredTasks.filter((task) => task.status === "todo"),
    },
    "in-progress": {
      title: "In Progress",
      items: filteredTasks.filter((task) => task.status === "in-progress"),
    },
    review: {
      title: "In Review",
      items: filteredTasks.filter((task) => task.status === "review"),
    },
    completed: {
      title: "Completed",
      items: filteredTasks.filter((task) => task.status === "completed"),
    },
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    } else {
      // Moving from one column to another
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      // Update the task status to match the new column
      const updatedTask = { ...removed, status: destination.droppableId };

      destItems.splice(destination.index, 0, updatedTask);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      toast("Task Updated", {
        description: `"${removed.title}" moved to ${destColumn.title}`,
      });
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4" style={{ minWidth: "1000px" }}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="flex w-[300px] flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium">{column.title}</h3>
                <Badge
                  variant="outline"
                  className="rounded-full px-2 py-0 text-xs"
                >
                  {column.items.length}
                </Badge>
              </div>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "flex flex-1 flex-col gap-2 rounded-lg border border-dashed p-2",
                      snapshot.isDraggingOver && "bg-muted"
                    )}
                  >
                    {column.items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center rounded-md border border-dashed bg-background p-4 py-8 text-center">
                        <CheckCircle2 className="h-8 w-8 text-muted-foreground/50" />
                        <p className="mt-2 text-sm font-medium">No tasks</p>
                        <p className="text-xs text-muted-foreground">
                          Drag tasks here or add a new one
                        </p>
                      </div>
                    ) : (
                      column.items.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn(
                                "cursor-grab shadow-sm",
                                snapshot.isDragging && "shadow-md"
                              )}
                            >
                              <CardHeader className="p-3 pb-0">
                                <div className="flex items-start justify-between">
                                  <CardTitle className="text-sm font-medium">
                                    {task.title}
                                  </CardTitle>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">
                                          Open menu
                                        </span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        Edit Task
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Change Assignee
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive">
                                        Delete Task
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </CardHeader>
                              <CardContent className="p-3">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      task.priority === "high" &&
                                        "border-red-500 text-red-500",
                                      task.priority === "medium" &&
                                        "border-amber-500 text-amber-500",
                                      task.priority === "low" &&
                                        "border-green-500 text-green-500"
                                    )}
                                  >
                                    {task.priority}
                                  </Badge>
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {task.dueDate}
                                  </span>
                                </div>
                                {task.assignee && (
                                  <div className="mt-3 flex items-center justify-end">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-xs">
                                        {task.assignee.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                    <Button
                      variant="ghost"
                      className="mt-2 justify-start text-muted-foreground"
                      size="sm"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
