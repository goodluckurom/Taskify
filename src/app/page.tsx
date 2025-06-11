/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Check,
  Users,
  Shield,
  BarChart,
  ListChecks,
  Bell,
  ArrowRight,
  MoveRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-x-hidden ">
      {/* Minimal Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 text-primary dark:text-white"
            >
              <path
                fillRule="evenodd"
                d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xl font-semibold dark:text-primary">
              Taskify
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-foreground/60 hover:text-primary"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="hidden sm:flex text-white">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-12 px-6 md:px-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-medium w-fit"
            >
              Admin-Controlled Workspace
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Project Management{" "}
              <span className="text-primary">Reimagined</span>
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground">
              Taskify gives project owners complete control while enabling
              seamless team collaboration. Create projects, invite members, and
              track progress with precision.
            </p>
            <div className="flex flex-col gap-3 md:flex-row pt-2">
              <Button size="lg" className="w-full sm:w-auto text-white">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See Demo <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -right-4 -top-4 h-72 w-72 rounded-full  blur-3xl  " />
            <div className="relative overflow-hidden rounded-2xl border shadow-2xl">
              <div className="flex h-8 items-center space-x-2 border-b bg-muted px-4">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <div className="bg-background p-0">
                <div className="flex h-[400px]">
                  {/* Mock App Content */}
                  <div className="hidden w-16 border-r bg-muted/50 md:block">
                    <div className="flex h-full flex-col items-center space-y-4 py-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-white mt-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {[Users, ListChecks, BarChart, Bell].map((Icon, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <Icon className="h-5 w-5" />
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold">Website Redesign</h2>
                      <p className="text-muted-foreground">
                        Complete by June 15, 2024
                      </p>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Project Progress
                        </span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Recent Tasks</h3>
                      <div className="space-y-2">
                        {[
                          {
                            title: "Design homepage mockup",
                            status: "In Progress",
                            priority: "High",
                          },
                          {
                            title: "Create content strategy",
                            status: "Not Started",
                            priority: "Medium",
                          },
                          {
                            title: "Set up analytics",
                            status: "Completed",
                            priority: "Low",
                          },
                        ].map((task, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg border p-4 hover:border-primary/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="rounded-full bg-muted p-2">
                                <ListChecks className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{task.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {task.status} • {task.priority} priority
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline">Assigned</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32  bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950"
      >
        <div className="container space-y-12 px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
              Powerful Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need for{" "}
              <span className="text-primary">Effective</span> Project Management
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Taskify provides the perfect balance of administrative oversight
              and team productivity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Admin Controls */}
            <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Admin Controls</CardTitle>
                </div>
                <CardDescription>Complete project oversight</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Create projects with custom settings",
                    "Invite users via email or link",
                    "Bulk task management",
                    "Global view of all activities",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="pl-0">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Task System */}
            <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ListChecks className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Smart Task System</CardTitle>
                </div>
                <CardDescription>Flexible task delegation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Direct assignments or open pool",
                    "Priority levels with visual indicators",
                    "Detailed task status tracking",
                    "Comments and file attachments",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="pl-0">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Analytics */}
            <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Progress Analytics</CardTitle>
                </div>
                <CardDescription>Real-time project insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Auto-calculated completion %",
                    "User contribution metrics",
                    "Deadline tracking with alerts",
                    "Exportable reports in multiple formats",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="pl-0">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-12 px-6 md:px-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm font-medium mb-4"
              >
                Simple Workflow
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get Started in <span className="text-primary">Minutes</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Taskify&apos;s intuitive workflow makes project management
                effortless.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Admin Creates Project",
                  description:
                    "Set up your project with name, description, and deadline. Configure access controls and settings.",
                },
                {
                  step: "2",
                  title: "Invite Team Members",
                  description:
                    "Send invitations via email or shareable link. Control who can join and their access level.",
                },
                {
                  step: "3",
                  title: "Manage Tasks & Track Progress",
                  description:
                    "Assign tasks directly or let team members claim from the pool. Monitor progress with real-time analytics.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10  items-center justify-center rounded-full bg-primary text-primary-foreground font-medium dark:text-white ">
                      {item.step}
                    </div>
                    {i < 2 && <div className="h-full w-px bg-border mt-2" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground mt-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -right-4 -top-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
            <div className="relative overflow-hidden rounded-2xl border shadow-xl">
              <div className="flex h-8 items-center space-x-2 border-b bg-muted px-4">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <div className="bg-background p-0">
                <div className="flex h-[400px]">
                  {/* Mock Team Management Content */}
                  <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Team Members</h2>
                      <Button size="sm" className="dark:text-white">
                        Invite
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Alex Johnson",
                          role: "Admin",
                          email: "alex@example.com",
                          status: "Active",
                        },
                        {
                          name: "Sarah Miller",
                          role: "Member",
                          email: "sarah@example.com",
                          status: "Active",
                        },
                        {
                          name: "Jamie Smith",
                          role: "Member",
                          email: "jamie@example.com",
                          status: "Pending",
                        },
                      ].map((member, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border p-4 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage
                                src={`https://i.pravatar.cc/150?img=${i + 10}`}
                              />
                              <AvatarFallback>
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {member.role} • {member.email}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              member.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {member.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950"
      >
        <div className="container space-y-12 px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
              Trusted by Teams
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our <span className="text-primary">Users</span> Say
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Join thousands of teams who have streamlined their project
              management with Taskify.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Product Manager at TechCorp",
                content:
                  "Taskify transformed how our team collaborates. The admin controls give me peace of mind while the simple interface keeps my team productive.",
                avatar: "https://i.pravatar.cc/150?img=11",
              },
              {
                name: "Michael Chen",
                role: "Development Lead at DevHub",
                content:
                  "Finally a tool that understands real project dynamics. I can be an admin for my projects while participating in others without confusion.",
                avatar: "https://i.pravatar.cc/150?img=12",
              },
              {
                name: "Emma Rodriguez",
                role: "Marketing Director at BrandCo",
                content:
                  "The invitation system and progress tracking saved us countless hours in project coordination. Highly recommended for any team size!",
                avatar: "https://i.pravatar.cc/150?img=13",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center justify-center gap-6 px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to <span className="text-primary">Transform</span> Your
              Workflow?
            </h2>
            <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
              Join thousands of teams who have improved their productivity with
              Taskify.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-md space-y-2"
          >
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                className="flex-1 border border-primary"
                placeholder="Enter your email"
                type="email"
              />
              <Button type="submit" size="lg" className="text-white">
                Get Started Free
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-950">
        <div className="container grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4 md:px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-primary dark:text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              <span className="font-bold dark:text-primary">Taskify</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The admin-controlled collaborative workspace for efficient project
              management.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Integrations", "Updates", "Roadmap"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Security"],
            },
          ].map((section, i) => (
            <div key={i} className="space-y-2 flex flex-col ">
              <h3 className="font-semibold">{section.title}</h3>
              <nav className="space-y-2 flex flex-col">
                {section.links.map((link, j) => (
                  <a
                    key={j}
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="border-t">
          <div className="container flex flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:px-8 ">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Taskify. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <ModeToggle />
              {["Twitter", "LinkedIn", "GitHub"].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Progress({ value, className, ...props }: any) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}

function Avatar({ className, ...props }: any) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: any) {
  return (
    <img className={cn("aspect-square h-full w-full", className)} {...props} />
  );
}

function AvatarFallback({ className, ...props }: any) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
