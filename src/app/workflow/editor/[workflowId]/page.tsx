import { waitFor } from "@/src/infrastructure";
import prisma from "@/src/infrastructure/lib/prisma";
import { Editor } from "@/src/presentation/components";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface Props {
  params: {
    workflowId: string;
  };
}

export default async function WorkflowEditorPage({ params }: Props) {
  const { workflowId } = params;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  if (!userId) return <div>Unauthenticated</div>;

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) return <div>Workflow not found</div>;

  return <Editor workflow={workflow} />;
}
