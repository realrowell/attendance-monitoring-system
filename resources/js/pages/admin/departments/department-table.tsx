import { DataTable } from "@/components/data-table"
import { columns, Departments } from "./dept-columns"
import { usePage } from "@inertiajs/react";

interface DepartmentTableProps extends Record<string, any> {
    departments: any[];
}

export default function DepartmentTable(){
    const { departments } = usePage<DepartmentTableProps>().props;

    return (
        <div className="p-6">
            <DataTable columns={columns} data={departments} />
        </div>
    );
}

