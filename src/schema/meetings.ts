import { startOfDay } from "date-fns"
import { z } from "zod"

const meetingSchemaBase = z.object({
  startTime: z.date({
      message: "Time is required",
    }).min(new Date()),
  guestEmail: z.string({
      message: "Email is required",
    }).email().min(1, "Required"),
  guestName: z.string({
      message: "Name is required",
    }).min(1, "Required"),
  guestNotes: z.string().optional(),
  timezone: z.string().min(1, "Required"),
})

export const meetingFormSchema = z
  .object({
    date: z.date({
      message: "Date is required",
    }).min(startOfDay(new Date()), "Must be in the future"),
  })
  .merge(meetingSchemaBase)

export const meetingActionSchema = z
  .object({
    eventId: z.string().min(1, "Required"),
    clerkUserId: z.string().min(1, "Required"),
  })
  .merge(meetingSchemaBase)
  