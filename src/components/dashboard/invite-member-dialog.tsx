"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const inviteMemberSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["admin", "editor", "member", "viewer"]),
});

type InviteMemberForm = z.infer<typeof inviteMemberSchema>;

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

export function InviteMemberDialog({
  open,
  onOpenChange,
  projectId,
}: InviteMemberDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [roles, setRoles] = useState<Record<string, string>>({});

  const form = useForm<InviteMemberForm>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
      role: "member",
    },
  });

  const handleAddEmail = async (data: InviteMemberForm) => {
    if (emails.includes(data.email)) {
      toast.error("Duplicate email", {
        description: "This email has already been added",
      });
      return;
    }

    setEmails([...emails, data.email]);
    setRoles({ ...roles, [data.email]: data.role });
    form.reset();
  };

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
    const newRoles = { ...roles };
    delete newRoles[email];
    setRoles(newRoles);
  };

  const handleSubmit = async () => {
    if (emails.length === 0) {
      toast.error("No emails added", {
        description: "Please add at least one email address",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare the data for API
      const invitations = emails.map((email) => ({
        email,
        role: roles[email] || "member",
      }));

      // API call to invite members
      const response = await fetch(`/api/projects/${projectId}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invitations }),
      });

      if (!response.ok) {
        throw new Error("Failed to send invitations");
      }

      toast.success("Invitations sent", {
        description: `Sent ${emails.length} invitation${
          emails.length > 1 ? "s" : ""
        }`,
      });

      // Reset form and close dialog
      setEmails([]);
      setRoles({});
      form.reset();
      onOpenChange(false);

      // Refresh the page to update the members list
      window.location.reload();
    } catch (error) {
      console.error("Error sending invitations:", error);
      toast.error("Failed to send invitations", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setEmails([]);
      setRoles({});
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
          <DialogDescription>
            Invite people to collaborate on this project.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddEmail)}
            className="space-y-6 py-4"
          >
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email Address</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          type="email"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              form.handleSubmit(handleAddEmail)();
                            }
                          }}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        variant="outline"
                        size="icon"
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-[180px]">
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        {emails.length > 0 && (
          <div className="rounded-md border p-4">
            <h3 className="mb-2 text-sm font-medium">
              Inviting {emails.length} member{emails.length > 1 ? "s" : ""}
            </h3>
            <div className="flex flex-wrap gap-2">
              {emails.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                >
                  <Mail className="h-3 w-3" />
                  <span>{email}</span>
                  <span className="text-xs text-muted-foreground">
                    ({roles[email] || "member"})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                    disabled={isLoading}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || emails.length === 0}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Invitations
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
