"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Search,
  ArrowLeft,
  FileX,
  ListTodo,
  Calendar,
  Users,
} from "lucide-react";
import Logo from "@/components/logo";

export default function NotFound() {
  // Mock auth state - replace with real auth later
  const isAuthenticated = false; // TODO: Replace with real auth state

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Task Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce animation-delay-1000">
          <ListTodo className="w-8 h-8 text-blue-400/30" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce animation-delay-2000">
          <Calendar className="w-6 h-6 text-purple-400/30" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce animation-delay-3000">
          <Users className="w-7 h-7 text-pink-400/30" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce animation-delay-1000">
          <Search className="w-5 h-5 text-blue-400/30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-0 shadow-2xl">
          <CardContent className="p-8 text-center space-y-6">
            {/* Logo and Icon */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <FileX className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">404</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Logo className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Taskify
                </span>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Task Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Oops! It looks like this task has been moved, deleted, or never
                existed. Don&apos;t worry, we&apos;ll help you get back on
                track.
              </p>
            </div>

            {/* Action Buttons - Conditional based on auth state */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {isAuthenticated ? (
                <>
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                  >
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Go to Dashboard
                    </Link>
                  </Button>

                  <Button variant="outline" asChild className="flex-1">
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Go Back
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                  >
                    <Link href="/" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Go to Homepage
                    </Link>
                  </Button>

                  <Button variant="outline" asChild className="flex-1">
                    <Link href="/" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Go Back
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Helpful Links - Conditional based on auth state */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {isAuthenticated
                  ? "Looking for something specific?"
                  : "Want to explore more?"}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard" className="text-xs">
                        My Projects
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard" className="text-xs">
                        Recent Tasks
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard" className="text-xs">
                        Team Members
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/login" className="text-xs">
                        Sign In
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/register" className="text-xs">
                        Sign Up
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/" className="text-xs">
                        About
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
