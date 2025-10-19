import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import AddDependentForm from "./add-dependent-form";

interface AddDependentDialogProps {
    depdTypes: Record<string, string>;
    empId: string;
}

const AddDependentDialog: React.FC<AddDependentDialogProps> = ({
        depdTypes, empId
    }) => {
        const [formOpen, setFormOpen] = useState(false);
        const [alertOpen, setAlertOpen] = useState(false);

        const handleFormSubmit = async (formData: {
            fullName: string;
            depdType: string | null;
            isActive: boolean;
        }) => {
            // Append the empId here before sending
            const payload = { ...formData, empId };

            console.log("Submitting to backend:", payload);

            router.post(route("create.dependent"), payload, {
                onSuccess: () => {
                    console.log("Dependent added successfully!");
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
                <Button>Add Dependent</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add Dependent</DialogTitle>
                <DialogDescription>
                    Fill out the Dependent details below.
                </DialogDescription>
                </DialogHeader>

                <AddDependentForm
                    onSubmit={handleFormSubmit}
                    depdTypes={depdTypes}
                />
                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Success!</AlertDialogTitle>
                        <AlertDialogDescription>
                        Dependent was added successfully.
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

export default AddDependentDialog;
