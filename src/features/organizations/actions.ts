"use server";

import { OrganizationSchema, AddMemberSchema } from "./schemas";
import { createAdminClient } from "@/server/auth/supabase-server";
import { revalidatePath } from "next/cache";

export async function createOrganizationAction(formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const code = formData.get("code")?.toString() || "";
  const isInternal = formData.get("isInternal") === "true";

  const parsed = OrganizationSchema.safeParse({ name, code, isInternal });
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    return { error: "Chưa cấu hình nhà cung cấp dịch vụ xác thực Supabase (.env)" };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from("organizations").insert({
    name: parsed.data.name,
    code: parsed.data.code,
    is_internal: parsed.data.isInternal,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/organizations");
  return { success: true };
}

export async function addMemberToOrgAction(formData: FormData) {
  const organizationId = formData.get("organizationId")?.toString() || "";
  const userId = formData.get("userId")?.toString() || "";
  const roleInOrg = (formData.get("roleInOrg")?.toString() || "MEMBER") as "OWNER" | "MANAGER" | "MEMBER";

  const parsed = AddMemberSchema.safeParse({ organizationId, userId, roleInOrg });
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    return { error: "Chưa cấu hình nhà cung cấp dịch vụ xác thực Supabase (.env)" };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from("organization_members").insert({
    organization_id: parsed.data.organizationId,
    user_id: parsed.data.userId,
    role_in_org: parsed.data.roleInOrg,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/organizations");
  return { success: true };
}
