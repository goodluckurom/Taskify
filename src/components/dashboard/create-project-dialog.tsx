/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2, Palette, Smile } from "lucide-react";
import { useForm } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { toast } from "sonner";

// Forward ref for Textarea to fix ref warnings
const TextareaWithRef = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => <Textarea ref={ref} {...props} />);
TextareaWithRef.displayName = "Textarea";

// Forward ref for Button to fix ref warnings
const ButtonWithRef = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => <Button ref={ref} {...props} />);
ButtonWithRef.displayName = "Button";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated: (newProject: any) => void;
}

type FormValues = {
  name: string;
  description: string;
  dueDate?: Date;
  icon: string;
  color: string;
  category: string;
};

const categoryOptions = [
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "marketing", label: "Marketing" },
  { value: "research", label: "Research" },
  { value: "operations", label: "Operations" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "education", label: "Education" },
];

export function CreateProjectDialog({
  open,
  onOpenChange,
  onProjectCreated,
}: CreateProjectDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      icon: "📁",
      color: "#6366f1",
      category: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      const projectData = {
        name: values.name,
        description: values.description,
        icon: values.icon,
        color: values.color,
        category: values.category,
        due_date: values.dueDate?.toISOString(),
        status: "active",
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const newProject = await response.json();
      onProjectCreated(newProject);
      toast.success("Project created successfully");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    form.setValue("icon", emoji.native);
    setEmojiPickerOpen(false);
  };

  const handleColorChange = (color: string) => {
    form.setValue("color", color);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Project</DialogTitle>
          <DialogDescription>
            Start collaborating with your team on a new project.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-2"
          >
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Left Column - Main Form */}
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Website Redesign"
                          className="h-12 text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <TextareaWithRef
                          placeholder="What's this project about?"
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <ButtonWithRef
                                variant="outline"
                                className={cn(
                                  "h-12 w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  field.value.toLocaleDateString()
                                ) : (
                                  <span>Select a date</span>
                                )}
                              </ButtonWithRef>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Right Column - Visual Customization */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Icon</FormLabel>
                      <div className="flex items-center gap-3">
                        <Popover
                          open={emojiPickerOpen}
                          onOpenChange={setEmojiPickerOpen}
                        >
                          <PopoverTrigger asChild>
                            <ButtonWithRef
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-16 w-16 text-3xl"
                            >
                              {field.value}
                            </ButtonWithRef>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            onInteractOutside={(e) => {
                              const target = e.target as HTMLElement;
                              if (target.closest(".emoji-picker")) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <div className="emoji-picker">
                              <Picker
                                data={data}
                                onEmojiSelect={handleEmojiSelect}
                                theme="light"
                                previewPosition="none"
                                searchPosition="none"
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                        <ButtonWithRef
                          type="button"
                          variant="ghost"
                          onClick={() => setEmojiPickerOpen(true)}
                          className="gap-2"
                        >
                          <Smile className="h-4 w-4" />
                          Choose emoji
                        </ButtonWithRef>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Color</FormLabel>
                      <div className="space-y-3">
                        <Popover
                          open={colorPickerOpen}
                          onOpenChange={setColorPickerOpen}
                        >
                          <PopoverTrigger asChild>
                            <div className="flex items-center gap-3">
                              <div
                                className="h-12 w-12 rounded-md border"
                                style={{ backgroundColor: field.value }}
                              />
                              <ButtonWithRef
                                type="button"
                                variant="ghost"
                                className="gap-2"
                                onClick={() => setColorPickerOpen(true)}
                              >
                                <Palette className="h-4 w-4" />
                                Choose color
                              </ButtonWithRef>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-3"
                            onInteractOutside={(e) => {
                              const target = e.target as HTMLElement;
                              if (target.closest(".react-colorful")) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <HexColorPicker
                              color={field.value}
                              onChange={handleColorChange}
                            />
                            <div className="mt-3 flex items-center gap-2">
                              <Input
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="h-8 flex-1"
                              />
                              <div
                                className="h-8 w-8 rounded border"
                                style={{ backgroundColor: field.value }}
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <ButtonWithRef
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </ButtonWithRef>
              <ButtonWithRef
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Project
              </ButtonWithRef>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
