import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import { DateTime } from "luxon";
import AddActivityDialog from "./partials/add-activity-dialog";
import ActivityTable from "./partials/activity-table";

interface Activities {
    ref: string;
    activity_title: string;
    activity_desc: string;
    date_time: DateTime;
    activity_status: string;
    activity_type: string;
}

interface ActivityListPageProps extends Record<string, any> {
    activities: Activities[];
    activityStatusOptions: any;
    activityTypeOptions: any;
}

export default function ActivityList(){
    const { activities, activityStatusOptions, activityTypeOptions } = usePage<ActivityListPageProps>().props;

    return (
        <AuthenticatedLayout
            header="Activity List"
        >
            <Head title="Activities" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full">
                    <div className="flex flex-row items-center justify-between p-6">
                        <div className="flex flex-col text-start items-start gap-1">
                            <h2 className="text-2xl ">Activity List</h2>
                            <p>View the list of activities here.</p>
                        </div>
                        <AddActivityDialog/>
                    </div>
                    <ActivityTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
