"use client"

import { Button } from "@/_components/ui/button";
import { BarberShop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopInfoProps {
    barbershops: BarberShop
}
const BarbershopInfo = ({barbershops}: BarberShopInfoProps) => {
    const router = useRouter()
    const handleBackClick = () => {
        router.back()
    }
    return (
        <div>
            <div className="h-[250px] w-full relative">
                <Button variant="outline" size="icon" className="z-50 absolute top-4 left-4" onClick={handleBackClick}>
                    <ChevronLeftIcon/>
                </Button>
                <Button variant="outline" size="icon" className="z-50 absolute top-4 right-4">
                    <MenuIcon/>
                </Button>
                <Image alt={barbershops.name} src={barbershops.imageUrl} fill  style={{objectFit: "cover"}} className="opacity-75"/>   
            </div>
            <div className="px-5 py-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold">{barbershops.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="text-primary"/>
                  <p className="text-sm">{barbershops.address}</p>  
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="text-primary"/>
                  <p className="text-sm">5,0 (879 avaliações)</p>  
                </div>
                <div className="flex gap-4 mt-4">
                    <Button>
                        Serviços
                    </Button>
                    <Button variant="outline">
                        Informações
                    </Button>
                </div>
                
            </div>
        </div>
    );
}
 
export default BarbershopInfo;