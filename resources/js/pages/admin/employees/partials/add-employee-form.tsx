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
    fname: string;
    mname: string;
    lname: string;
    suffix: string;
    deptId: string;
    empClass: string;
    isActive: boolean;
}

interface FormProps {
    onSubmit: (data: FormData) => Promise<void> | void;
    suffixes: Record<string, string>;
    empClasses: Record<string, string>;
    departments: any[];
}

const AddEmployeeForm: React.FC<FormProps> = ({ onSubmit, suffixes, empClasses, departments }) => {
    const [formData, setFormData] = useState<FormData>({ fname: '', mname: '', lname: '', suffix: '', deptId: '', empClass: '', isActive: true, });
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
            setFormData({ fname: '', mname: '', lname: '', suffix: '', deptId: '', empClass: '', isActive: true }); // reset form if needed
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false); // re-enable button
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className='flex flex-col w-full gap-2'>
                <label htmlFor="name">Name</label>
                <div className="flex flex-row w-full gap-2">
                    <Input
                        id="fname"
                        name="fname"
                        type="text"
                        placeholder="First name"
                        value={formData.fname}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        required
                    />
                    <Input
                        id="lname"
                        name="lname"
                        type="text"
                        placeholder="Last name"
                        value={formData.lname}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="flex flex-row w-full gap-2">
                    <Input
                        id="mname"
                        name="mname"
                        type="text"
                        placeholder="Middle name"
                        value={formData.mname}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                    <Select
                        value={formData.suffix}                // controlled value
                        onValueChange={(value) =>              // called when user selects an option
                            setFormData((prev) => ({
                            ...prev,
                            suffix: value,                     // update the field
                            }))
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Suffix" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='null'>N/A</SelectItem>
                            {suffixes &&
                                Object.entries(suffixes).map(([key, label]) => (
                                <SelectItem key={label} value={label}>{label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-row w-full gap-3">
                <div className="flex flex-col w-1/2 gap-2">
                    <label htmlFor="deptId">Department</label>
                    <Select
                        value={formData.deptId}                // controlled value
                        onValueChange={(value) =>              // called when user selects an option
                            setFormData((prev) => ({
                            ...prev,
                            deptId: value,                     // update the field
                            }))
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments?.map((dept) => (
                                <SelectItem key={dept.public_id} value={dept.public_id}>
                                    {dept.dept_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {/* <select
                        id="deptId"
                        name="deptId"
                        value={formData.suffix}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    >
                        <option value="">-- Select Suffix --</option>

                        {departments &&
                            Object.entries(departments).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                        ))}
                    </select> */}
                </div>
                <div className="flex flex-col w-1/2 gap-2">
                    <label htmlFor="name">Classification</label>
                    <Select
                        value={formData.empClass}                // controlled value
                        onValueChange={(value) =>              // called when user selects an option
                            setFormData((prev) => ({
                            ...prev,
                            empClass: value,                     // update the field
                            }))
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            {empClasses &&
                                Object.entries(empClasses).map(([key, label]) => (
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

export default AddEmployeeForm;
