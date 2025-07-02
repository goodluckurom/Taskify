"use client";

import type React from "react";

import { useState } from "react";
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
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

export function InviteMemberDialog({
  open,
  onOpenChange,
}: InviteMemberDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [role, setRole] = useState("member");

  const handleAddEmail = () => {
    if (!currentEmail) return;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(currentEmail)) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address",
      });
      return;
    }

    if (emails.includes(currentEmail)) {
      toast.error("Duplicate email", {
        description: "This email has already been added",
      });
      return;
    }

    setEmails([...emails, currentEmail]);
    setCurrentEmail("");
  };

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emails.length === 0) {
      toast.error("No emails added", {
        description: "Please add at least one email address",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);

      toast.success("Invitations sent", {
        description: `Sent ${emails.length} invitation${
          emails.length > 1 ? "s" : ""
        }`,
      });

      // Reset form
      setEmails([]);
      setCurrentEmail("");
      setRole("member");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
          <DialogDescription>
            Invite people to collaborate on this project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex gap-2">
            <FormItem className="flex-1">
              <FormLabel>Email Address</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    type="email"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddEmail();
                      }
                    }}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddEmail}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </FormItem>
            <FormItem className="w-[180px]">
              <FormLabel>Role</FormLabel>
              <Select value={role} onValueChange={setRole}>
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
            </FormItem>
          </div>

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
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
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
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || emails.length === 0}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Invitations
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
