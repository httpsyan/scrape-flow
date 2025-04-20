import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().max(80),
  description: z.string().max(80).optional(),
});

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;
