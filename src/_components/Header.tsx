"use client"

import { LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetHeader, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
    const {data, status} = useSession()
    const handleLogOutClick = () => signOut()
    const handleLoginClick = () => signIn("google")

    return (
        <Card>
            <CardContent className="flex justify-between items-center py-8 px-5">
               <h2 className="text-2xl font-semibold">BarberShop</h2> 
               <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MenuIcon/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-0">
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
                    </SheetContent>
               </Sheet>
               
            </CardContent>
        </Card> 
    );
}
 
export default Header;