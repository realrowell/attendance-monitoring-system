import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";

interface EmployeeListPageProps extends Record<string, any> {
    suffixes: Record<string, string>;
    empClasses: Record<string, string>;
    departments: any[];
}

export default function EmployeeDetails(){
    const { suffixes, empClasses, departments } = usePage<EmployeeListPageProps>().props;

    return (
        <AuthenticatedLayout
            header="Employee List"
        >
            <Head title="Employees" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full">
                    <div className="flex flex-row items-center justify-between p-6">
                        <div className="flex flex-col text-start items-start gap-1">
                            <h2 className="text-2xl ">Employee Details</h2>
                            {/* <p>View the list of employees here.</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
