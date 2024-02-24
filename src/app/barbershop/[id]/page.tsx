import { db } from "@/_lib/prisma";
import { redirect } from "next/navigation";
import BarbershopInfo from "./_component/Barbershopinfo";
import ServiceItem from "./_component/ServiceItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

interface BarberShopDetailsPageProps {
    params: {
        id?: string
    }
}

const BarberShopDetailsPage = async ({params} : BarberShopDetailsPageProps) => {
    const session = await getServerSession(authOptions)
    if(!params.id){
        redirect("/")
    }

    const barbershops = await db.barberShop.findUnique({
        where: {
            id: params.id
        }, 
        include: {
            service: true
        }
    })

    if(!barbershops){
        redirect("/")
    }
    
    return (
        <div>
            <BarbershopInfo barbershops={barbershops}/>
            <div className="px-5 flex flex-col gap-3 py-6">
                {barbershops.service.map((item)=>(
                    <ServiceItem key={item.id} service={item} barbershop={barbershops} isAuth={!!session?.user}/> 
                ))}
            </div>
            
        </div>
        
    );
}
 
export default BarberShopDetailsPage;