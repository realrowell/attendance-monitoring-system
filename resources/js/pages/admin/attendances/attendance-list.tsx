import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import { DateTime } from "luxon";
import AddAttendanceDialog from "./partials/add-attendance-dialog";

// interface Attendances {
//     ref: string;
//     activities: any;
//     date_time: DateTime;
//     mop: any;
// }

// interface AttendanceListPageProps extends Record<string, any> {
//     attendances: Attendances[];
//     partTypeOptions: any;
// }

export default function AttendanceList(){
    // const { attendances, partTypeOptions } = usePage<AttendanceListPageProps>().props;

    return (
        <AuthenticatedLayout
            header="Attendance List"
        >
            <Head title="Attendances" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full">
                    <div className="flex flex-row items-center justify-between p-6">
                        <div className="flex flex-col text-start items-start gap-1">
                            <h2 className="text-2xl ">Attendance List</h2>
                            <p>View the list of attendances here.</p>
                        </div>
                        <AddAttendanceDialog/>
                    </div>
                    {/* <ActivityTable /> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
