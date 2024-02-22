"use server"

import { db } from "@/_lib/prisma"

interface SaveBookingProps {
    barbershopId: string,
    serviceId: string,
    userId: string,
    date: Date,
}
export const save_booking = async (params: SaveBookingProps) => {
    await db.booking.create({
        data: {
            userId: params.userId,
            serviceId: params.serviceId,
            date: params.date,
            barbershoId: params.barbershopId,
        }
    })
}