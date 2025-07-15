"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Zap,
  Shield,
  Users,
  CheckCircle,
  Sparkles,
  Rocket,
} from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Redirect to register page with email in URL params
      router.push(`/register?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description: "Get started in under 2 minutes",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption & compliance",
    },
    {
      icon: Users,
      title: "Unlimited Team Members",
      description: "Scale from 1 to 1000+ users",
    },
    {
      icon: CheckCircle,
      title: "No Credit Card Required",
      description: "Start free, upgrade when ready",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />

      <div className="container relative px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 mb-12 lg:mb-16"
          >
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium w-fit mx-auto bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 backdrop-blur-sm"
            >
              🚀 Ready to Transform Your Workflow?
            </Badge>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Start Your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
                  Productivity
                </span>{" "}
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent drop-shadow-lg">
                  Revolution
                </span>
              </h2>

              <p className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Join{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  10,000+ teams
                </span>{" "}
                who have already transformed their project management with
                Taskify.
              </p>
            </div>
          </motion.div>

          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-16"
          >
            <div className="relative max-w-[700px] mx-auto">
              {/* Glass effect background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg" />
              <div className="relative p-1 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <div className="flex-1 relative">
                    <Input
                      type="email"
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-4 py-3"
                      disabled={isLoading}
                    />
                    <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 opacity-50" />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-3 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Getting Started...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Get Started Free
                        <Rocket className="h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </div>

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Trust indicators */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ✨ No credit card required • 🛡️ 256-bit encryption • ⚡
                  2-minute setup
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Glass effect background */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 lg:mt-16"
          >
            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Trusted by teams at
              </p>
              <div className="flex items-center justify-center gap-8 opacity-60">
                {[
                  "TechCorp",
                  "DevHub",
                  "BrandCo",
                  "StartupXYZ",
                  "GlobalCorp",
                ].map((company, index) => (
                  <div
                    key={index}
                    className="text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
