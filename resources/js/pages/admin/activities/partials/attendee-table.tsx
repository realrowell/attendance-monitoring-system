import { DataTable } from "@/components/data-table"
import { columns, Attendance } from "./attendee-column"
import { usePage } from "@inertiajs/react";

interface AttendeeTableProps extends Record<string, any> {
    // employees: any[];
    empClasses: Record<string, string>;
    suffixes: Record<string, string>
    departments: any;
    attendances: any;
}

export default function AttendeeTable() {
    const { empClasses, suffixes, attendances } = usePage<AttendeeTableProps>().props;
    // console.log(attendances);

    return (
        <div className=" w-full">
            {/* <h2 className="text-lg font-semibold mb-4">Employee List</h2> */}
            <DataTable columns={columns} data={attendances} meta={{ empClasses, suffixes }} />
        </div>
    )
}
