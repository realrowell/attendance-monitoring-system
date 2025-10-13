import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import EmployeeTable from "@/pages/admin/employee-table"
import AddEmployeeDialog from "@/pages/admin/add-employee-dialog"

export default function EmployeeList(){
    return (
        <AuthenticatedLayout
            header="Employee List"
        >
            <Head title="Employees" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full">
                    <AddEmployeeDialog/>
                    <EmployeeTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
