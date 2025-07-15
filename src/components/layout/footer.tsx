"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import Logo from "@/components/logo";
import { Github, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-2xl" />
      </div>

      <div className="container relative px-6 md:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <Logo size="md" variant="default" showText={true} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                The admin-controlled collaborative workspace for efficient
                project management. Transform how your team works together.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </Link>
                <Link
                  href="mailto:support@taskify.com"
                  className="group p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Product
              </h3>
              <nav className="space-y-3">
                <Link
                  href="#features"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  How It Works
                </Link>
                <Link
                  href="#testimonials"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Testimonials
                </Link>
                <Link
                  href="/register"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Get Started
                </Link>
              </nav>
            </motion.div>

            {/* Account Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Account
              </h3>
              <nav className="space-y-3">
                <Link
                  href="/login"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Create Account
                </Link>
                <Link
                  href="/forgot-password"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Reset Password
                </Link>
              </nav>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Support
              </h3>
              <nav className="space-y-3">
                <Link
                  href="mailto:support@taskify.com"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Contact Support
                </Link>
                <Link
                  href="mailto:hello@taskify.com"
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  General Inquiries
                </Link>
              </nav>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} Taskify. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for productive teams.</span>
            </div>

            <div className="flex items-center gap-4">
              <ModeToggle />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
