"use client"

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader,SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { cancelBooking } from "@/app/_action/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
    const [cancelLoading, setCancelLoading] = useState<boolean>()
    const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false)

    const handleCancelBookingClick = async () => {
        try {
            setCancelLoading(true)
            await cancelBooking(booking.id)
            toast.success("Agendamento cancelado com sucesso!")
            setSheetIsOpen(false)
        } catch (error) {
            console.error(error);
        }finally{
            setCancelLoading(false)
        }
    }
    return (
            <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                    <Card>
                        <CardContent className="p-5 py-0 flex justify-between cursor-pointer">
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
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className="text-left  pb-6 border-b border-solid border-secondary">
                        <SheetTitle>
                            Informações da reserva
                        </SheetTitle>
                    </SheetHeader>
                    <div>
                        <Card className="mt-6">
                            <CardContent className="flex p-5 gap-3 items-center">
                                <Avatar>
                                    <AvatarImage src={booking.barbershop.imageUrl}/>
                                </Avatar>
                                <div>
                                    <h2 className="font-bold ">{booking.barbershop.name}</h2>
                                    <h3 className="text-sm overflow-hidden text-ellipsis text-nowrap">{booking.barbershop.address}</h3>
                                </div>
                            </CardContent>
                        </Card>
                        <Badge variant={bookingConfirmed ? "default" : "secondary"} className="w- mt-3 mb-6">{bookingConfirmed ? "Confirmado" : "Finalizado"}</Badge>
                    </div>
                    <Card>
                        <CardContent className="p-3 flex flex-col gap-4">
                            <div className="flex justify-between">
                                <h2 className="font-bold">{booking.service.name}</h2>
                                <h3>{Intl.NumberFormat(
                                    "pt-BR",
                                    {
                                        "style": "currency",
                                        "currency": "BRL"
                                    }
                                    ).format(Number(booking.service.price))}
                                </h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-sm text-gray-400">Data</h3>
                                <h4 className="text-sm">{format(booking.date, "dd 'de' MMMM", {
                                    locale: ptBR
                                })}</h4>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-sm text-gray-400">Horário</h3>
                                <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
                            </div> 
                            <div className="flex justify-between">
                                    <h3 className="text-sm text-gray-400">Barbearia</h3>
                                    <h4 className="text-sm">{booking.barbershop.name}</h4>
                            </div> 
                        </CardContent>
                    </Card>
                    <SheetFooter className="flex flex-row gap-3 mt-6">
                        <SheetClose asChild>
                            <Button variant="secondary" className="w-full">
                                Voltar
                            </Button>
                        </SheetClose>
                        <Button disabled={!bookingConfirmed || cancelLoading} onClick={handleCancelBookingClick} variant="destructive" className={`w-full ${cancelLoading ? "cursor-not-allowed" : ""}`}>
                            {cancelLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
                            Cancelar pedido
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
    )
}
 
export default BookingItem;