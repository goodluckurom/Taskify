/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// Cooldown periods in milliseconds
const COOLDOWN_PERIODS = [
  1 * 60 * 1000, // 1 minute
  3 * 60 * 1000, // 3 minutes
  5 * 60 * 1000, // 5 minutes
  60 * 60 * 1000, // 1 hour
];

export default function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const urlEmail = searchParams.get("email") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [cooldownLevel, setCooldownLevel] = useState(0);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: urlEmail,
      otp: "",
    },
  });

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => Math.max(0, prev - 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/verify/confirm", values);
      if (res.status === 200) {
        setSuccess("Email verified successfully! Redirecting...");
        router.push("/login");
      } else {
        setError(res.data.message || "Failed to verify email");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during verification"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function resendOtp() {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!form.getValues("email")) {
        setError("Email is required");
        setIsLoading(false);
        return;
      }
      const response = await api.post("/verify/resend", {
        email: form.getValues("email"),
      });
      if (response.status === 200) {
        setSuccess("New OTP sent to your email!");

        // Set cooldown based on current level
        const newCooldownLevel = Math.min(
          cooldownLevel + 1,
          COOLDOWN_PERIODS.length - 1
        );
        setCooldown(COOLDOWN_PERIODS[newCooldownLevel]);
        setCooldownLevel(newCooldownLevel);
      } else {
        setError(response.data.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred while resending OTP"
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Format time for display (MM:SS)
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full max-w-md mx-auto"
    >
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify your email
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit OTP sent to your email
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 text-sm text-red-600 bg-red-50 rounded-md"
        >
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 text-sm text-green-600 bg-green-50 rounded-md"
        >
          {success}
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your@email.com"
                    {...field}
                    readOnly={!!urlEmail}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12" />
                      <InputOTPSlot index={1} className="w-10" />
                      <InputOTPSlot index={2} className="w-10" />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} className="w-10" />
                      <InputOTPSlot index={4} className="w-10" />
                      <InputOTPSlot index={5} className="w-12" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify OTP
          </Button>
        </form>
      </Form>

      <motion.div
        className="text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {cooldown > 0 ? (
          <div>You can request a new OTP in {formatTime(cooldown)}</div>
        ) : (
          <>
            Didn&apos;t receive the OTP?{" "}
            <button
              onClick={resendOtp}
              disabled={isLoading}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Resend OTP
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
