import { z } from "zod";

export const ProjectSchema = z.object({
  organizationId: z.string().uuid(),
  name: z.string().min(2, "Tên dự án phải từ 2 ký tự"),
  code: z.string().min(2, "Mã dự án phải từ 2 ký tự").toUpperCase(),
});

export const TaskSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(2, "Tiêu đề Task phải từ 2 ký tự"),
  description: z.string().optional(),
  isInternal: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
export type TaskInput = z.infer<typeof TaskSchema>;
