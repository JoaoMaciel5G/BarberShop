"use client"

import { MenuIcon} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger} from "./ui/sheet";
import SideMenu from "./Side-menu";

const Header = () => {
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
                        <SideMenu/>
                    </SheetContent>
               </Sheet>
            </CardContent>
        </Card> 
    );
}
 
export default Header;