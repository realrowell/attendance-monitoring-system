import { DataTable } from "@/components/data-table"
import { columns, Employee } from "./employee-columns"
import { usePage } from "@inertiajs/react";

interface DepartmentTableProps extends Record<string, any> {
    employees: any[];
    empClasses: Record<string, string>;
}

export default function EmployeeTable() {
    const { employees, empClasses } = usePage<DepartmentTableProps>().props;
    console.log(employees);

    return (
        <div className="p-6">
            {/* <h2 className="text-lg font-semibold mb-4">Employee List</h2> */}
            <DataTable columns={columns} data={employees} meta={{ empClasses }} />
        </div>
    )
}
