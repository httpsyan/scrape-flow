"use server";

import {
  createWorkflowSchema,
  createWorkflowSchemaType,
  WorkflowStatus,
} from "@/src/domain";
import { auth } from "@clerk/nextjs/server";
import prisma from "../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getWorkflows() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!result) {
    throw new Error("Failed to create workflow");
  }

  redirect(`/workflows/editor/${result.id}`);
}

export async function updateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) throw new Error("Failed to update workflow");
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not in draft mode");
  }

  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: { definition },
  });

  revalidatePath("/workflows");
}

export async function deleteWorkflow(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const result = await prisma.workflow.delete({
    where: {
      id,
      userId,
    },
  });

  if (!result) {
    throw new Error("Failed to delete workflow");
  }

  revalidatePath("/workflows");
}
