import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import AddAttendeeFormDialog from "./add-attendees-dialog-form";

interface FormData{
    searchEmployee: string;
}
interface FormProps {
    onSubmit: (data: FormData) => Promise<void> | void;
}

interface AddAttendeeManualDialog extends Record<string, any>{
    partTypeOptions: any;
    activities: any;
}

export default function AddAttendeeManualDialog(){
    const { partTypeOptions, activity } = usePage<AddAttendeeManualDialog>().props;
    const [ open, onOpenChange ] = useState(false);
    const [ formData, setFormData ] = useState<FormData>({searchEmployee: ''});
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ employeeData, setEmployeeData ] = useState<any | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [attendeeFormDialog, setAttendeeFormDialog] = useState(false);

    const handleFormSubmit = async(e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const response = await axios.get(`/api/v1/employee/getByName/${formData.searchEmployee}`);
            console.log(response);
            setEmployeeData(response.data);
        }
        catch (err){
            console.log(err);
        }
        finally{
            setIsSubmitting(false);
        }
    }
    const handleChange = (  e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value, // dynamically update the field by name
        }));
    }

    const handleEmployeeData = (employeeData: any) => {
        setSelectedEmployee(employeeData);
        onOpenChange(false);
        setAttendeeFormDialog(true);
    };

    const handleManualSelect = async (empId: number) => {
        console.log("Selected Employee ID:", empId);
        try {
            // const response = await axios.get(`/api/v1/employee/details/${empId}`);
            handleEmployeeData(empId); // ✅ reuse existing logic
        } catch (error) {
            // console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>Manual Search</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manual Search</DialogTitle>
                    <DialogDescription>
                        Search employee name here.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFormSubmit} className="flex flex-row gap-3">
                    <Input
                        type="text"
                        name="searchEmployee"
                        id="searchEmp"
                        onChange={handleChange}
                        value={formData.searchEmployee}
                        required>
                    </Input>
                    <Button type='submit'>{isSubmitting ? "Searching..." : "Search"}</Button>
                </form>
                {employeeData && employeeData.map((emp: any) => (
                    <Card
                        key={emp.id}
                        className="cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => handleManualSelect(emp)}
                    >
                        <CardHeader>
                        <CardTitle className="text-base">
                            {emp.emp_details.first_name} {emp.emp_details.last_name}
                        </CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </DialogContent>
            {selectedEmployee && (
                <AddAttendeeFormDialog
                    open={attendeeFormDialog}
                    onOpenChange={setAttendeeFormDialog}
                    employee={selectedEmployee}
                    onSubmit={handleFormSubmit}
                    partTypeOptions={partTypeOptions}
                    activity={activity}
                />
            )}
        </Dialog>
    );
}
