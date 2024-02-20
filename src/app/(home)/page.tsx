import Header from "@/_components/Header";
import {format} from "date-fns"
import { ptBR } from "date-fns/locale";
import Search from "./_components/Search";
import BookingItem from "@/_components/BookingItem";
import { db } from "@/_lib/prisma";
import BarberShopItem from "./_components/BarberShopItem";

export default async function Home() {

  const barbershops = await db.barberShop.findMany({})
  return (
    <main className="px-5">
      <Header/>
      <div className=" pt-5">
        <h2 className="text-2xl">Olá <span className="font-semibold">Miguel!</span></h2>
        <p className="capitalize text-lg">{format(new Date(), "EEEE',' d ' de ' MMMM", {
          locale: ptBR
        })}</p>
      </div>
      <div className=" mt-6">
        <Search/>
      </div>
      <div className=" mt-6">
        <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">Agendamento</h2>
        <BookingItem/>
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
