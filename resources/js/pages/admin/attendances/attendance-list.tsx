import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import { DateTime } from "luxon";
import ActivityBar from "./partials/activities-bar";
import ActivityDetails from "./partials/activity-details";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import AddAttendeeDialog from "./partials/add-attendees-dialog";
import AttendeeTable from "./partials/attendee-table";
import DependentsTable from "./partials/dependents-table";
import AddAttendeeDialog from "./partials/add-attendees-dialog";
import AddAttendeeManualDialog from "./partials/add-attendee-manual-dialog";
import axios from "axios";

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
    empClasses: any;
    suffixes: any;
}

interface AttendancesResponse {
    att_employees: Record<string, any>[];
    att_dependents: any[];
}

export default function AttendanceList(){
    const { activities, partTypeOptions, empClasses, suffixes } = usePage<AttendanceListPageProps>().props;
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [ attendances, setAttendances ] = useState<AttendancesResponse>({att_employees: [], att_dependents: []});
    const [ isShowAttendanceDialog, setIsShowAttendanceDialog ] = useState(false);

    useEffect(() => {
        if (!selectedActivity) return;
        handleApiCallOnActivitySelect(selectedActivity.ref);
    }, [selectedActivity]);

    const handleActivitySelect = (selected_activity: Activity) => {
        // console.log("Selected Activity:", selected_activity);
        setIsShowAttendanceDialog(true);
        setSelectedActivity(selected_activity);
    };

    const handleApiCallOnActivitySelect = async(activityRef: string) => {
        try{
            const response = await axios.get(`/api/v1/attendances/getEmpDepdByActivity/${activityRef}`);
            // console.log("AttendanceList",attendances?.att_employees);
            setAttendances(response.data.attendances ?? []);
        }
        catch (err){
            console.log(err);
        }
        finally{
            // setIsSubmitting(false);
        }
    }

    return (
        <AuthenticatedLayout
            header="Attendance List"
        >
            <Head title="Attendances" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full p-6 flex gap-5 flex-col">
                    <div >
                        <ActivityBar activities={activities} onSelect={handleActivitySelect}/>
                    </div>
                    <div className="flex flex-row w-full">
                        <ActivityDetails activity={selectedActivity}/>
                    </div>
                    {isShowAttendanceDialog && (
                        <div className="flex flex-row justify-end gap-3 w-full">
                            <AddAttendeeDialog activity={selectedActivity} />
                            <AddAttendeeManualDialog activity={selectedActivity} />
                        </div>
                    )}
                    {selectedActivity && (
                        <Tabs defaultValue="employee-tbl" className="w-full">
                            <TabsList>
                                <TabsTrigger value="employee-tbl">Employees</TabsTrigger>
                                <TabsTrigger value="dependent-tbl">Dependents</TabsTrigger>
                            </TabsList>
                            <TabsContent value="employee-tbl">
                                <AttendeeTable attEmployees={attendances.att_employees} empClasses={empClasses} suffixes={suffixes} partTypeOptions={partTypeOptions}/>
                            </TabsContent>
                            <TabsContent value="dependent-tbl">
                                <DependentsTable attDependents={attendances.att_dependents} partTypeOptions={partTypeOptions}/>
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
