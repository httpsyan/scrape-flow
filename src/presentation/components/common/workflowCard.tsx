"use client";

import { Workflow } from "@prisma/client";
import { Button, buttonVariants, Card, CardContent } from "../ui";
import { WorkflowStatus } from "@/src/domain";
import {
  FileTextIcon,
  MoreVertical,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import { cn } from "@/src/infrastructure";
import Link from "next/link";
import { useState } from "react";
import { DeleteWorkflow } from "./deleteWorkflow";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TooltipWrapper } from "./tooltipWrapper";

const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-primary",
};

export const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 dark:shadow-primary/30">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center  justify-center",
              statusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft && <FileTextIcon className="w-5 h-5" />}
            {!isDraft && <PlayIcon className="w-5 h-5" />}
          </div>

          <div>
            <h3 className="font-bold text-muted-foreground flex items-center">
              <Link
                href={`/workflows/editor/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href={`/workflows/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <DeleteWorkflow
            workflowId={workflow.id}
            workflowName={workflow.name}
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <TooltipWrapper content="More actions">
                  <div className="flex items-center justify-center w-full h-full">
                    <MoreVertical size={18} />
                  </div>
                </TooltipWrapper>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 hover:text-red-600 cursor-pointer"
                onSelect={() => setShowDeleteDialog(true)}
              >
                <TrashIcon size={16} className="text-red-500" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
