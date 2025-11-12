import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from 'date-fns';
import { SquareCheck } from "lucide-react";

interface Activity{
    ref: string;
    activity_name: string;
    activity_desc: string;
    date_time: string;
    activity_status: string;
    activity_type: string;
}
interface ActivityDetailsProps extends Record<string, any>{
    activity: Activity;
}

export default function ActivityDetails({ activity }: { activity: Activity | null }){
    if (!activity) return <div className="text-gray-500 italic">Select an Activity</div>;

    return(
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-row gap-5 items-center">
                    <SquareCheck size={30}/>
                    <div className="flex flex-col">
                        <CardTitle>{activity.activity_name}</CardTitle>
                        <CardDescription>{activity?.activity_desc ?? ''}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <table className="gap-3">
                    <tbody>
                        <tr>
                            <td className="pr-4 font-bold">Date Time:</td>
                            <td>{format(activity.date_time, 'MMM d, yyyy hh:mma')}</td>
                        </tr>
                        <tr>
                            <td className="pr-4 font-bold">Activity Status:</td>
                            <td>{activity.activity_status}</td>
                        </tr>
                        <tr>
                            <td className="pr-4 font-bold">Activity Type:</td>
                            <td>{activity.activity_type}</td>
                        </tr>
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}
