import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character").max(255),
  description: z.string().min(1, "Description must be at least 1 character"),
});

export type IssueFormData = z.infer<typeof issueSchema>;