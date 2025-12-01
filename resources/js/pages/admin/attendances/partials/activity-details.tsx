import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { count } from "console";
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
    att_employees: Record<string, any>[];
    registeredCount: Record<string, any>[];
    activity: Activity;
}

export default function ActivityDetails({
        activity,
        att_employees,
        registeredCount
    }: {
        activity: Activity | null,
        att_employees: Record<string, any>[],
        registeredCount: number
    }){

    if (!activity) return <div className="text-gray-500 italic">Select an Activity</div>;

    var registeredCountValue = registeredCount;
    var presentCount = att_employees.length;
    var turnoutRate = registeredCountValue > 0 ? ((presentCount / registeredCountValue) * 100).toFixed(2) : '0.00';

    // console.log("Registered Employees:", turnoutRate);

    return(
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-row gap-5 items-center">
                    <SquareCheck size={30} className="hidden md:block"/>
                    <div className="flex flex-col">
                        <CardTitle>{activity.activity_name}</CardTitle>
                        <CardDescription className=" ">
                            {activity?.activity_desc ?? ''}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row gap-2">
                    <div className="flex md:flex-row sm:flex-col flex-col gap-10">
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
                        <div className=" md:flex-row sm:flex-col flex-col md:flex sm:hidden hidden gap-5">
                            <div className="w-48 flex flex-col text-center items-center bg-slate-300/20 p-4 rounded-lg gap-2">
                                <div className="text-5xl">{registeredCount}</div>
                                <p className=" text-gray-400">Registered Employees</p>
                            </div>
                            <div className="w-48 flex flex-col text-center items-center bg-slate-300/20 p-4 rounded-lg gap-2">
                                <div className="text-5xl">{presentCount}</div>
                                <p className=" text-gray-400">Attended</p>
                            </div>
                            <div className="w-48 flex flex-col text-center items-center bg-slate-300/20 p-4 rounded-lg gap-2">
                                <div className="text-5xl">{turnoutRate}%</div>
                                <p className=" text-gray-400">Turnout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
