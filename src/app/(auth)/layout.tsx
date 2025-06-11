"use client";
import { cn } from "@/lib/utils";
import {
  Home,
  ClipboardList,
  RefreshCw,
  Users,
  FolderPlus,
  Settings,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const features = [
    {
      icon: <ClipboardList className="h-5 w-5" />,
      title: "Create Tasks",
      description: "Quickly add tasks with deadlines and priorities",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "Update Status",
      description: "Drag and drop to update task progress",
    },
    {
      icon: <FolderPlus className="h-5 w-5" />,
      title: "Manage Projects",
      description: "Organize tasks into projects and categories",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Team Collaboration",
      description: "Add members and assign tasks to your team",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Custom Workflows",
      description: "Configure statuses and fields to match your process",
    },
  ];

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
        "flex flex-col lg:flex-row font-sans antialiased"
      )}
    >
      {/* Left Section – Visual Branding */}
      <div
        className={cn(
          "hidden lg:flex lg:w-1/2 p-8 lg:p-12 flex-col",
          "text-white justify-between relative overflow-hidden",
          "bg-gradient-to-br from-[oklch(0.97_0.014_254.604)] to-[oklch(0.623_0.214_259.815)]",
          "dark:bg-gradient-to-br dark:from-[oklch(0.546_0.245_262.881)] dark:to-[oklch(0.379_0.146_265.522)]"
        )}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:60px_60px] dark:bg-[url('/grid-pattern-dark.svg')]"></div>
        </div>

        {/* Header with logo and controls */}
        <div className="z-10 flex justify-between items-start">
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 text-primary group-hover:text-blue-200 transition-colors dark:text-white"
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
            <span className="text-xl font-semibold group-hover:text-blue-200 transition-colors text-primary dark:text-white">
              Taskify
            </span>
          </Link>
          <div className="flex gap-4">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Home"
            >
              <Home className="h-5 w-5" />
            </Link>
            <ModeToggle />
          </div>
        </div>

        {/* Features List */}
        <div className="z-10 space-y-8 mt-12">
          <h2 className="text-2xl font-bold">
            Everything you need to stay productive
          </h2>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-0.5 p-1 rounded-full bg-white/20">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-blue-100 dark:text-blue-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual elements */}
        <div className="hidden lg:block absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-blue-400 opacity-20 dark:opacity-10"></div>
        <div className="hidden lg:block absolute right-0 top-1/3 w-32 h-32 rounded-full bg-indigo-400 opacity-30 dark:opacity-15"></div>
      </div>

      {/* Right Section – Auth Form */}
      <div
        className={cn(
          "w-full lg:w-1/2 flex items-center justify-center",
          "p-6 sm:p-8 lg:p-12"
        )}
      >
        <div className="relative overflow-hidden group rounded-xl">
          {/* Animated border */}
          <span className="absolute inset-0 z-0 rounded-xl pointer-events-none border-animation" />

          <div
            className={cn(
              "w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-sm",
              "p-8 sm:p-10 transition-all duration-300",
              "hover:shadow-md dark:hover:shadow-md dark:hover:shadow-gray-700/50",
              "border border-gray-100 dark:border-gray-700"
            )}
          >
            {/* Mobile header */}
            <div className="lg:hidden flex justify-between items-center mb-8">
              <Link href="/" className="flex items-center gap-2 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  Taskify
                </span>
              </Link>
              <div className="flex gap-2">
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

            <div className="flex justify-center mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 text-blue-600 dark:text-blue-400"
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
              </div>
            </div>

            {children}

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
