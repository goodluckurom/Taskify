"use client";
import { notFound } from "next/navigation";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { mockProjects } from "@/lib/mock-data";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["design", "development", "marketing", "research"]),
  dueDate: z.string().min(1, "Due date is required"),
});
type ProjectFormValues = z.infer<typeof projectSchema>;

export default function SettingsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = mockProjects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  const [isSaving, setIsSaving] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [archiveConfirm, setArchiveConfirm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      category: project.category as ProjectFormValues["category"],
      dueDate: "2023-12-31",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: ProjectFormValues) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Saved! " + JSON.stringify(data, null, 2));
    }, 800);
  };

  // Mock API call
  const mockApi = (action: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${action} success`);
      }, 1200);
    });
  };

  const handleArchive = async () => {
    setIsArchiving(true);
    await mockApi("archive");
    setIsArchiving(false);
    setArchiveOpen(false);
    setArchiveConfirm("");
    alert("Project archived!");
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await mockApi("delete");
    setIsDeleting(false);
    setDeleteOpen(false);
    setDeleteConfirm("");
    alert("Project deleted!");
  };

  return (
    <div className="w-full max-w-none space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Project Settings</h1>
        <p className="text-muted-foreground">
          Manage your project preferences and settings
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>
              Update your project&apos;s basic information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Textarea {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
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
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardFooter className="justify-end px-0">
                  <Button type="submit" className="gap-1" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive project notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates for important events
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Task Assignments</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you&apos;re assigned to a task
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Task Comments</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone comments on your task
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Digest</p>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of project activity
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-destructive/20 p-4">
                <h3 className="font-medium text-destructive">
                  Archive Project
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  This project will be hidden from your dashboard but can be
                  restored later.
                </p>
                <Dialog open={archiveOpen} onOpenChange={setArchiveOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-4 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setArchiveOpen(true)}
                      disabled={isArchiving}
                    >
                      {isArchiving ? (
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : null}
                      Archive Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Archive Project</DialogTitle>
                      <DialogDescription>
                        To confirm, type the project name{" "}
                        <span className="font-semibold">{project.name}</span>{" "}
                        below.
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      placeholder="Type project name to confirm"
                      value={archiveConfirm}
                      onChange={(e) => setArchiveConfirm(e.target.value)}
                      disabled={isArchiving}
                      className="mt-2"
                    />
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setArchiveOpen(false)}
                        disabled={isArchiving}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleArchive}
                        disabled={
                          isArchiving || archiveConfirm !== project.name
                        }
                      >
                        {isArchiving ? (
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : null}
                        Yes, Archive
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="rounded-md border border-destructive/20 p-4">
                <h3 className="font-medium text-destructive">Delete Project</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Once deleted, this project and all its data will be
                  permanently removed.
                </p>
                <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="mt-4"
                      size="sm"
                      onClick={() => setDeleteOpen(true)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : null}
                      Delete Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Project</DialogTitle>
                      <DialogDescription>
                        To confirm, type{" "}
                        <span className="font-semibold">delete my project</span>{" "}
                        below.
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      placeholder="Type 'delete my project' to confirm"
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                      disabled={isDeleting}
                      className="mt-2"
                    />
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteOpen(false)}
                        disabled={isDeleting}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={
                          isDeleting || deleteConfirm !== "delete my project"
                        }
                      >
                        {isDeleting ? (
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : null}
                        Yes, Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
