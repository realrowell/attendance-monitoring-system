import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddDepartmentForm from "@/pages/admin/departments/add-department-form";
import { router } from '@inertiajs/react';

export default function AddDepartmentDialog(){
    const handleFormSubmit = async (data: any) => {
        // console.log("Form submitted:", data);
        router.post(route('create.department'), data, {
        onSuccess: () => {
            console.log('Department added successfully!');
        },
        onError: (errors) => {
            console.error(errors);
        },
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Department</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add Department</DialogTitle>
                <DialogDescription>
                    Fill out the department details below.
                </DialogDescription>
                </DialogHeader>

                <AddDepartmentForm onSubmit={handleFormSubmit}/>
            </DialogContent>
        </Dialog>
    );
}
