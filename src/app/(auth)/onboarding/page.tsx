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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/utils";
import { useRef } from "react";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  avatar_url: z.string().url("Please provide a valid image URL").optional(),
});

// Cloudinary config (set these in your .env file)
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";
const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

type CloudinaryResponse = {
  secure_url: string;
};

async function uploadToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response: CloudinaryResponse = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        reject(new Error("Failed to upload image"));
      }
    };
    xhr.onerror = () => reject(new Error("Failed to upload image"));
    xhr.send(formData);
  });
}

export default function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      avatar_url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");
    try {
      const response = await api.post("/users/onboarding", values);
      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        setError("Onboarding failed");
      }
    } catch (err: unknown) {
      // Type guard for Axios-like errors
      function isAxiosError(
        error: unknown
      ): error is { response: { data: { message?: string } } } {
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error
        ) {
          const response = (error as Record<string, unknown>).response;
          return (
            typeof response === "object" &&
            response !== null &&
            "data" in response
          );
        }
        return false;
      }
      if (isAxiosError(err) && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setUploadProgress(0);
      setUploadError(null);
      try {
        const url = await uploadToCloudinary(file, setUploadProgress);
        setAvatarPreview(url);
        form.setValue("avatar_url", url);
      } catch {
        setUploadError("Failed to upload image. Please try again.");
      } finally {
        setUploadProgress(null);
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome! Complete your profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Tell us a bit about yourself to get started
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={
                  avatarPreview ||
                  form.watch("avatar_url") ||
                  "/placeholder-user.jpg"
                }
              />
              <AvatarFallback>
                {form.watch("first_name")?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-2 w-full max-w-xs">
              {uploadProgress !== null && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
              {uploadError && (
                <div className="text-xs text-red-600 mb-2">{uploadError}</div>
              )}
              <label className="text-xs font-medium mb-1">Upload Avatar</label>
              <button
                type="button"
                className="bg-blue-100 text-blue-700 font-semibold rounded-full px-6 py-2 mb-1 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                tabIndex={-1}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full dark:text-white"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Complete Onboarding"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
