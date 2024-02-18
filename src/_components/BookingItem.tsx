import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
    return (
        <Card>
            <CardContent className="p-5 py-0 flex justify-between">
                <div className="flex flex-col gap-3 py-5">
                    <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Confirmado</Badge>
                    <h2 className="font-bold">Corte de cabelo</h2>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"/>
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="text-md">Vintage Barber</h3>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center border-l px-3 border-solid border-secondary">
                    <p className="text-md">Fevereiro</p>
                    <p className="text-2xl">09</p>
                    <p className="text-md">09:45</p>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default BookingItem;