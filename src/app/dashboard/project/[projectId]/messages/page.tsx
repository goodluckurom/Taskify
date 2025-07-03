"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { PaperclipIcon, Send, Smile } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProjects } from "@/lib/mock-data";

export default function MessagesPage({
  params,
}: {
  params: { projectId: string };
}) {
  const [message, setMessage] = useState("");

  const project = mockProjects.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: "John Doe",
      content:
        "Hey team, I've just pushed the latest design changes to the repository.",
      timestamp: "10:30 AM",
      isCurrentUser: true,
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      content: "Great! I'll review them this afternoon.",
      timestamp: "10:32 AM",
      isCurrentUser: false,
    },
    {
      id: 3,
      sender: "Michael Brown",
      content:
        "I've been working on the responsive navigation. Should be done by EOD.",
      timestamp: "10:45 AM",
      isCurrentUser: false,
    },
    {
      id: 4,
      sender: "John Doe",
      content:
        "Perfect timing. We need to finalize the navigation before moving to the product pages.",
      timestamp: "10:47 AM",
      isCurrentUser: true,
    },
    {
      id: 5,
      sender: "Emily Davis",
      content:
        "I've completed the about page content. Let me know if any revisions are needed.",
      timestamp: "11:15 AM",
      isCurrentUser: false,
    },
  ];

  const channels = [
    { id: "general", name: "General" },
    { id: "design", name: "Design" },
    { id: "development", name: "Development" },
    { id: "marketing", name: "Marketing" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send the message to your backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-none flex flex-col space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Team Chat</h1>
        <Tabs defaultValue="general" className="w-full sm:w-auto">
          <TabsList>
            {channels.map((channel) => (
              <TabsTrigger key={channel.id} value={channel.id}>
                {channel.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-1 overflow-hidden rounded-xl border bg-background">
        <div className="hidden w-64 flex-shrink-0 border-r md:block">
          <div className="p-4">
            <h2 className="mb-2 font-semibold">Team Members</h2>
            <Input placeholder="Search members..." className="mb-4" />
          </div>
          <Separator />
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="p-2">
              {project.members.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
                >
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${
                        member.status === "online"
                          ? "bg-green-500"
                          : "bg-amber-500"
                      } ring-1 ring-background`}
                    ></span>
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="border-b p-4">
            <h2 className="font-semibold">#general</h2>
            <p className="text-sm text-muted-foreground">
              General project discussion
            </p>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <Card
                    className={`max-w-[80%] p-3 ${
                      msg.isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    {!msg.isCurrentUser && (
                      <div className="mb-1 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {msg.sender.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-medium">{msg.sender}</p>
                      </div>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`mt-1 text-right text-xs ${
                        msg.isCurrentUser
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button variant="outline" size="icon" className="rounded-full">
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
