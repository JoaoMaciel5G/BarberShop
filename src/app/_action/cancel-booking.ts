"use server"

import { db } from "@/_lib/prisma"
import { revalidatePath } from "next/cache"

export const cancelBooking = async (id: string) => {
    await db.booking.delete({
        where: {
            id
        }
    })

    revalidatePath("/bookings")
}