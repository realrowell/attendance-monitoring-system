import { DataTable } from "@/components/data-table"
import { columns, Activity } from "./activity-columns"
import { usePage } from "@inertiajs/react";
import { DateTime } from "luxon";


interface ActivityTableProp extends Record<string, any> {
    activities: any;
    activityStatusOptions: any;
    activityTypeOptions: any;
}

export default function ActivityTable(){
    const { activities, activityStatusOptions, activityTypeOptions } = usePage<ActivityTableProp>().props;

    return (
        <div className="p-6">
            <DataTable columns={columns} data={activities} meta={{activityStatusOptions, activityTypeOptions}}/>
        </div>
    );
}
