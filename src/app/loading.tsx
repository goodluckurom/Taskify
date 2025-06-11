"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <MotionDiv
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="h-12 w-12 text-primary" />
      </MotionDiv>
    </div>
  );
}
