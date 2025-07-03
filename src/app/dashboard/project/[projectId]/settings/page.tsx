import { notFound } from "next/navigation";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
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

export default function SettingsPage({
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
            <form className="space-y-4">
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input defaultValue={project.name} />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    defaultValue={project.description}
                    className="min-h-[100px]"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select defaultValue={project.category}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" defaultValue="2023-12-31" />
                </FormControl>
              </FormItem>
            </form>
          </CardContent>
          <CardFooter className="justify-end">
            <Button className="gap-1">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
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
                <Button
                  variant="outline"
                  className="mt-4 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  Archive Project
                </Button>
              </div>
              <div className="rounded-md border border-destructive/20 p-4">
                <h3 className="font-medium text-destructive">Delete Project</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Once deleted, this project and all its data will be
                  permanently removed.
                </p>
                <Button variant="destructive" className="mt-4" size="sm">
                  Delete Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
