import { CheckIcon } from "lucide-react";
import { Button } from "../ui";
import { useReactFlow } from "@xyflow/react";
import { updateWorkflow } from "@/src/infrastructure";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
export const SaveBtn = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", {
        id: "save-flow",
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "save-flow",
      });
    },
  });

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading("Saving workflow...", {
          id: "save-flow",
        });
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDefinition,
        });
      }}
    >
      <CheckIcon size={16} className="stroke-green-400" />
      Save
    </Button>
  );
};
