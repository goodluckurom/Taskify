"use client";
import { useState, useMemo } from "react";
import { mockProjects } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter, Search, ArchiveRestore, Archive, Plus } from "lucide-react";
import { ProjectCard } from "@/components/dashboard/project-card";
import { ProjectForm } from "@/components/dashboard/project-form";

const categories = Array.from(new Set(mockProjects.map((p) => p.category)));
const owners = Array.from(new Set(mockProjects.map((p) => p.owner.email)));

function ProjectSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="h-6 w-1/2 bg-muted rounded" />
        <div className="h-4 w-1/3 bg-muted rounded" />
        <div className="h-8 w-full bg-muted rounded" />
      </CardContent>
    </Card>
  );
}

export default function ProjectsPage() {
  const [tab, setTab] = useState<"active" | "archived">("active");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [owner, setOwner] = useState("");
  const [minCompletion, setMinCompletion] = useState(0);
  const [loading] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const handleCreateProject = async () => {
    setIsCreatingProject(true);
    setTimeout(() => {
      setIsCreatingProject(false);
      setIsCreateProjectOpen(false);
    }, 1000);
  };

  const filteredProjects = useMemo(() => {
    let projects = mockProjects.filter((p) =>
      tab === "archived" ? p.status === "ARCHIVED" : p.status !== "ARCHIVED"
    );
    if (search) {
      projects = projects.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      projects = projects.filter((p) => p.category === category);
    }
    if (owner) {
      projects = projects.filter((p) => p.owner.email === owner);
    }
    if (minCompletion > 0) {
      projects = projects.filter(
        (p) => p.stats.completionPercentage >= minCompletion
      );
    }
    return projects;
  }, [tab, search, category, owner, minCompletion]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-2 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Projects
        </h1>
        <div className="flex gap-2">
          {tab === "active" ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTab("archived")}
              className="flex items-center gap-2"
            >
              <Archive className="h-4 w-4" />
              View Archived
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTab("active")}
              className="flex items-center gap-2"
            >
              <ArchiveRestore className="h-4 w-4" />
              Back to Active
            </Button>
          )}
          <Button
            onClick={() => setIsCreateProjectOpen(true)}
            className="gap-1 text-white"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "active" | "archived")}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="active">All Projects</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="flex-1 flex gap-2">
              <div className="relative w-full max-w-xs">
                <Input
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                  disabled={loading}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => {
                  setCategory("");
                  setOwner("");
                  setMinCompletion(0);
                }}
                title="Clear filters"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <select
                className="border rounded px-2 py-1 text-sm bg-background"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <select
                className="border rounded px-2 py-1 text-sm bg-background"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                disabled={loading}
              >
                <option value="">All Owners</option>
                {owners.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <select
                className="border rounded px-2 py-1 text-sm bg-background"
                value={minCompletion}
                onChange={(e) => setMinCompletion(Number(e.target.value))}
                disabled={loading}
              >
                <option value={0}>Any Completion</option>
                <option value={25}>25%+</option>
                <option value={50}>50%+</option>
                <option value={75}>75%+</option>
                <option value={100}>100%</option>
              </select>
            </div>
          </div>
          <Separator className="mb-4" />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
              <span className="text-5xl mb-4">🗂️</span>
              <h2 className="text-xl font-semibold mb-2">No projects found</h2>
              <p className="mb-4">Try adjusting your search or filters.</p>
              <Button onClick={() => setIsCreateProjectOpen(true)}>
                <Plus className="h-4 w-4 mr-1" /> Create Project
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
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
          <ProjectForm
            open={isCreateProjectOpen}
            onOpenChange={setIsCreateProjectOpen}
            onSubmit={handleCreateProject}
            isLoading={isCreatingProject}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
