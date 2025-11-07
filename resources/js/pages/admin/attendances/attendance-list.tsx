import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import { DateTime } from "luxon";
import AddAttendanceDialog from "./partials/add-attendance-dialog";
import ActivityBar from "./partials/activities-bar";
import ActivityDetails from "./partials/activity-details";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import AddAttendeeDialog from "./partials/add-attendees-dialog";
import AttendeeTable from "./partials/attendee-table";
import DependentsTable from "./partials/dependents-table";

interface Activity{
    ref: string;
    activity_name: string;
    activity_desc: string;
    date_time: string;
    activity_status: string;
    activity_type: string;
}

interface AttendanceListPageProps extends Record<string, any> {
    activities: any;
    partTypeOptions: any;
}

export default function AttendanceList(){
    const { activities } = usePage<AttendanceListPageProps>().props;
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    const handleActivitySelect = (selected_activity: Activity) => {
        console.log("Selected Activity:", selected_activity);
        setSelectedActivity(selected_activity);
    };

    return (
        <AuthenticatedLayout
            header="Attendance List"
        >
            <Head title="Attendances" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full p-6">
                    <div className=" ">
                        <ActivityBar activities={activities} onSelect={handleActivitySelect}/>
                    </div>
                    <div className="flex flex-row w-full">
                        <ActivityDetails activity={selectedActivity}/>
                    </div>
                    {selectedActivity && (
                        <Tabs defaultValue="employee-tbl" className="w-full">
                            <TabsList>
                                <TabsTrigger value="employee-tbl">Employees</TabsTrigger>
                                <TabsTrigger value="dependent-tbl">Dependents</TabsTrigger>
                            </TabsList>
                            <TabsContent value="employee-tbl">
                                <AttendeeTable/>
                            </TabsContent>
                            <TabsContent value="dependent-tbl">
                                <DependentsTable />
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
