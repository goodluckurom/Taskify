"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Marquee } from "@/components/magicui/marquee";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      company: "TechCorp",
      content:
        "Taskify transformed how our team collaborates. The admin controls give me peace of mind while the simple interface keeps my team productive. We've seen a 40% increase in project completion rates since switching.",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      highlight: "40% increase in completion rates",
    },
    {
      name: "Michael Chen",
      role: "Development Lead at DevHub",
      company: "DevHub",
      content:
        "Finally a tool that understands real project dynamics. I can be an admin for my projects while participating in others without confusion. The invitation system is incredibly smooth.",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      highlight: "Seamless project switching",
    },
    {
      name: "Emma Rodriguez",
      role: "Marketing Director at BrandCo",
      company: "BrandCo",
      content:
        "The invitation system and progress tracking saved us countless hours in project coordination. Highly recommended for any team size! Our marketing campaigns are now 60% more efficient.",
      avatar: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      highlight: "60% more efficient campaigns",
    },
    {
      name: "David Kim",
      role: "CTO at StartupXYZ",
      company: "StartupXYZ",
      content:
        "As a startup, we needed something that could scale with us. Taskify's admin controls and analytics have been game-changing. We've grown from 5 to 25 team members seamlessly.",
      avatar: "https://i.pravatar.cc/150?img=14",
      rating: 5,
      highlight: "Scaled from 5 to 25 members",
    },
    {
      name: "Lisa Thompson",
      role: "Project Manager at DesignStudio",
      company: "DesignStudio",
      content:
        "The visual project management and real-time collaboration features are exactly what our creative team needed. We've reduced meeting time by 50% and increased client satisfaction significantly.",
      avatar: "https://i.pravatar.cc/150?img=15",
      rating: 5,
      highlight: "50% reduction in meeting time",
    },
    {
      name: "Alex Rivera",
      role: "Operations Director at GlobalCorp",
      company: "GlobalCorp",
      content:
        "Managing multiple international teams was a nightmare until we found Taskify. The admin controls and progress tracking work perfectly across time zones. Highly recommend for global teams.",
      avatar: "https://i.pravatar.cc/150?img=16",
      rating: 5,
      highlight: "Perfect for global teams",
    },
    {
      name: "Rachel Green",
      role: "Team Lead at InnovateLab",
      company: "InnovateLab",
      content:
        "The real-time updates and notification system keeps everyone in sync. We've eliminated the need for status update meetings entirely. Taskify has revolutionized our workflow.",
      avatar: "https://i.pravatar.cc/150?img=17",
      rating: 5,
      highlight: "Eliminated status meetings",
    },
    {
      name: "James Wilson",
      role: "CEO at GrowthCo",
      company: "GrowthCo",
      content:
        "From startup to scale-up, Taskify has grown with us. The admin controls give me visibility into all projects while empowering my team leads. It's the perfect balance of control and autonomy.",
      avatar: "https://i.pravatar.cc/150?img=18",
      rating: 5,
      highlight: "Perfect control balance",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed" />

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
            ✨ Trusted by Teams Worldwide
          </Badge>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              What Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                Users
              </span>{" "}
              Say
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Join thousands of teams who have streamlined their project
              management and transformed their workflow with Taskify.
            </p>
          </div>
        </motion.div>

        {/* Testimonials Marquee - Direct on Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mx-auto"
        >
          {/* Fade edges for the marquee */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50/70 via-white/50 to-transparent dark:from-gray-900/70 dark:via-gray-800/50 dark:to-transparent z-10 pointer-events-none" />

          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50/70 via-white/50 to-transparent dark:from-gray-900/70 dark:via-gray-800/50 dark:to-transparent z-10 pointer-events-none" />

          {/* Marquee Container */}
          <div className="relative">
            <Marquee
              className="py-8 [--duration:80s]"
              pauseOnHover={true}
              repeat={2}
              reverse={false}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-80 md:w-96 mx-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* Glass effect background for each card */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                      {/* Quote Icon */}
                      <div className="flex justify-center mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                          <Quote className="h-6 w-6" />
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>

                      {/* Highlight Badge */}
                      <div className="flex justify-center mb-4">
                        <Badge
                          variant="secondary"
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 backdrop-blur-sm"
                        >
                          {testimonial.highlight}
                        </Badge>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-sm md:text-base font-medium text-gray-900 dark:text-white leading-relaxed mb-6 text-center">
                        &quot;{testimonial.content}&quot;
                      </blockquote>

                      {/* Author Info */}
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="h-12 w-12 ring-2 ring-blue-100 dark:ring-blue-900/30">
                          <AvatarImage src={testimonial.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
