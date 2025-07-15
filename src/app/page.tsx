/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Check,
  Users,
  Shield,
  BarChart,
  ListChecks,
  Bell,
  ArrowRight,
  MoveRight,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import LandingHeader from "@/components/layout/landing-header";
import Logo from "@/components/logo";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import CTASection from "@/components/sections/cta-section";
import Footer from "@/components/layout/footer";
import { SparklesText } from "@/components/magicui/sparkles-text";

export default function LandingPage() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-x-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-indigo-400/40 to-pink-400/40 blur-2xl animate-float-delayed"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:60px_60px] dark:bg-[url('/grid-pattern-dark.svg')]"></div>
        </div>
      </div>

      {/* Modern Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="container relative px-6 md:px-8">
          {/* Text Content - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-16 lg:mb-24"
          >
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium w-fit mx-auto bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 backdrop-blur-sm"
            >
              ✨ Admin-Controlled Workspace
            </Badge>

            <div className="space-y-8">
              <h1 className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
                  Project Management
                </span>
                <br />
                <SparklesText className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent drop-shadow-lg">
                  Reimagined
                </SparklesText>
              </h1>

              <p className="max-w-4xl mx-auto text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-light">
                Taskify gives project owners complete control while enabling
                seamless team collaboration. Create projects, invite members,
                and track progress with precision.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row justify-center pt-8">
              {user ? (
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
                  onClick={() => router.push("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
                    onClick={() => router.push("/register")}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 transition-all duration-300 text-lg px-8 py-6"
                  >
                    See Demo <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>

          {/* Dashboard Display - Larger and Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-6xl mx-auto"
          >
            {/* Enhanced shadow and glow effects */}
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />

            {/* Glass effect container */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              {/* Browser chrome */}
              <div className="flex h-12 items-center space-x-3 border-b bg-gray-100/80 dark:bg-gray-800/80 px-6">
                <div className="h-4 w-4 rounded-full bg-red-500" />
                <div className="h-4 w-4 rounded-full bg-yellow-500" />
                <div className="h-4 w-4 rounded-full bg-green-500" />
                <div className="flex-1" />
                <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-0">
                <div className="flex h-[700px] lg:h-[800px]">
                  {/* Sidebar */}
                  <div className="hidden w-24 border-r bg-gray-100/50 dark:bg-gray-800/50 md:block">
                    <div className="flex h-full flex-col items-center space-y-8 py-8">
                      {/* Logo */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                        <Logo size="sm" variant="white" />
                      </div>

                      {/* Navigation icons */}
                      {[
                        { icon: Users, active: true },
                        { icon: ListChecks, active: false },
                        { icon: BarChart, active: false },
                        { icon: Bell, active: false },
                      ].map(({ icon: Icon, active }, i) => (
                        <button
                          key={i}
                          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                            active
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-lg"
                              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 overflow-auto p-8">
                    {/* Header */}
                    <div className="mb-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Projects
                          </h2>
                          <p className="text-lg text-gray-600 dark:text-gray-400">
                            Manage and collaborate on your active projects
                          </p>
                        </div>
                        <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                          <Plus className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    {/* Project cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Project Card 1 */}
                      <div className="group h-[280px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:scale-105">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-lg font-semibold shadow-lg">
                            🎨
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-sm font-medium text-blue-600 shadow-sm">
                                J
                              </div>
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-100 text-sm font-medium text-green-600 shadow-sm">
                                S
                              </div>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          Website Redesign
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                          Complete redesign of company website with modern UI/UX
                          and improved user experience
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Progress</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              75%
                            </span>
                          </div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-sm"
                              style={{ width: "75%" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Project Card 2 */}
                      <div className="group h-[280px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:scale-105">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white text-lg font-semibold shadow-lg">
                            📱
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-purple-100 text-sm font-medium text-purple-600 shadow-sm">
                                M
                              </div>
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-orange-100 text-sm font-medium text-orange-600 shadow-sm">
                                A
                              </div>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          Mobile App
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                          iOS and Android app development for task management
                          with offline capabilities
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Progress</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              45%
                            </span>
                          </div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-sm"
                              style={{ width: "45%" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Project Card 3 */}
                      <div className="group h-[280px] rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:scale-105">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white text-lg font-semibold shadow-lg">
                            🚀
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-pink-100 text-sm font-medium text-pink-600 shadow-sm">
                                L
                              </div>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          Marketing Campaign
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                          Q4 marketing campaign with social media integration
                          and analytics tracking
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Progress</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              90%
                            </span>
                          </div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"
                              style={{ width: "90%" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Create New Project Card */}
                      <div className="group h-[280px] rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/30 p-6 shadow-lg transition-all hover:border-blue-400 hover:shadow-xl hover:scale-105 cursor-pointer">
                        <div className="flex h-full flex-col items-center justify-center text-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-6 shadow-lg">
                            <Plus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Create New Project
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Start a new project from scratch and bring your
                            ideas to life
                          </p>
                        </div>
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
        className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden"
      >
        {/* Background with glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-float-delayed" />

        <div className="container relative px-6 md:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8 mb-16 lg:mb-24"
          >
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium w-fit mx-auto bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 backdrop-blur-sm"
            >
              ✨ Powerful Features
            </Badge>

            <div className="space-y-6">
              <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl leading-tight">
                Everything You Need for{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
                  Effective
                </span>{" "}
                Project Management
              </h2>

              <p className="max-w-4xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                Taskify provides the perfect balance of administrative oversight
                and team productivity with modern, intuitive features.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Admin Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Glass effect background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 p-8">
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Shield className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Admin Controls
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Complete project oversight with powerful administrative
                      tools
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4">
                    {[
                      "Create projects with custom settings",
                      "Invite users via email or link",
                      "Bulk task management",
                      "Global view of all activities",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button
                      variant="ghost"
                      className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors p-0 h-auto"
                    >
                      Learn more{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Task System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Glass effect background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 p-8">
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <ListChecks className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Smart Task System
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Flexible task delegation with intelligent workflow
                      management
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4">
                    {[
                      "Direct assignments or open pool",
                      "Priority levels with visual indicators",
                      "Detailed task status tracking",
                      "Comments and file attachments",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button
                      variant="ghost"
                      className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors p-0 h-auto"
                    >
                      Learn more{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Glass effect background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 p-8">
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <BarChart className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Progress Analytics
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Real-time project insights with comprehensive reporting
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4">
                    {[
                      "Auto-calculated completion %",
                      "User contribution metrics",
                      "Deadline tracking with alerts",
                      "Exportable reports in multiple formats",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button
                      variant="ghost"
                      className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors p-0 h-auto"
                    >
                      Learn more{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
