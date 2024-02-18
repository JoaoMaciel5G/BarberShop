import Header from "@/_components/Header";
import {format} from "date-fns"
import { ptBR } from "date-fns/locale";
import Search from "./_components/Search";

export default function Home() {
  return (
    <main>
      <Header/>

      <div className="px-5 pt-5">
        <h2 className="text-2xl">Olá <span className="font-semibold">Miguel!</span></h2>
        <p className="capitalize text-lg">{format(new Date(), "EEEE',' d ' de ' MMMM", {
          locale: ptBR
        })}</p>
      </div>

      <div className="px-5 mt-6">
        <Search/>
      </div>
    </main>
  );
}
