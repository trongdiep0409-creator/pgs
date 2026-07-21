import { z } from "zod";

export const OrganizationSchema = z.object({
  name: z.string().min(2, "Tên tổ chức phải có ít nhất 2 ký tự"),
  code: z.string().min(2, "Mã tổ chức phải có ít nhất 2 ký tự").toUpperCase(),
  isInternal: z.boolean().default(false),
});

export const AddMemberSchema = z.object({
  organizationId: z.string().uuid("ID tổ chức không hợp lệ"),
  userId: z.string().uuid("ID người dùng không hợp lệ"),
  roleInOrg: z.enum(["OWNER", "MANAGER", "MEMBER"]).default("MEMBER"),
});

export type OrganizationInput = z.infer<typeof OrganizationSchema>;
export type AddMemberInput = z.infer<typeof AddMemberSchema>;
