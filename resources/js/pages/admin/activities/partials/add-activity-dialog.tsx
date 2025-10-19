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
import AddActivityForm from "./add-activity-form";
import { router } from '@inertiajs/react';

const AddActivityFormTyped: any = AddActivityForm;


interface Activity{
    ref: string;
    activity_title: string;
    activity_desc: string;
    date_time: DateTime;
    activity_status: string;
    activity_type: string;
}

interface AddActivityDialogProp extends Record<string, any>{
    activity: Activity;
}

export default function AddActivityDialog(){
    const { activityTypeOptions, activityStatusOptions } = usePage<AddActivityDialogProp>().props;
    // console.log(activityStatusOptions);
    const handleFormSubmit = async (data: any) => {
        console.log(data);
        router.post(route('create.activity'), data, {
            onSuccess: () => {
                console.log('Activity added successfully!');
                // setFormOpen(false);
                // setAlertOpen(true);
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Activity</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add Activity</DialogTitle>
                <DialogDescription>
                    Fill out the activity details below.
                </DialogDescription>
                </DialogHeader>
                <AddActivityFormTyped
                    onSubmit={handleFormSubmit}
                    activityStatusOptions={activityStatusOptions}
                    activityTypeOptions={activityTypeOptions}
                />
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
