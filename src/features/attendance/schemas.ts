import { z } from "zod";

export const CheckInSchema = z.object({
  type: z.enum(["IN", "OUT"]),
});

export const LeaveRequestSchema = z.object({
  startDate: z.string().min(1, "Ngày bắt đầu không được để trống"),
  endDate: z.string().min(1, "Ngày kết thúc không được để trống"),
  reason: z.string().min(5, "Lý do nghỉ phải ít nhất 5 ký tự"),
});

export type CheckInInput = z.infer<typeof CheckInSchema>;
export type LeaveRequestInput = z.infer<typeof LeaveRequestSchema>;
