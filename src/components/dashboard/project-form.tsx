"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { COLOR_OPTIONS, EMOJI_OPTIONS } from "@/lib/constants";

type FormValues = {
  name: string;
  description: string;
  deadline?: Date;
  icon: string;
  color: string;
};

export function ProjectForm({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormValues) => Promise<void>;
  isLoading: boolean;
}) {
  const [showEmojiGrid, setShowEmojiGrid] = useState(false);
  const [showColorGrid, setShowColorGrid] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    description: "",
    icon: "🚀",
    color: "#6366f1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto  bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Project
          </h2>
          <p className="text-muted-foreground mt-2">
            Bring your ideas to life with a beautifully organized project
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Name *
            </label>
            <Input
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
              placeholder="Amazing Project"
              className="h-12 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 rounded-xl focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <Textarea
              value={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
              placeholder="Describe your project..."
              className="min-h-[120px] bg-background border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 rounded-xl"
            />
          </div>

          {/* Visual Customization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Icon Selection */}
            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Icon
              </label>
              <div className="space-y-3">
                {/* Big selected icon preview */}
                <div
                  onClick={() => setShowEmojiGrid((prev) => !prev)}
                  className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-background cursor-pointer hover:scale-105 transition"
                  title="Click to choose another icon"
                >
                  <span className="text-3xl">{formValues.icon}</span>
                </div>

                {/* Optional toggle button */}
                <button
                  type="button"
                  onClick={() => setShowEmojiGrid((prev) => !prev)}
                  className="mx-auto block text-xs text-gray-600 dark:text-gray-400 hover:underline"
                >
                  {showEmojiGrid ? "Hide Icons" : "Select Icon"}
                </button>

                {/* Scrollable grid, only shown when toggled */}
                {showEmojiGrid && (
                  <div className="max-h-40 overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 dark:border-gray-700 p-2">
                    <div className="grid grid-cols-8 gap-2">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => {
                            setFormValues({ ...formValues, icon: emoji });
                            setShowEmojiGrid(false); // hide after selection
                          }}
                          className={cn(
                            "w-8 h-8 rounded-lg border flex items-center justify-center text-lg transition-all hover:scale-110",
                            formValues.icon === emoji
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md"
                              : "border-gray-200 dark:border-gray-700 bg-background"
                          )}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Color
              </label>
              <div className="space-y-3">
                {/* Color preview */}
                <div
                  onClick={() => setShowColorGrid((prev) => !prev)}
                  className="w-16 h-16 mx-auto rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: formValues.color }}
                  title="Click to pick a color"
                />

                {/* Toggle button */}
                <button
                  type="button"
                  onClick={() => setShowColorGrid((prev) => !prev)}
                  className="mx-auto block text-xs text-gray-600 dark:text-gray-400 hover:underline"
                >
                  {showColorGrid ? "Hide Color Picker" : "Pick Color"}
                </button>

                {showColorGrid && (
                  <div className="space-y-3 rounded-md border border-gray-200 dark:border-gray-700 p-3">
                    {/* Scrollable grid */}
                    <div className="max-h-40">
                      <div className="grid grid-cols-6 gap-2">
                        {COLOR_OPTIONS.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => {
                              setFormValues({ ...formValues, color });
                              setShowColorGrid(false); // optional: auto-close on selection
                            }}
                            className={cn(
                              "w-8 h-8 rounded-lg border-2 transition-all hover:scale-110",
                              formValues.color === color
                                ? "border-gray-800 dark:border-white shadow-md ring-2 ring-gray-400"
                                : "border-gray-200 dark:border-gray-700"
                            )}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Custom color picker */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-700"
                        style={{ backgroundColor: formValues.color }}
                      />
                      <Input
                        type="color"
                        value={formValues.color}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            color: e.target.value,
                          })
                        }
                        className="w-12 h-10 p-0 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                      <Input
                        value={formValues.color}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            color: e.target.value,
                          })
                        }
                        className="flex-1 font-mono text-sm h-10 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Deadline (optional)
            </label>
            <input
              type="date"
              id="deadline"
              value={
                formValues.deadline
                  ? formValues.deadline.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  deadline: e.target.value
                    ? new Date(e.target.value)
                    : undefined,
                })
              }
              min={new Date().toISOString().split("T")[0]}
              className="h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 px-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-5 w-5" />
                  Create Project
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
