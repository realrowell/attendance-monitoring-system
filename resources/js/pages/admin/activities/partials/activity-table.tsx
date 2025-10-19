import { DataTable } from "@/components/data-table"
import { columns, Activity } from "./activity-columns"
import { usePage } from "@inertiajs/react";
import { DateTime } from "luxon";


interface ActivityTableProp extends Record<string, any> {
    activities: any;
}

// interface Activity{
//     activityName: string;
//     activityDesc: string;
//     activityType: string;
//     activityStatus: string;
//     ref: string;
//     dateTime: DateTime;
// }


export default function ActivityTable(){
    const { activities } = usePage<ActivityTableProp>().props;

    return (
        <div className="p-6">
            <DataTable columns={columns} data={activities} />
        </div>
    );
}
