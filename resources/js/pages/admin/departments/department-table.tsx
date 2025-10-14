import { DataTable } from "@/components/data-table"
import { columns, Departments } from "./dept-columns"
import { usePage } from "@inertiajs/react";

interface DepartmentTableProps extends Record<string, any> {
    departments: any[];
}

export default function DepartmentTable(){
    const { departments } = usePage<DepartmentTableProps>().props;
    // const data: Departments[] = [
    //         { id: 1, name: "Alice", email: "alice@example.com" },
    //         { id: 2, name: "Bob", email: "bob@example.com" },
    //         { id: 3, name: "Charlie", email: "charlie@example.com" },
    //     ]

    return (
        <div className="p-6">
            {/* <h2 className="text-lg font-semibold mb-4">Employee List</h2> */}
            <DataTable columns={columns} data={departments} />
        </div>
    );
}

