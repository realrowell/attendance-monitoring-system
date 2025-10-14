import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import EmployeeTable from "@/pages/admin/employees/employee-table"
import AddEmployeeDialog from "@/pages/admin/employees/add-employee-dialog"

interface EmployeeListPageProps extends Record<string, any> {
    suffixes: Record<string, string>;
    empClasses: Record<string, string>;
    departments: any[];
}

export default function EmployeeList(){
    const { suffixes, empClasses, departments } = usePage<EmployeeListPageProps>().props;

    return (
        <AuthenticatedLayout
            header="Employee List"
        >
            <Head title="Employees" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full">
                    <div className="flex flex-row items-center justify-end p-6">
                        <AddEmployeeDialog
                            suffixes={suffixes}
                            empClasses={empClasses}
                            departments={departments}
                        />
                    </div>
                    <EmployeeTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
