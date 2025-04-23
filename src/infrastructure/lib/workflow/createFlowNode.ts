import { TaskType } from "@/src/domain";
import { AppNode } from "@/src/domain";

export function createFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    position: position ?? { x: 0, y: 0 },
    data: {
      type: nodeType,
      inputs: {},
    },
  };
}
