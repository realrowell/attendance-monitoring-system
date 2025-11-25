import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";
import React from "react";
import axios from "axios";


interface RegisteredEmployeesProps extends Record<string, any>{
    employees: any;
    registeredEmployees: any;
    activity: any;
}


export default function RegisterEmployeeDialog(){
    const { employees, registeredEmployees, activity } = usePage<RegisteredEmployeesProps>().props;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    // console.log(activity);
    const [localEmployees, setLocalEmployees] = React.useState<any[]>(employees ?? []);
    const handleRegister = async (employeeId: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("/api/v1/activity/register-attendee", {
                emp_id: Array.isArray(employeeId) ? employeeId : [employeeId],
                activity_ref: activity.ref,
            });

            console.log(response.data);

            // remove registered employee(s) from the local list so the UI updates immediately
            const employeeIds = Array.isArray(employeeId) ? employeeId : [employeeId];
            setLocalEmployees(prev =>
                prev.filter(e => !employeeIds.some(id => id === e.public_id || id === e.id))
            );

            // OPTIONAL: refresh the page after successful register
            // location.reload();

        } catch (err) {
            const error = err as any;
            console.error(error?.response?.data ?? error?.message ?? error);
            setError(error?.response?.data?.message ?? error?.message ?? 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Register Employees</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Register Employees</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[60vh] p-2">
                    {localEmployees && (localEmployees.length > 0) ? (
                        localEmployees.map((employee: any) => {
                            const isRegistered = registeredEmployees.some((regEmp: any) => regEmp.emp_id === employee.id);
                            return (
                                <React.Fragment key={employee.id}>
                                    {!isRegistered ? (
                                        <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg min-w-[300px] max-w-[300px]">
                                            <div>
                                                <p className="font-medium">{employee.emp_details?.first_name} {employee.emp_details?.last_name}</p>
                                                <p className="text-sm text-muted-foreground">{employee.departments.dept_name}</p>
                                            </div>
                                            <Button onClick={() => handleRegister(employee.public_id)} disabled={isRegistered || loading}>
                                                {isRegistered ? "Registered" : "Register"}
                                            </Button>
                                        </div>
                                    ) : ('')}
                                </React.Fragment>
                            );
                        })
                    ) : ('No employees available to register.')}
                </div>
            </DialogContent>
        </Dialog>
    );
}
