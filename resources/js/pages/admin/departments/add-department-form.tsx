import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';

interface FormData {
    deptName: string
}

interface FormProps {
    onSubmit: (data: FormData) => Promise<void> | void;
}

const AddDepartmentForm: React.FC<FormProps> = ({ onSubmit }) => {
    const [deptName, setDeptName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
        await onSubmit({ deptName });
            setDeptName(''); // reset form after submit
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className='flex flex-col w-full gap-2'>
                <label htmlFor="name">Department Name</label>
                <div className="flex flex-row w-full gap-2">
                    <Input
                        id="deptName"
                        name="deptName"
                        type="text"
                        placeholder="Input department name here."
                        value={deptName}
                        onChange={(e) => setDeptName(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
            </div>
            <Button type='submit'>{isSubmitting ? "Submitting..." : "Submit"}</Button>
        </form>
    );
};

export default AddDepartmentForm;
