import Header from "@/_components/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/_lib/prisma";
import BookingItem from "@/_components/BookingItem";
import { isFuture, isPast } from "date-fns";
import { authOptions } from "@/_lib/auth";

const BookingsPage = async () => {
    const session = await getServerSession(authOptions)
    if(!session?.user){
        redirect("/")
    }

    const bookingItem = await db.booking.findMany({
        where: {
            userId: (session.user as any).id
        },
        include: {
            service: true,
            barbershop: true
        }
    })
    const confirmedBooking = bookingItem.filter((booking)=> isFuture(booking.date))
    const finishedBooking = bookingItem.filter((booking) => isPast(booking.date))
    return (
        <>
            <Header/>
            <div className="px-5 py-6">
                <h1 className="text-xl font-bold">Agendamentos</h1>
                {confirmedBooking.length > 0 && (
                        <h2 className="text-gray-400 uppercase font-semibold text-sm mt-6 mb-3">Confirmados</h2>
                )}
                <div className="flex flex-col gap-3">
                    {confirmedBooking.map((item)=> (
                        <BookingItem key={item.id} booking={item}/>
                    ))}
                </div> 
                <h2 className="text-gray-400 uppercase font-semibold text-sm mt-6 mb-3">Finalizados</h2>
                <div className="flex flex-col gap-3">
                    {finishedBooking.map((item)=> (
                        <BookingItem key={item.id} booking={item}/>
                    ))}
                </div>
            </div>
        </>
    );
}
 
export default BookingsPage;