"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../ui";
import { TooltipWrapper } from "./tooltipWrapper";
import { useRouter } from "next/navigation";
import { SaveBtn } from "./saveBtn";
interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
}

export const Topbar = ({ title, subtitle, workflowId }: Props) => {
  const router = useRouter();
  return (
    <header className="flex p-2 border-p-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-10 flex-1">
        <TooltipWrapper content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
        </TooltipWrapper>
        <div className="flex flex-col gap-1">
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <SaveBtn workflowId={workflowId} />
      </div>
    </header>
  );
};
