"use client";

import { notFound } from "next/navigation";
import type React from "react";

import { MobileProjectNavigation } from "@/components/dashboard/mobile-project-navigation";
import { ProjectHeader } from "@/components/layout/project-header";
import { ProjectSidebar } from "@/components/layout/project-sidebar";
import { mockProjects, Project } from "@/lib/mock-data";
import { ProjectProvider, useProject } from "@/context/project-context";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) {
  const project = mockProjects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <ProjectProvider>
      <InnerLayout projectId={params.projectId} project={project}>
        {children}
      </InnerLayout>
    </ProjectProvider>
  );
}

function InnerLayout({
  children,
  projectId,
  project,
}: {
  children: React.ReactNode;
  projectId: string;
  project: Project;
}) {
  const { projectSidebarCollapsed } = useProject();

  // Calculate the margin-left for header and main area
  const sidebarMargin = projectSidebarCollapsed ? "ml-20" : "ml-64";

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Header */}
      <div className="hidden lg:block">
        <ProjectHeader
          project={project}
          className={`transition-all duration-300 ease-in-out ${sidebarMargin}`}
        />
      </div>
      <div className="lg:hidden">
        <ProjectHeader project={project} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ProjectSidebar projectId={projectId} />

        {/* Main */}
        <main
          className={`flex-1 overflow-y-auto bg-muted/30 p-4 pb-24 sm:p-6 sm:pb-24 md:pb-24 lg:pb-6 lg:p-8 transition-all duration-300 ease-in-out lg:${sidebarMargin} pt-16`}
        >
          {children}
        </main>
      </div>

      {/* Mobile Navigation - shown on mobile and tablet */}
      <MobileProjectNavigation
        className="fixed bottom-0 left-0 z-50 w-full lg:hidden"
        projectId={projectId}
      />
    </div>
  );
}
