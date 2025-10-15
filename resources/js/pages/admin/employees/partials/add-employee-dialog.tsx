import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddEmployeeForm from "@/pages/admin/employees/partials/add-employee-form";
import { router } from '@inertiajs/react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface AddEmployeeDialogProps {
    suffixes: Record<string, string>;
    empClasses: Record<string, string>;
    departments: any[];
}

const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({
        suffixes,
        empClasses,
        departments,
    }) => {
        const [formOpen, setFormOpen] = useState(false);
        const [alertOpen, setAlertOpen] = useState(false);
        const handleFormSubmit = async (data: any) => {
        // console.log("Form submitted:", data);
        router.post(route('create.employee'), data, {
            onSuccess: () => {
                console.log('Employee added successfully!');
                // setFormOpen(false);
                setAlertOpen(true);
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogTrigger asChild>
                <Button>Add Employee</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogDescription>
                    Fill out the employee details below.
                </DialogDescription>
                </DialogHeader>

                <AddEmployeeForm
                    onSubmit={handleFormSubmit}
                    suffixes={suffixes}
                    empClasses={empClasses}
                    departments={departments}
                />
                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Success!</AlertDialogTitle>
                        <AlertDialogDescription>
                        Employee was added successfully.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => [setAlertOpen(false),setFormOpen(false)]}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DialogContent>
        </Dialog>
    );
};

export default AddEmployeeDialog;
