"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Globe,
  Lock,
  Moon,
  Palette,
  Save,
  Sun,
  User,
  Loader2,
  Edit3,
  X,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Form schemas
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must contain at least one special character"
      )
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const SettingsSkeleton = () => (
  <div className="container py-6 md:py-8 lg:py-12">
    <div className="animate-pulse">
      <div className="h-8 w-40 bg-muted rounded-lg mb-2" />
      <div className="h-4 w-64 bg-muted rounded-lg" />
    </div>
    <div className="mt-8 flex flex-col md:flex-row md:space-x-8">
      <div className="md:w-1/4 space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-full bg-muted rounded-lg" />
        ))}
      </div>
      <div className="flex-1 space-y-6">
        <div className="animate-pulse">
          <div className="h-6 w-32 bg-muted rounded-lg mb-3" />
          <div className="h-4 w-48 bg-muted rounded-lg mb-6" />
          <div className="flex items-center space-x-6">
            <div className="h-28 w-28 rounded-full bg-muted" />
            <div className="space-y-3">
              <div className="h-9 w-36 bg-muted rounded-lg" />
              <div className="h-9 w-28 bg-muted rounded-lg" />
            </div>
          </div>
          <div className="h-px bg-muted my-6" />
          <div className="grid gap-6 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-11 bg-muted rounded-lg" />
            ))}
            <div className="h-32 bg-muted rounded-lg sm:col-span-2" />
          </div>
          <div className="h-11 w-36 bg-muted rounded-lg mt-6 ml-auto" />
        </div>
      </div>
    </div>
  </div>
);

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState({
    profile: false,
    account: false,
    appearance: false,
    notifications: false,
  });
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      bio: "Project manager with 5+ years of experience in web development and design.",
      timezone: "UTC",
      language: "en",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleProfileSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/settings/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully");
      setEditMode((prev) => ({ ...prev, profile: false }));
    } catch (error) {
      toast.error("Failed to update profile", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (data: PasswordFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/settings/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      toast.success("Password changed successfully");
      setShowPasswordDialog(false);
      passwordForm.reset();
    } catch (error) {
      toast.error("Failed to change password", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Account deleted successfully");
      setShowDeleteDialog(false);
      // Redirect or perform other actions after deletion
    } catch (error) {
      toast.error("Failed to delete account", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="container py-8">
      <div className="mb-20">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Account Settings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account preferences and personal information
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        className=""
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
          <div className="md:w-1/4">
            {/* Vertical sidebar for md and up */}
            <div className="hidden md:flex w-full flex-col gap-1 bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
              {[
                {
                  value: "profile",
                  icon: <User className="h-4 w-4" />,
                  title: "Profile",
                  subtitle: "Personal information",
                },
                {
                  value: "account",
                  icon: <Lock className="h-4 w-4" />,
                  title: "Account",
                  subtitle: "Password & security",
                },
                {
                  value: "appearance",
                  icon: <Palette className="h-4 w-4" />,
                  title: "Appearance",
                  subtitle: "Theme & language",
                },
                {
                  value: "notifications",
                  icon: <Bell className="h-4 w-4" />,
                  title: "Notifications",
                  subtitle: "Alerts & preferences",
                },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)} // You'll need to handle this state
                  className={`
          flex items-center gap-3 w-full px-3 py-2 rounded-md text-left
          transition-colors duration-200
          ${
            activeTab === tab.value
              ? "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
          }
        `}
                >
                  {tab.icon}
                  <div>
                    <div className="font-medium text-sm">{tab.title}</div>
                    <div className="text-xs opacity-80">{tab.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Horizontal tabs for small screens */}
            <TabsList className="flex md:hidden w-full flex-row gap-2 overflow-x-auto p-0 no-scrollbar bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
              {[
                {
                  value: "profile",
                  icon: <User className="h-5 w-5" />,
                  label: "Profile",
                },
                {
                  value: "account",
                  icon: <Lock className="h-5 w-5" />,
                  label: "Account",
                },
                {
                  value: "appearance",
                  icon: <Palette className="h-5 w-5" />,
                  label: "Appearance",
                },
                {
                  value: "notifications",
                  icon: <Bell className="h-5 w-5" />,
                  label: "Notifications",
                },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="
                            flex flex-col items-center justify-center px-2 py-2 rounded-lg
                            data-[state=active]:bg-muted data-[state=active]:shadow-sm
                      "
                >
                  {tab.icon}
                  <span className="sr-only">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-1 space-y-6">
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)}>
                  <Card className="overflow-hidden">
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl">Profile</CardTitle>
                          <CardDescription>
                            Manage your public profile information
                          </CardDescription>
                        </div>
                        {!editMode.profile ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="ml-auto"
                            onClick={() =>
                              setEditMode((prev) => ({
                                ...prev,
                                profile: true,
                              }))
                            }
                            disabled={isSubmitting}
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Button>
                        ) : (
                          <div className="space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditMode((prev) => ({
                                  ...prev,
                                  profile: false,
                                }));
                                profileForm.reset();
                              }}
                              disabled={isSubmitting}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              size="sm"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4 mr-2" />
                              )}
                              Save Changes
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="flex flex-col items-center space-y-6 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
                        <div className="relative group">
                          <Avatar className="h-28 w-28">
                            <AvatarImage src="/placeholder.svg?height=112&width=112" />
                            <AvatarFallback className="text-2xl font-medium">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          {editMode.profile && (
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20"
                                type="button"
                              >
                                <ImageIcon className="h-5 w-5" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col space-y-3">
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            disabled={!editMode.profile || isSubmitting}
                          >
                            Upload new photo
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                            type="button"
                            disabled={!editMode.profile || isSubmitting}
                          >
                            Remove photo
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPG, GIF or PNG. Max size of 2MB. Recommended
                            dimensions: 256x256.
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          control={profileForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={!editMode.profile || isSubmitting}
                                  className="bg-background"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={!editMode.profile || isSubmitting}
                                  className="bg-background"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={!editMode.profile || isSubmitting}
                                  className="bg-background"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="min-h-[120px] bg-background"
                                  disabled={!editMode.profile || isSubmitting}
                                />
                              </FormControl>
                              <FormDescription>
                                Brief description for your profile.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </Form>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="border-b">
                  <CardTitle className="text-2xl">Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Username</h3>
                        <p className="text-sm text-muted-foreground">
                          Your unique username for the platform
                        </p>
                      </div>
                      <Input
                        defaultValue="johndoe"
                        disabled
                        className="w-48 bg-background"
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-muted-foreground">
                          Last changed 3 months ago
                        </p>
                      </div>
                      <Dialog
                        open={showPasswordDialog}
                        onOpenChange={setShowPasswordDialog}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Change Password
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <Form {...passwordForm}>
                            <form
                              onSubmit={passwordForm.handleSubmit(
                                handlePasswordSubmit
                              )}
                            >
                              <DialogHeader>
                                <DialogTitle className="text-2xl">
                                  Change Password
                                </DialogTitle>
                                <DialogDescription>
                                  Enter your current password and set a new one.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <FormField
                                  control={passwordForm.control}
                                  name="currentPassword"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Current Password</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="password"
                                          disabled={isSubmitting}
                                          className="bg-background"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={passwordForm.control}
                                  name="newPassword"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>New Password</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="password"
                                          disabled={isSubmitting}
                                          className="bg-background"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={passwordForm.control}
                                  name="confirmPassword"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Confirm Password</FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="password"
                                          disabled={isSubmitting}
                                          className="bg-background"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <DialogFooter>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setShowPasswordDialog(false)}
                                  disabled={isSubmitting}
                                >
                                  Cancel
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                  {isSubmitting ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  ) : (
                                    <Save className="h-4 w-4 mr-2" />
                                  )}
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive overflow-hidden">
                <CardHeader className="border-b border-destructive">
                  <CardTitle className="text-2xl text-destructive">
                    Delete Account
                  </CardTitle>
                  <CardDescription>
                    Permanently delete your account and all associated data
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, there is no going back. All
                      your data will be permanently removed from our servers.
                    </p>
                    <AlertDialog
                      open={showDeleteDialog}
                      onOpenChange={setShowDeleteDialog}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="w-full sm:w-auto"
                        >
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-2xl">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove all data from our
                            servers including projects, tasks, and personal
                            information.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel disabled={isSubmitting}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            disabled={isSubmitting}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            {isSubmitting ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : null}
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="border-b">
                  <CardTitle className="text-2xl">Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Theme</h3>
                          <p className="text-sm text-muted-foreground">
                            Select a theme preference for the dashboard
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className={`h-10 w-10 ${
                              theme === "light"
                                ? "border-primary bg-primary/10"
                                : ""
                            }`}
                            onClick={() => setTheme("light")}
                          >
                            <Sun className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className={`h-10 w-10 ${
                              theme === "dark"
                                ? "border-primary bg-primary/10"
                                : ""
                            }`}
                            onClick={() => setTheme("dark")}
                          >
                            <Moon className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className={`h-10 w-10 ${
                              theme === "system"
                                ? "border-primary bg-primary/10"
                                : ""
                            }`}
                            onClick={() => setTheme("system")}
                          >
                            <Globe className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <h3 className="font-medium">Language</h3>
                      <Select defaultValue="en">
                        <SelectTrigger className="w-[180px] bg-background">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Select your preferred language for the interface.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="border-b">
                  <CardTitle className="text-2xl">Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-6">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">Project updates</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when updates are made to projects
                            you&apos;re a part of
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">Task assignments</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when you&apos;re assigned to a task
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">Comments</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when someone comments on your tasks
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <Separator />
                    <h3 className="font-medium">In-App Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">Task reminders</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications for upcoming task deadlines
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">Project invitations</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when you&apos;re invited to a
                            project
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">Mentions</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when you&apos;re mentioned in
                            comments
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end border-t p-6">
                  <Button
                    onClick={() => {
                      toast.success("Notification preferences saved");
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
