"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import {
  Calendar,
  File,
  FileText,
  Filter,
  FolderOpen,
  ImageIcon,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProjects } from "@/lib/mock-data";

export default function FilesPage({
  params,
}: {
  params: { projectId: string };
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const project = mockProjects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  // Mock files data
  const files = [
    {
      id: "file-1",
      name: "Project Requirements.docx",
      type: "document",
      size: "245 KB",
      modified: "2 days ago",
      owner: "John Doe",
    },
    {
      id: "file-2",
      name: "Design Mockups.fig",
      type: "design",
      size: "4.2 MB",
      modified: "1 week ago",
      owner: "Sarah Johnson",
    },
    {
      id: "file-3",
      name: "Homepage Screenshot.png",
      type: "image",
      size: "1.8 MB",
      modified: "3 days ago",
      owner: "Michael Brown",
    },
    {
      id: "file-4",
      name: "User Flow Diagram.pdf",
      type: "document",
      size: "3.1 MB",
      modified: "5 days ago",
      owner: "Emily Davis",
    },
    {
      id: "file-5",
      name: "Meeting Notes.txt",
      type: "document",
      size: "12 KB",
      modified: "Yesterday",
      owner: "John Doe",
    },
    {
      id: "file-6",
      name: "Logo Assets.zip",
      type: "archive",
      size: "8.7 MB",
      modified: "1 week ago",
      owner: "Sarah Johnson",
    },
  ];

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "image":
        return <ImageIcon className="h-6 w-6 text-green-500" />;
      case "design":
        return <File className="h-6 w-6 text-purple-500" />;
      case "archive":
        return <FolderOpen className="h-6 w-6 text-amber-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Files</h1>
        <Button size="sm" className="gap-1 sm:self-start">
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">
            All Files
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex-1 sm:flex-none">
            Recent
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex-1 sm:flex-none">
            Shared
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card className="overflow-hidden">
            <ScrollArea className="h-[calc(100vh-20rem)] md:h-[calc(100vh-16rem)]">
              <div className="grid grid-cols-1 divide-y">
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {file.modified}
                            </span>
                            <span>•</span>
                            <span>{file.owner}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">No files found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchQuery
                        ? "We couldn't find any files matching your search."
                        : "Upload files to get started."}
                    </p>
                    {searchQuery && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setSearchQuery("")}
                      >
                        Clear search
                      </Button>
                    )}
                    {!searchQuery && (
                      <Button className="mt-4 gap-1">
                        <Upload className="h-4 w-4" />
                        Upload Files
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          <Card className="overflow-hidden">
            <ScrollArea className="h-[calc(100vh-20rem)] md:h-[calc(100vh-16rem)]">
              <div className="grid grid-cols-1 divide-y">
                {filteredFiles.slice(0, 3).map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {file.modified}
                          </span>
                          <span>•</span>
                          <span>{file.owner}</span>
                        </div>
                      </div>
                    </div>
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
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
        <TabsContent value="shared" className="mt-4">
          <Card className="overflow-hidden">
            <ScrollArea className="h-[calc(100vh-20rem)] md:h-[calc(100vh-16rem)]">
              <div className="grid grid-cols-1 divide-y">
                {filteredFiles.slice(2, 5).map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {file.modified}
                          </span>
                          <span>•</span>
                          <span>{file.owner}</span>
                        </div>
                      </div>
                    </div>
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
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
