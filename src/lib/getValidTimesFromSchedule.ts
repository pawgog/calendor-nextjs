import { db } from "@/drizzle/db"
import { getCalendarEventTimes } from "@/server/googleCalendar"
import {
  addMinutes,
  areIntervalsOverlapping,
  isWithinInterval,
} from "date-fns"

export async function getValidTimesFromSchedule(
  timesInOrder: Date[],
  event: { clerkUserId: string; durationInMinutes: number }
) {
  const start = timesInOrder[0]
  const end = timesInOrder.at(-1)

  if (start == null || end == null) return []

  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId: userIdCol }, { eq }) =>
      eq(userIdCol, event.clerkUserId),
    with: { availabilities: true },
  })

  if (schedule == null) return []

  const groupedAvailabilities = Object.groupBy(
    schedule.availabilities,
    a => a.dayOfWeek
  )

  const eventTimes = await getCalendarEventTimes(event.clerkUserId, {
    start,
    end,
  })

  return timesInOrder.filter(intervalDate => {
    const availabilities = getAvailabilities(
      groupedAvailabilities,
      intervalDate,
      schedule.timezone
    )
    const eventInterval = {
      start: intervalDate,
      end: addMinutes(intervalDate, event.durationInMinutes),
    }

    return (
      eventTimes.every(eventTime => {
        return !areIntervalsOverlapping(eventTime, eventInterval)
      }) &&
      availabilities.some(availability => {
        return (
          isWithinInterval(eventInterval.start, availability) &&
          isWithinInterval(eventInterval.end, availability)
        )
      })
    )
  })
}
