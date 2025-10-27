import { DataTable } from "@/components/data-table"
import { columns, attEmployees } from "./att-employees-column"
import { usePage } from "@inertiajs/react";
import React from "react";
import { Input } from "@/components/ui/input";

interface AttendeeTableProps extends Record<string, any> {
    // employees: any[];
    empClasses: Record<string, string>;
    suffixes: Record<string, string>
    departments: any;
    attEmployees: any;
    partTypeOptions: any;
}

export default function AttendeeTable() {
    const { empClasses, suffixes, attEmployees, partTypeOptions } = usePage<AttendeeTableProps>().props;
    // console.log(attendances);
    // const [filter, setFilter] = React.useState("");

    // const filteredData = attendances.filter((item: any) => {
    //     const ref = item.ref?.toLowerCase() || "";
    //     const title = item.activities?.activity_title?.toLowerCase() || "";
    //     const name = item.att_employees?.employees?.emp_details?.first_name?.toLowerCase() || "";
    //     return (
    //     ref.includes(filter.toLowerCase()) ||
    //     title.includes(filter.toLowerCase()) ||
    //     name.includes(filter.toLowerCase())
    //     );
    // });

    return (
        <div className=" w-full">
            {/* <Input
                placeholder="Search..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-60"
            /> */}
            <DataTable columns={columns} data={attEmployees} meta={{ empClasses, suffixes, partTypeOptions }} />
        </div>
    )
}
