import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Header = () => {
    return (
        <Card>
            <CardContent className="flex justify-between items-center py-8 px-5">
               <h2 className="text-2xl font-semibold">BarberShop</h2> 
               <Button variant="outline" size="icon" className="h-8 w-8">
                  <MenuIcon/>
               </Button>
            </CardContent>
        </Card> 
    );
}
 
export default Header;