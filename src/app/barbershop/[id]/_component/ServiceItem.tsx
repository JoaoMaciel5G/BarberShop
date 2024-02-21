"use client"

import { Button } from "@/_components/ui/button";
import { Calendar } from "@/_components/ui/calendar";
import { Card, CardContent } from "@/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/_components/ui/sheet";
import { BarberShop, Service } from "@prisma/client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns";

interface ServiceItemProps {
    service: Service,
    barbershop: BarberShop
}

const ServiceItem = ({service, barbershop}: ServiceItemProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>()

    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined)
    }
    const handleHourClick = (time: string) => {
        setHour(time)
    }

    const time = useMemo(()=> {
        return date ? generateDayTimeList(date) : []
    }, [date])

    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex gap-2 my-3 items-center">
                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                        <Image src={service.imageUrl} alt={service.name} fill sizes="100vw"/>
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-primary text-sm font-bold">{Intl.NumberFormat(
                                "pt-BR",
                                {
                                    "style": "currency",
                                    "currency": "BRL"
                                }
                                ).format(Number(service.price))}
                            </p>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="secondary">
                                        Reservar
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>
                                    <Calendar
                                        mode="single"
                                        locale={ptBR}
                                        selected={date}
                                        onSelect={handleDateClick}
                                        fromDate={new Date()}
                                        className="mt-6"
                                        styles={{
                                            head_cell: {
                                                width: "100%",
                                                textTransform: "capitalize"
                                            },
                                            cell: {
                                                width: "100%"
                                            },
                                            button: {
                                                width: "100%"
                                            },
                                            nav_button_previous: {
                                                width: "32px",
                                                height: "32px"
                                            },
                                            nav_button_next: {
                                                width: "32px",
                                                height: "32px"
                                            },
                                            caption: {
                                                textTransform: "capitalize"
                                            },
                                        }}
                                    />
                                    {date && (
                                        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden py-6 px-5 border-t border-solid border-secondary">
                                            {time.map((time)=>(
                                                <Button key={time} onClick={()=> handleHourClick(time)} variant={hour == time ? "default" : "outline"}>
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                    <div className="py-6 px-5">
                                        <Card>
                                            <CardContent className="p-3 flex flex-col gap-4">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <h3>{Intl.NumberFormat(
                                                        "pt-BR",
                                                        {
                                                            "style": "currency",
                                                            "currency": "BRL"
                                                        }
                                                        ).format(Number(service.price))}
                                                    </h3>
                                                </div>
                                                {date && (
                                                   <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-400">Data</h3>
                                                        <h4 className="text-sm">{format(date, "dd 'de' MMMM", {
                                                            locale: ptBR
                                                        })}</h4>
                                                    </div> 
                                                )}
                                                {hour && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-400">Horário</h3>
                                                        <h4 className="text-sm">{hour}</h4>
                                                    </div> 
                                                )}
                                                <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-400">Barbearia</h3>
                                                        <h4 className="text-sm">{barbershop.name}</h4>
                                                </div> 
                                            </CardContent>
                                        </Card>
                                        
                                    </div>
                                    <SheetFooter className="px-5">
                                        <Button disabled={!hour || !date}>
                                            Confirmar reserva
                                        </Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default ServiceItem;