import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import DepartmentTable from "@/pages/admin/departments/department-table";
import AddDepartmentDialog from "@/pages/admin/departments/add-department-dialog";

// interface EmployeeListPageProps extends Record<string, any> {
//     suffixes: Record<string, string>;
//     empClasses: Record<string, string>;
//     departments: any[];
// }

export default function DepartmentList(){
    // const { suffixes, empClasses, departments } = usePage<EmployeeListPageProps>().props;

    return (
        <AuthenticatedLayout
            header="Departments List"
        >
            <Head title="Departments" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full">
                    <div className="flex flex-row items-center justify-between p-6">
                        <div className="flex flex-col text-start items-start gap-1">
                            <h2 className="text-2xl ">Department List</h2>
                            <p>View the list of departments here.</p>
                        </div>
                        <AddDepartmentDialog/>
                    </div>
                    <DepartmentTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
