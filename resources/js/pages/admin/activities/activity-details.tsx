import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ActivityQrCode from "./partials/activity-qr-code";
import AddAttendeeDialog from "./partials/add-attendees-dialog";
import AttendeeTable from "./partials/attendee-table";

interface Activity {
    ref: string;
    activity_name: string;
    activity_desc: string;
    date_time: string | number | readonly string[] | undefined;
    activity_status: string;
    activity_type: string;
}

interface ActivityDetailsProps extends Record<string, any> {
    activity: Activity;
    activityStatusOptions: any;
    activityTypeOptions: any;
    partTypeOptions: any;
    attendances: any;
}
export default function ActivityDetails(){
    const { activity, activityStatusOptions, activityTypeOptions, attendances } = usePage<ActivityDetailsProps>().props;
    // console.log(activity.activity_name);

    return (
        <AuthenticatedLayout
            header="Employee List"
        >
            <Head title="Employees" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full p-6 flex flex-col gap-10">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col text-start items-start gap-1">
                            <h2 className="text-xl ">Activity Details</h2>
                            {/* <p>The employee’s information is displayed below. You may review or update the details as needed.</p> */}
                        </div>
                    </div>
                    <div className="flex md:flex-row sm:flex-col flex-col gap-5 items-start">
                        <div className="flex flex-col md:w-1/4 sm:w-full w-full gap-5">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="ref">Reference</Label>
                                <Input
                                    id="ref"
                                    name="ref"
                                    value={activity.ref}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="actName">Activity Name</Label>
                                <Input
                                    id="actName"
                                    name="act_name"
                                    value={activity.activity_name}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="actDesc">Description</Label>
                                <Textarea
                                    id="actDesc"
                                    name="act_desc"
                                    value={activity.activity_desc}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:w-1/4 sm:w-full gap-5 w-full">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="dateTime">Date and Time</Label>
                                <Input
                                    id="dateTime"
                                    name="date_time"
                                    value={activity.date_time}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="dateTime">Type</Label>
                                <Input
                                    id="dateTime"
                                    name="date_time"
                                    value={ activityTypeOptions[activity.activity_type].label || activity.activity_type || "N/A" }
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="actStatus">Status</Label>
                                <Input
                                    id="actStatus"
                                    name="act_status"
                                    value={ activityStatusOptions[activity.activity_status].status || activity.activity_status || "N/A" }
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:w-1/4 sm:w-full w-full">
                            <ActivityQrCode activity={activity} activityType={activityTypeOptions}/>
                        </div>
                    </div>
                    <div className="flex md:flex-row sm:flex-col flex-col items-start justify-between gap-3">
                        <div className="flex flex-col text-start items-start gap-1 w-full">
                            <h2 className="text-xl ">Attendees</h2>
                            {/* <p>Manage the employee’s dependents below — add or remove as needed.</p> */}
                        </div>
                        <div className="flex flex-col items-end w-full">
                            <AddAttendeeDialog/>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <AttendeeTable />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
