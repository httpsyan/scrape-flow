import { memo } from "react";
import { NodeCard } from "./nodeCard";
import { NodeHeader } from "./nodeHeader";
import { NodeProps } from "@xyflow/react";
import { AppNodeData } from "@/src/domain";
import { TaskRegistry } from "@/src/infrastructure";
import { NodeInput, NodesInputs } from "./nodesInputs";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodesInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodesInputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
