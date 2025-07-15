"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Mail, Users, CheckCircle, Clock, Star } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Admin Creates Project",
      description:
        "Set up your project with name, description, and deadline. Configure access controls and settings.",
      icon: Plus,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-100 to-blue-200",
      darkBgColor: "from-blue-900/30 to-blue-800/30",
    },
    {
      step: "2",
      title: "Invite Team Members",
      description:
        "Send invitations via email or shareable link. Control who can join and their access level.",
      icon: Mail,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-100 to-green-200",
      darkBgColor: "from-green-900/30 to-green-800/30",
    },
    {
      step: "3",
      title: "Manage Tasks & Track Progress",
      description:
        "Assign tasks directly or let team members claim from the pool. Monitor progress with real-time analytics.",
      icon: CheckCircle,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-100 to-purple-200",
      darkBgColor: "from-purple-900/30 to-purple-800/30",
    },
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Admin",
      email: "alex@example.com",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=10",
      lastActive: "2 min ago",
      tasksCompleted: 12,
    },
    {
      name: "Sarah Miller",
      role: "Member",
      email: "sarah@example.com",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=11",
      lastActive: "5 min ago",
      tasksCompleted: 8,
    },
    {
      name: "Jamie Smith",
      role: "Member",
      email: "jamie@example.com",
      status: "Pending",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastActive: "Invitation sent",
      tasksCompleted: 0,
    },
    {
      name: "Mike Chen",
      role: "Member",
      email: "mike@example.com",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=13",
      lastActive: "1 hour ago",
      tasksCompleted: 15,
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-float-delayed" />

      <div className="container relative px-6 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left side - Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Section Header */}
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium w-fit bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 backdrop-blur-sm"
              >
                🚀 Simple Workflow
              </Badge>

              <div className="space-y-4">
                <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl leading-tight">
                  Get Started in{" "}
                  <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                    Minutes
                  </span>
                </h2>

                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Taskify&apos;s intuitive workflow makes project management
                  effortless and enjoyable.
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Connection line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600" />
                  )}

                  <div className="flex gap-6">
                    {/* Step number and icon */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                      >
                        <item.icon className="h-6 w-6" />
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm">
                        {item.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Enhanced Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Enhanced shadow and glow effects */}
            <div className="absolute -inset-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-3xl" />

            {/* Glass effect container */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              {/* Browser chrome */}
              <div className="flex h-12 items-center space-x-3 border-b bg-gray-100/80 dark:bg-gray-800/80 px-6">
                <div className="h-4 w-4 rounded-full bg-red-500" />
                <div className="h-4 w-4 rounded-full bg-yellow-500" />
                <div className="h-4 w-4 rounded-full bg-green-500" />
                <div className="flex-1" />
                <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-0">
                <div className="flex h-[600px]">
                  {/* Sidebar */}
                  <div className="hidden w-20 border-r bg-gray-100/50 dark:bg-gray-800/50 md:block">
                    <div className="flex h-full flex-col items-center space-y-6 py-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        <Star className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 overflow-auto p-6">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Team Members
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            Manage your project collaborators
                          </p>
                        </div>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                          <Plus className="mr-2 h-4 w-4" />
                          Invite
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          4
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Total Members
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-green-600">
                          3
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Active
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-blue-600">
                          35
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Tasks Done
                        </div>
                      </div>
                    </div>

                    {/* Team members list */}
                    <div className="space-y-4">
                      {teamMembers.map((member, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="group flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-400 hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 ring-2 ring-blue-100 dark:ring-blue-900/30">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {member.name}
                                </p>
                                <Badge
                                  variant={
                                    member.status === "Active"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {member.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {member.role} • {member.email}
                              </p>
                              <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="h-3 w-3" />
                                  {member.lastActive}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <CheckCircle className="h-3 w-3" />
                                  {member.tasksCompleted} tasks
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
