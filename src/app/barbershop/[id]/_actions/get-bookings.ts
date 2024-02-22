"use server"

import { db } from "@/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const get_bookings = async (barbershopId: string, date: Date) => {
    const bookings = await db.booking.findMany({
        where: {
            barbershoId: barbershopId,
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date)
            }
        }
    })

    return bookings
}