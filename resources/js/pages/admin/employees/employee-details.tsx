import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import EmployeeQRCode from "./partials/employee-qr-code";

export type Employee = {
    emp_details: any
    public_id: string
    name: string
    departments: any
    emp_class: string
    suffix: string
}

interface EmployeeDetailsPageProps extends Record<string, any> {
    suffixes: Record<string, string>;
    empClasses: Record<string, string>;
    departments: any[];
    employee: Employee;
}

export default function EmployeeDetails(){
    const { suffixes, empClasses, departments, employee } =
        usePage<EmployeeDetailsPageProps>().props;

    const empDetail = employee.emp_details;

    // ✅ Compute the middle initial if middle name exists
    const middleInitial = empDetail.middle_name
        ? `${empDetail.middle_name.charAt(0)}.` // "A."
        : "";

    // ✅ Use the lookup table directly from props
    const suffixLabel =
        suffixes[empDetail.suffix] || empDetail.suffix || "";

    // ✅ Construct the full name
    const fullName = [
        empDetail.first_name,
        middleInitial,
        empDetail.last_name,
        suffixLabel,
    ].filter(Boolean).join(" ");

    // ✅ Use the lookup table directly from props
    const empClassLabel = empClasses[employee.emp_class] || employee.emp_class || "";

    return (
        <AuthenticatedLayout
            header="Employee List"
        >
            <Head title="Employees" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full p-6 flex flex-col gap-10">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col text-start items-start gap-1">
                            <h2 className="text-2xl ">Employee Details</h2>
                            <p>The employee’s information is displayed below. You may review or update the details as needed.</p>
                        </div>

                    </div>
                    <div className="flex md:flex-row sm:flex-col flex-col gap-5 items-start">
                        <div className="flex flex-col md:w-1/4 sm:w-full w-full gap-5">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="FullName">Name</Label>
                                <Input
                                    id="FullName"
                                    name="fullname"
                                    value={fullName}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="Department">Department</Label>
                                <Input
                                    id="Department"
                                    name="department"
                                    value={employee.departments.dept_name}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="Department">Employee Classification</Label>
                                <Input
                                    id="Department"
                                    name="department"
                                    value={empClassLabel}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:w-1/4 sm:w-full w-full">
                            <EmployeeQRCode employee={employee} suffixes={suffixes} />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col text-start items-start gap-1">
                            <h2 className="text-2xl ">Dependents</h2>
                            <p>Manage the employee’s dependents below — add or remove as needed.</p>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
