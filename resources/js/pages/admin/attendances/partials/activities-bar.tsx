import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { usePage } from "@inertiajs/react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Activity{
    ref: string;
    activity_name: string;
    activity_desc: string;
    date_time: Date;
    activity_status: string;
    activity_type: string;
}
interface ActivityBarProps extends Record<string, any>{
    activities: Activity[];
    onSelect: (activity: any) => void;
}

export default function ActivityBar({ activities, onSelect }: ActivityBarProps){

    const handleClick = (activity: any) => {
        onSelect(activity);
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 500; // adjust scroll length here
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return(
        <div className="relative w-full flex items-center">
            {/* Left Button */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 z-10 bg-muted p-1 rounded-full hover:bg-muted/80 shadow hidden md:flex"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="grid grid-cols-1 mb-5 w-full md:overflow-x-hidden sm:overflow-x-auto overflow-x-auto  no-scrollbar ps-10 pe-10 md:pb-0 sm:pb-3 pb-3"
            >
                <div className="flex flex-row flex-nowrap gap-3 w-max ">
                    {activities.map((activity: Activity)=>(
                        <Card
                            key={activity.ref}
                            className="hover:border-white cursor-pointer text-nowrap flex-shrink-0 min-w-[250px] max-w-[300px] transition duration-300 "
                            onClick={() => handleClick(activity)}
                        >
                            <CardHeader>
                                <CardTitle className="text-base truncate">{activity.activity_name}</CardTitle>
                                <CardDescription className="truncate">{activity.activity_desc}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Right Button */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 z-10 bg-muted p-1 rounded-full hover:bg-muted/80 shadow hidden md:flex"
            >
                <ChevronRight size={20} />
            </button>
        </div>
        // <div className="grid grid-cols-1 mb-5 w-full overflow-x-auto">
        //     <div className="flex flex-row flex-nowrap gap-3 w-max pb-3">
        //         {activities.map((activity: Activity)=>(
        //             <Card
        //                 key={activity.ref}
        //                 className="hover:border-white cursor-pointer text-nowrap flex-shrink-0"
        //                 onClick={() => handleClick(activity)}
        //             >
        //                 <CardHeader>
        //                     <CardTitle className="text-base ">{activity.activity_name}</CardTitle>
        //                     <CardDescription>{activity.activity_desc}</CardDescription>
        //                 </CardHeader>
        //             </Card>
        //         ))}
        //         {activities.map((activity: Activity)=>(
        //             <Card
        //                 key={activity.ref}
        //                 className="hover:border-white cursor-pointer text-nowrap flex-shrink-0"
        //                 onClick={() => handleClick(activity)}
        //             >
        //                 <CardHeader>
        //                     <CardTitle className="text-base ">{activity.activity_name}</CardTitle>
        //                     <CardDescription>{activity.activity_desc}</CardDescription>
        //                 </CardHeader>
        //             </Card>
        //         ))}
        //     </div>
        // </div>
    )
}
