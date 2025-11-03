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

// const AddActivityFormTyped: any = AddActivityForm;


interface Attendance{
    ref: string;
    activities: any;
    date_time: DateTime;
    mop: any;
}

interface AddAttendanceDialogProp extends Record<string, any>{
    attendance: Attendance[];
    partTypeOptions: any;
}

export default function AddAttendanceDialog(){
    const { attendance, partTypeOptions } = usePage<AddAttendanceDialogProp>().props;
    console.log(partTypeOptions);
    const handleFormSubmit = async (data: any) => {
        console.log(data);
        // router.post(route('create.activity'), data, {
        //     onSuccess: () => {
        //         console.log('Attendance added successfully!');
        //         // setFormOpen(false);
        //         // setAlertOpen(true);
        //     },
        //     onError: (errors) => {
        //         console.error(errors);
        //     },
        // });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Attendance</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add Attendance</DialogTitle>
                <DialogDescription>
                    Fill out the attendance details below.
                </DialogDescription>
                </DialogHeader>
                    {/* <EmployeeQrScanner/> */}
                {/* <AddActivityFormTyped
                    onSubmit={handleFormSubmit}
                    activityStatusOptions={activityStatusOptions}
                    activityTypeOptions={activityTypeOptions}
                /> */}
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
    );
}
