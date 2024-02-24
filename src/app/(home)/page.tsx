import Header from "@/_components/Header";
import {format} from "date-fns"
import { ptBR } from "date-fns/locale";
import Search from "./_components/Search";
import { db } from "@/_lib/prisma";
import BarberShopItem from "./_components/BarberShopItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

export default async function Home() {

  const barbershops = await db.barberShop.findMany({})
  const session = await getServerSession(authOptions)
  return (
    <main className="px-5">
      <Header/>
      <div className=" pt-5">
        <h2 className="text-2xl my-4"><span className="font-semibold">{session?.user ? `Olá ${session?.user?.name?.split(" ")[0]}` : "Olá, Vamos agendar um corte hoje?"}</span></h2>
        <p className="capitalize text-lg">{format(new Date(), "EEEE',' d ' de ' MMMM", {
          locale: ptBR
        })}</p>
      </div>
      <div className=" mt-6">
        <Search/>
      </div>
      <div className="mt-6">
        <h2 className=" text-sm uppercase text-gray-400 font-bold mb-3">Recomendados</h2>
        <div className="flex justify-between gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {
            barbershops.map((barbershop)=>(
              <BarberShopItem key={barbershop.id} barbershop={barbershop}/>
            ))
          }
        </div>
      </div>
      <div className="mt-6 mb-[4.5rem]">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">Populares</h2>
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden justify-between">
          {
            barbershops.map((barbershop)=>(
              <BarberShopItem key={barbershop.id} barbershop={barbershop}/>
            ))
          }
        </div>
      </div>
    </main>
  );
}
