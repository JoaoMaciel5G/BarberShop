"use client"

import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { BarberShop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopItmeProps {
    barbershop: BarberShop
}

const BarberShopItem = ({barbershop}: BarberShopItmeProps) => {

    const router = useRouter()

    const handleBookingClick = () => {
        router.push(`/barbershop/${barbershop.id}`)
    }
    return (
        <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
            <CardContent className="p-0">
                <div className="px-1 relative">
                    <div className="absolute top-3 left-3 z-50">
                       <Badge variant="secondary" className="opacity-90 flex justify-center items-center top-3 left-3 gap-1">
                            <StarIcon size={12} className="fill-primary text-primary"/>
                            <span>5,0</span>
                        </Badge> 
                    </div>
                    
                    <Image src={barbershop.imageUrl} height={0} width={0} sizes="100vw" className="h-[159px] w-full rounded-2xl" alt={barbershop.name}/>
                </div>
                <div className="px-3 pb-3 py-2">
                    <h2 className="font-bold overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
                    <p className="text-sm text-gray-400 mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
                    <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick}>Reservar</Button>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default BarberShopItem;