import { DataTable } from "@/components/data-table"
import { columns, registeredEmployees } from "./att-employees-column"
import { usePage } from "@inertiajs/react";
import React from "react";
import { Input } from "@/components/ui/input";

interface AttendeeTableProps extends Record<string, any> {
    // employees: any[];
    empClasses: Record<string, string>;
    suffixes: Record<string, string>
    departments: any;
    registeredEmployees: any;
    partTypeOptions: any;
}

export default function AttendeeTable() {
    const { empClasses, suffixes, registeredEmployees, partTypeOptions } = usePage<AttendeeTableProps>().props;

    return (
        <div className="overflow-x-auto max-w-[80vw]">
            <DataTable columns={columns} data={registeredEmployees} meta={{ empClasses, suffixes, partTypeOptions }} />
        </div>
    )
}
