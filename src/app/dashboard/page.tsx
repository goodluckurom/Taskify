"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { ProjectCard } from "@/components/dashboard/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { mockProjects, Project } from "@/lib/mock-data";
import { toast } from "sonner";
import { ProjectForm } from "@/components/dashboard/project-form";

type FormValues = {
  name: string;
  description: string;
  deadline?: Date;
  icon: string;
  color: string;
};

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Simulate API call
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProjects(mockProjects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (values: FormValues) => {
    setIsCreatingProject(true);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          icon: values.icon,
          color: values.color,
          deadline: values.deadline ? values.deadline.toISOString() : null,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      // Assuming your API returns the created project object
      const createdProject: Project = await response.json();

      setProjects([createdProject, ...projects]);
      setIsCreateProjectOpen(false);
    } catch (error) {
      console.error("Failed to create project:", error);
      // Optional: show error to user
      toast.error("Error creating project, please try again!.", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsCreatingProject(false);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8 md:py-2 lg:py-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Projects
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage and collaborate on your active projects
          </p>
        </div>
        <Button
          onClick={() => setIsCreateProjectOpen(true)}
          className="gap-1 sm:self-start text-white"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="mt-6">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4 rounded-xl border p-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between pt-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Link
                  href={`/dashboard/project/${project.id}`}
                  key={project.id}
                >
                  <ProjectCard project={project} />
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-medium">No projects found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {searchQuery
                    ? "We couldn't find any projects matching your search."
                    : "You don't have any projects yet."}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() =>
                    searchQuery
                      ? setSearchQuery("")
                      : setIsCreateProjectOpen(true)
                  }
                >
                  {searchQuery ? "Clear search" : "Create project"}
                </Button>
              </div>
            )}

            {/* Always show create new project card */}
            <button
              onClick={() => setIsCreateProjectOpen(true)}
              className="flex h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-gray-200 dark:bg-gray-900 p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-medium">Create New Project</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Start a new project from scratch
              </p>
            </button>
          </div>
        )}
      </div>

      <ProjectForm
        open={isCreateProjectOpen}
        onOpenChange={setIsCreateProjectOpen}
        onSubmit={handleCreateProject}
        isLoading={isCreatingProject}
      />
    </div>
  );
}
