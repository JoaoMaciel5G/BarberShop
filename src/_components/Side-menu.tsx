"use client"

import {Avatar, AvatarImage} from "./ui/avatar"
import { LogOutIcon, UserIcon, LogInIcon, HomeIcon, CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const SideMenu = () => {
    const {data, status} = useSession()
    const handleLogOutClick = () => signOut()
    const handleLoginClick = () => signIn("google")
    
    return (
        <>
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                <SheetTitle>
                    Menu
                </SheetTitle>
            </SheetHeader>
            {data?.user ? (
                <div className="flex justify-between px-5 py-6 items-center">
                    <div className="flex items-center gap-3 px-5 py-6">
                        <Avatar>
                            <AvatarImage src={data?.user?.image ?? ""}/>
                        </Avatar>
                        <h2 className="font-bold">{data?.user?.name}</h2>
                    </div>
                    <Button onClick={handleLogOutClick} variant="secondary" size="icon">
                        <LogOutIcon/>
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-2 px-5 py-6">
                <div className="flex items-center gap-3">
                    <UserIcon size={32}/>
                    <h2 className="font-bold">Olá, faça seu login</h2>
                </div>
                <Button variant="secondary" className="w-full" onClick={handleLoginClick}>
                    <LogInIcon className="mr-3" size={18}/>
                    Fazer Login
                </Button>
            </div>  
            )}

            <div className="flex flex-col gap-3 px-5">
                <Button variant="outline" className="justify-start" asChild>
                    <Link href="/">
                        <HomeIcon size={18} className="mr-3"/>
                        Inicio
                    </Link>
                </Button>

                {data?.user && (
                    <Button variant="outline" className="justify-start" asChild>
                        <Link href="/bookings">
                            <CalendarIcon size={18} className="mr-3"/>
                            Agendamentos
                        </Link>
                    </Button>
                )}
            </div>
        </>
    );
}
 
export default SideMenu;