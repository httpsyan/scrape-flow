"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "../ui";
import { useMutation } from "@tanstack/react-query";
import { deleteWorkflow } from "@/src/infrastructure";
import { toast } from "sonner";

interface DeleteWorkflowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}

export const DeleteWorkflow = ({
  open,
  onOpenChange,
  workflowName,
  workflowId,
}: DeleteWorkflowProps) => {
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      onOpenChange(false);
      toast.success("Workflow deleted successfully", {
        id: workflowId,
      });
    },
    onError: () => {
      toast.error("Failed to delete workflow", {
        id: workflowId,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className="text-xl font-semibold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground">
            This action cannot be undone. The workflow will be permanently
            removed.
            <div className="flex flex-col py-6 gap-4">
              <p className="text-sm">
                To confirm, write the workflow name:{" "}
                <b>
                  {" "}
                  <span className="font-bold text-foreground">
                    {workflowName}
                  </span>
                </b>
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="h-10"
                placeholder="Type the workflow name"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="border-2">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || handleDelete.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toast.loading("Deleting workflow...", {
                id: workflowId,
              });
              handleDelete.mutate(workflowId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
