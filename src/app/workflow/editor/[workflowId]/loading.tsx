import { Loader2 } from "lucide-react";

export default function WorkflowEditorLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="animate-spin stroke-primary" size={30} />
    </div>
  );
}
