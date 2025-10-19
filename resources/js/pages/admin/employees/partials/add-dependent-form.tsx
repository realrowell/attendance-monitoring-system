import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FormData {
    fullName: string;
    depdType: string;
    isActive: boolean;
}

interface FormProps {
    onSubmit: (data: FormData) => Promise<void> | void;
    depdTypes: Record<string, string>;
}

const AddDependentForm: React.FC<FormProps> = ({ onSubmit, depdTypes }) => {
    const [formData, setFormData] = useState<FormData>({ fullName: '', depdType: '', isActive: true, });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
        ...prev,
            [name]: type === "checkbox"
            ? (e.target as HTMLInputElement).checked // ✅ safely cast for checkboxes
            : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true); // disable button
        try {
            await onSubmit(formData); // run parent callback (can be async)
            setFormData({ fullName: '', depdType: '', isActive: true }); // reset form if needed
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false); // re-enable button
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className='flex flex-col w-full gap-3'>
                <label htmlFor="name">Name</label>
                <div className="flex flex-row w-full gap-2">
                    <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="flex flex-row md:w-1/2 sm:w-3/4 w-3/4 gap-2">
                    <Select
                        value={formData.depdType}                // controlled value
                        onValueChange={(value) =>              // called when user selects an option
                            setFormData((prev) => ({
                            ...prev,
                            depdType: value,                     // update the field
                            }))
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Dependent type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="null">N/A</SelectItem>
                            {depdTypes &&
                                Object.entries(depdTypes).map(([key, label]) => (
                                <SelectItem key={key} value={key}>{label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleChange}
                />
                <label htmlFor="isActive" className="font-medium">
                    Active
                </label>
            </div>
            <Button type='submit'>{isSubmitting ? "Submitting..." : "Submit"}</Button>
        </form>
    );
};

export default AddDependentForm;
