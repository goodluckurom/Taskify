"use client";

import React from "react";

import { useState } from "react";
import { CalendarIcon, Loader2, ListTodo, Plus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { mockProjects } from "@/lib/mock-data";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

const statusOptions = [
  { value: "NOT_STARTED", label: "Not Started" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "BLOCKED", label: "Blocked" },
  { value: "COMPLETED", label: "Completed" },
];

const priorityOptions = [
  { value: "CRITICAL", label: "Critical" },
  { value: "HIGH", label: "High" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LOW", label: "Low" },
];

const assignmentTypeOptions = [
  { value: "ADMIN_ASSIGNED", label: "Assign to Member" },
  { value: "GENERAL_POOL", label: "General Pool" },
];

const createTaskSchema = z
  .object({
    title: z.string().min(1, "Task title is required"),
    description: z.string().optional(),
    priority: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]),
    assignment_type: z.enum(["ADMIN_ASSIGNED", "GENERAL_POOL"]),
    status: z.enum(["NOT_STARTED", "IN_PROGRESS", "BLOCKED", "COMPLETED"]),
    due_date: z.date().optional(),
    assignee: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.assignment_type === "ADMIN_ASSIGNED") {
        return !!data.assignee;
      }
      return true;
    },
    {
      message:
        "Assignee is required when assignment type is 'Assign to Member'",
      path: ["assignee"],
    }
  );

type CreateTaskFormValues = z.infer<typeof createTaskSchema>;

export function CreateTaskDialog({
  open,
  onOpenChange,
  projectId,
}: CreateTaskDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const project = mockProjects.find((p) => p.id === projectId);

  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      assignment_type: "ADMIN_ASSIGNED",
      status: "NOT_STARTED",
      due_date: undefined,
      assignee: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = form;

  const assignmentType = watch("assignment_type");

  const onSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      toast.success("Success", { description: "Task created successfully" });
      reset();
    }, 1500);
  };

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <div className="relative">
              <ListTodo className="w-6 h-6 text-white" />
              <Plus className="w-4 h-4 text-white absolute -top-1 -right-2" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Task
          </h2>
          <p className="text-muted-foreground mt-2">
            Add a new task to your project. Fill in the details below.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter task title"
                  {...register("title")}
                  disabled={isLoading}
                />
              </FormControl>
              {errors.title && (
                <p className="text-destructive text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </FormItem>
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the task in detail"
                  className="min-h-[80px] resize-none"
                  {...register("description")}
                  disabled={isLoading}
                />
              </FormControl>
              {errors.description && (
                <p className="text-destructive text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </FormItem>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  value={watch("status")}
                  onValueChange={(
                    val: "NOT_STARTED" | "IN_PROGRESS" | "BLOCKED" | "COMPLETED"
                  ) => setValue("status", val)}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.status.message}
                  </p>
                )}
              </FormItem>
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !watch("due_date") && "text-muted-foreground"
                        )}
                        type="button"
                        disabled={isLoading}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watch("due_date") ? (
                          watch("due_date")?.toLocaleDateString()
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={watch("due_date")}
                      onSelect={(date) => setValue("due_date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.due_date && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.due_date.message}
                  </p>
                )}
              </FormItem>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  value={watch("priority")}
                  onValueChange={(
                    val: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
                  ) => setValue("priority", val)}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {priorityOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.priority && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.priority.message}
                  </p>
                )}
              </FormItem>
              <FormItem>
                <FormLabel>Assignment Type</FormLabel>
                <Select
                  value={assignmentType}
                  onValueChange={(val: "ADMIN_ASSIGNED" | "GENERAL_POOL") =>
                    setValue("assignment_type", val)
                  }
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {assignmentTypeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.assignment_type && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.assignment_type.message}
                  </p>
                )}
              </FormItem>
            </div>
            {assignmentType === "ADMIN_ASSIGNED" && (
              <FormItem>
                <FormLabel>Assignee</FormLabel>
                <Select
                  value={watch("assignee")}
                  onValueChange={(val) => setValue("assignee", val)}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select member" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {project?.members.map((member) => (
                      <SelectItem key={member.email} value={member.email}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {member.name} ({member.role})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.assignee && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.assignee.message}
                  </p>
                )}
              </FormItem>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
