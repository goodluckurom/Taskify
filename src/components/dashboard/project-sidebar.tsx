"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, FileText, Home, ListTodo, MessageSquare, Settings, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function ProjectSidebar({ projectId }: { projectId: string }) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <Sidebar variant="floating" collapsible="icon" className="hidden w-64 border-r md:flex">
      <SidebarContent className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`/dashboard/project/${projectId}`)}>
              <Link href={`/dashboard/project/${projectId}`}>
                <Home className="h-4 w-4" />
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`/dashboard/project/${projectId}/tasks`)}>
              <Link href={`/dashboard/project/${projectId}/tasks`}>
                <ListTodo className="h-4 w-4" />
                <span>Tasks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`/dashboard/project/${projectId}/calendar`)}>
              <Link href={`/dashboard/project/${projectId}/calendar`}>
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`/dashboard/project/${projectId}/users`)}>
              <Link href={`/dashboard/project/${projectId}/users`}>
                <Users className="h-4 w-4" />
                <span>Team</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`/dashboard/project/${projectId}/messages`)}>
              <Link href={`/dashboard/project/${projectId}/messages`}>
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`/dashboard/project/${projectId}/files`)}>
              <Link href={`/dashboard/project/${projectId}/files`}>
                <FileText className="h-4 w-4" />
                <span>Files</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`/dashboard/project/${projectId}/analytics`)}>
              <Link href={`/dashboard/project/${projectId}/analytics`}>
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`/dashboard/project/${projectId}/settings`)}>
              <Link href={`/dashboard/project/${projectId}/settings`}>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
