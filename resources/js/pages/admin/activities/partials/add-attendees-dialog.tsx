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
import AddAttendeeFormDialog from "./add-attendees-dialog-form";


interface AddAttendeeDialogProp extends Record<string, any>{
    partTypeOptions: any;
    activities: any;
}

export default function AddAttendeeDialog(){
    const { partTypeOptions, activity } = usePage<AddAttendeeDialogProp>().props;
    const [employee, setEmployee] = useState<any | null>(null);
    const [qrScanDialog, setQrScanDialog] = useState(false);
    const [attendeeFormDialog, setAttendeeFormDialog] = useState(false);

    const handleFormSubmit = async (data: any) => {
        // console.log(data);
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
    const handleEmployeeData = (employeeData: any) => {
        setEmployee(employeeData);
        setQrScanDialog(false);
        setAttendeeFormDialog(true);
    };

    return (
        <>
        <Dialog open={qrScanDialog} onOpenChange={setQrScanDialog}>
            <DialogTrigger asChild>
                <Button>QR Scanner</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add Attendee</DialogTitle>
                <DialogDescription>
                    Fill out the attendee details below.
                </DialogDescription>
                </DialogHeader>
                    <EmployeeQrScanner onEmployeeFound={handleEmployeeData}/>
            </DialogContent>
        </Dialog>
        <AddAttendeeFormDialog
            open={attendeeFormDialog}
            onOpenChange={setAttendeeFormDialog}
            employee={employee}
            onSubmit={handleFormSubmit}
            partTypeOptions={partTypeOptions}
            activity={activity}
        />
        </>
    );
}
