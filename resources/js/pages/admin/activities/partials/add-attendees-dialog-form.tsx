import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DateTime } from "luxon";
import { router } from '@inertiajs/react';
import AddAttendeeForm from './add-attendee-form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

// const AddActivityFormTyped: any = AddActivityForm;


interface Attendance{
    ref: string;
    // activity_id: string;
    date_time: DateTime;
    mop: any;
    activity: any;
}

interface AddAttendeeFormDialogProp extends Record<string, any>{
    employee: any;
    // attendance: Attendance[];
    partTypeOptions: any;
    activity: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddAttendeeFormDialog({
        open,
        onOpenChange,
        employee,
        onSubmit,
        partTypeOptions,
        activity,
    }: AddAttendeeFormDialogProp){

    const [error, setError] = useState<string | null>(null);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [infoAlertOpen, setInfoAlertOpen] = useState(false);
    const [infoAlertMessage, setInfoAlertMessage] = useState<string | null>(null);

    // console.log(activity);
    const handleFormSubmit = async (data: any) => {
        const finalData = {
            ...data,
            activity_id: activity?.ref ?? null,
            part_type: 'on-site'
        };
        // console.log(finalData);
        router.post(route('create.attendee'), finalData, {
            onSuccess: () => {
                console.log('Attendance added successfully!');
                setError(null); // clear any previous errors
                setSuccessAlertOpen(true);
            },
            onError: (errors) => {
                if (errors?.type === "info") {
                    setInfoAlertOpen(true)
                    setInfoAlertMessage(errors.message)
                }
                else{
                    console.error(errors);
                    const firstError = Object.values(errors)[0] || 'An unexpected error occurred while submitting the form.';
                    setError(String(firstError));
                    setErrorAlertOpen(true);
                }
            },
        });
    }

    return (
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Attendee Form</DialogTitle>
                    <DialogDescription>
                        Fill out the attendee details below.
                    </DialogDescription>
                </DialogHeader>

                <AddAttendeeForm onSubmit={handleFormSubmit} employee={employee}/>

                {/* {error && (
                    // <Alert variant="destructive" className="mt-4">
                    // <TriangleAlert className="h-4 w-4" />
                    // <AlertTitle>Error Encountered!</AlertTitle>
                    // <AlertDescription>{error}</AlertDescription>
                    // </Alert>
                )} */}
                <AlertDialog open={infoAlertOpen} onOpenChange={setInfoAlertOpen}>
                    <AlertDialogContent className="bg-blue-600">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Attendance is already on record.</AlertDialogTitle>
                            <AlertDialogDescription className="text-white/80">
                                {infoAlertMessage}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => [setErrorAlertOpen(false),onOpenChange(false)]}>
                                OK
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog open={errorAlertOpen} onOpenChange={setErrorAlertOpen}>
                    <AlertDialogContent className="bg-destructive">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Error Encountered!</AlertDialogTitle>
                            <AlertDialogDescription className="text-white/80">
                                {error}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => [setErrorAlertOpen(false),onOpenChange(false)]}>
                                OK
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog open={successAlertOpen} onOpenChange={setSuccessAlertOpen}>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Success!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Attendance successully recorded!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => [setSuccessAlertOpen(false),onOpenChange(false)]}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DialogContent>
        </Dialog>
        </>
    );
}
