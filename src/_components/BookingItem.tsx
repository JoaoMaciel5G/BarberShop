import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop:  true
        }
    }>
}
const BookingItem = ({booking}: BookingProps) => {
    const bookingConfirmed = isFuture(booking.date)
    return (
        <Card>
            <CardContent className="p-5 py-0 flex justify-between">
                <div className="flex flex-col gap-3 py-5 flex-[3] xl:flex-[8]">
                    <Badge variant={bookingConfirmed ? "default" : "secondary"} className="w-fit">{bookingConfirmed ? "Confirmado" : "Finalizado"}</Badge>
                    <h2 className="font-bold">{booking?.service.name}</h2>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={booking?.barbershop?.imageUrl}/>
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="text-md">{booking?.barbershop?.name}</h3>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center border-l px-3 flex-1 border-solid border-secondary">
                    <p className="text-md capitalize">{format(booking.date, "MMMM", {locale: ptBR})}</p>
                    <p className="text-2xl">{format(booking.date, "dd")}</p>
                    <p className="text-md">{format(booking.date, "hh':'mm")}</p>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default BookingItem;