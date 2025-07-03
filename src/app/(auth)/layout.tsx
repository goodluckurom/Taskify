"use client";
import { cn } from "@/lib/utils";
import { Home, CheckCircle, Star } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
        "flex flex-col lg:flex-row font-sans antialiased"
      )}
    >
      {/* Left Section – Enhanced Visual Branding */}
      <div
        className={cn(
          "hidden lg:flex lg:w-1/2 p-8 lg:p-12 flex-col",
          "text-white justify-between relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
        )}
      >
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

        {/* Header with logo and controls */}
        <div className="z-10 flex justify-between items-start">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-transform"
              >
                <path
                  fillRule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.50C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 group-hover:text-blue-400 transition-colors">
                Taskify
              </span>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {/*  */}
          </Link>
          <div className="flex gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
              title="Home"
            >
              <Home className="h-5 w-5 text-blue-400" />
            </Link>
            <div className="backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center h-10 w-20">
              <ModeToggle />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="z-10 space-y-10 mt-8">
          {/* Hero section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Star className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium text-gray-800 dark:text-blue-100">
                  Trusted by 10,000+ teams
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                Everything you need to
                <span className="block bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-200 dark:to-white">
                  stay productive
                </span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-blue-200 leading-relaxed max-w-md">
                Transform your workflow with our intuitive task management
                platform designed for modern teams.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-blue-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features List */}
          {/* <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"></div>
              <span className="text-sm font-medium text-blue-100 dark:text-blue-200">
                Key Features
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"></div>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-transparent hover:border-white/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mt-1 p-2.5 rounded-xl bg-white/15 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-100 transition-colors">
                        {feature.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-400/20 text-blue-700 dark:text-blue-100 font-medium">
                        {feature.highlight}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-blue-200 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-400 dark:text-blue-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Bottom CTA section */}
        <div className="z-10 space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-blue-400/40 bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md">
            <CheckCircle className="h-6 w-6 text-green-400 dark:text-green-300" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Ready to get started?
              </p>
              <p className="text-sm text-gray-700 dark:text-blue-200">
                Join thousands of productive teams today
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced visual elements */}
        <div className="absolute -right-32 -bottom-32 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl animate-pulse"></div>
        <div className="absolute right-8 top-1/3 w-40 h-40 rounded-full bg-gradient-to-r from-indigo-400/30 to-pink-400/30 blur-2xl animate-float"></div>
        <div className="absolute left-8 bottom-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400/40 to-blue-400/40 blur-xl animate-float-delayed"></div>
      </div>

      {/* Right Section – Auth Form (unchanged) */}
      <div
        className={cn(
          "w-full lg:w-1/2 flex items-center justify-center relative min-h-screen min-h-[100dvh]",
          "p-6 sm:p-8 lg:p-12"
        )}
      >
        {/* Animated floating accent blob */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/20 blur-3xl animate-pulse" />
        <div className="relative overflow-hidden group rounded-2xl shadow-2xl backdrop-blur-xl border border-blue-100/40 dark:border-blue-900/40 flex flex-col items-center justify-center mx-auto">
          {/* Animated border */}
          <span className="absolute inset-0 z-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-blue-400/60 transition-all duration-500 animate-border-glow" />

          <div
            className={cn(
              "w-full max-w-md bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg",
              "p-8 sm:p-10 transition-all duration-300",
              "hover:shadow-2xl dark:hover:shadow-blue-900/30",
              "border border-gray-100/60 dark:border-gray-700/60 backdrop-blur-xl"
            )}
          >
            {/* Mobile header */}
            <div className="lg:hidden flex flex-col items-center mb-8 gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-transform"
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
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-300 group-hover:text-blue-400 transition-colors">
                  Taskify
                </span>
              </Link>
              <span className="text-base text-blue-500 dark:text-blue-200 font-medium tracking-wide">
                Your productivity, supercharged
              </span>
              <div className="flex gap-2 mt-2">
                <ModeToggle />
                <Link
                  href="/"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Home"
                >
                  <Home className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Link>
              </div>
            </div>

            {/* Desktop logo and tagline */}
            <div className="hidden lg:flex flex-col items-center mb-8 gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-10 w-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-transform"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.50C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 group-hover:text-blue-400 transition-colors">
                  Taskify
                </span>
              </Link>
              <span className="text-lg text-blue-500 dark:text-blue-200 font-medium tracking-wide">
                Your productivity, supercharged
              </span>
            </div>

            {/* Auth form content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
