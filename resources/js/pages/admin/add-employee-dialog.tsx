import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import AddEmployeeForm from "@/pages/admin/add-employee-form";

export default function AddEmployeeDialog(){
    return(
        <Dialog>
            <DialogTrigger>
                <Button >Add Employee</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
                {/* <AddEmployeeForm onSubmit={''}/> */}
            </DialogContent>
        </Dialog>
    );
}
