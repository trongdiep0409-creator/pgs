"use server";

import { CheckInSchema, LeaveRequestSchema } from "./schemas";
import { createClient } from "@/server/auth/supabase-server";
import { revalidatePath } from "next/cache";

export async function checkInAction(formData: FormData): Promise<void> {
  const type = (formData.get("type")?.toString() || "IN") as "IN" | "OUT";

  const parsed = CheckInSchema.safeParse({ type });
  if (!parsed.success) {
    return;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    return;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase.from("attendance_logs").insert({
    user_id: user.id,
    type: parsed.data.type,
  });

  revalidatePath("/attendance");
}

export async function submitLeaveRequestAction(formData: FormData): Promise<void> {
  const startDate = formData.get("startDate")?.toString() || "";
  const endDate = formData.get("endDate")?.toString() || "";
  const reason = formData.get("reason")?.toString() || "";

  const parsed = LeaveRequestSchema.safeParse({ startDate, endDate, reason });
  if (!parsed.success) {
    return;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    return;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase.from("leave_requests").insert({
    user_id: user.id,
    start_date: parsed.data.startDate,
    end_date: parsed.data.endDate,
    reason: parsed.data.reason,
  });

  revalidatePath("/attendance");
}
