import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import axios from "axios";

interface FormData{
    searchInput: string;
}
interface FormProps {
    onSubmit: (data: FormData) => Promise<void> | void;
}

export default function AddAttendeeManualDialog(){
    const [ open, onOpenChange ] = useState(false);
    const [ formData, setformData ] = useState<FormData>({searchInput: ""});

    const handleFormSubmit = async(e: FormEvent) => {
        e.preventDefault();

    }

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
                <Input type="text" name="searchEmp" id="searchEmployee"></Input>
            </DialogContent>
        </Dialog>
    );
}
