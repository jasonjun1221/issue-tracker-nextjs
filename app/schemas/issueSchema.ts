import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character").max(255),
  description: z.string().min(1, "Description must be at least 1 character").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character").max(255).optional(),
  description: z.string().min(1, "Description must be at least 1 character").max(65535).optional(),
  assignedToUserId: z.string().min(1, "Assignee must be at least 1 character").max(255).optional().nullable(),
});

export type IssueFormData = z.infer<typeof issueSchema>;
export type PatchIssueFormData = z.infer<typeof patchIssueSchema>;
