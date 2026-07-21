"use server";

import { ProjectSchema, TaskSchema } from "./schemas";
import { createClient } from "@/server/auth/supabase-server";
import { revalidatePath } from "next/cache";

export async function createProjectAction(formData: FormData): Promise<void> {
  const organizationId = formData.get("organizationId")?.toString() || "";
  const name = formData.get("name")?.toString() || "";
  const code = formData.get("code")?.toString() || "";

  const parsed = ProjectSchema.safeParse({ organizationId, name, code });
  if (!parsed.success) {
    return;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    return;
  }

  const supabase = await createClient();
  await supabase.from("projects").insert({
    organization_id: parsed.data.organizationId,
    name: parsed.data.name,
    code: parsed.data.code,
  });

  revalidatePath("/projects");
}

export async function createTaskAction(formData: FormData): Promise<void> {
  const projectId = formData.get("projectId")?.toString() || "";
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const isInternal = formData.get("isInternal") === "true";

  const parsed = TaskSchema.safeParse({ projectId, title, description, isInternal });
  if (!parsed.success) {
    return;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    return;
  }

  const supabase = await createClient();
  await supabase.from("tasks").insert({
    project_id: parsed.data.projectId,
    title: parsed.data.title,
    description: parsed.data.description,
    is_internal: parsed.data.isInternal,
  });

  revalidatePath("/projects");
}
