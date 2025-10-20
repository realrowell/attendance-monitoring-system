import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import EmployeeQrScanner from '@/components/employee-qr-scanner';
import AddAttendeeForm from './add-attendee-form';

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
                onOpenChange(false);
                // setAlertOpen(true);
            },
            onError: (errors) => {
                console.error(errors);
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
                {/* <AttendeeForm onSubmit={handleFormSubmit}/> */}
                {/* <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
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
                </AlertDialog> */}
            </DialogContent>
        </Dialog>
        </>
    );
}
