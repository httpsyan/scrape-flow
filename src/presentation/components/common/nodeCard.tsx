import { cn } from "@/src/infrastructure";
import { useReactFlow } from "@xyflow/react";

export const NodeCard = ({
  nodeId,
  children,
  isSelected,
}: {
  nodeId: string;
  children: React.ReactNode;
  isSelected: boolean;
}) => {
  const { getNode, setCenter } = useReactFlow();

  const handleDoubleClick = () => {
    const node = getNode(nodeId);
    if (!node) return;
    const { position, measured } = node;
    if (!position || !measured) return;
    const { width, height } = measured;
    const x = position.x + width! / 2;
    const y = position.y + height! / 2;

    console.log("@POSITION", position);
    if (x === undefined || y === undefined) return;
    setCenter(x, y, {
      zoom: 1,
      duration: 500,
    });
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col",
        isSelected && "border-primary"
      )}
    >
      {children}
    </div>
  );
};
