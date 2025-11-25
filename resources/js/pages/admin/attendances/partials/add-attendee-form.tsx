import React, { useState, FormEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

interface AttDependents {
    depd_id: string;
    depd_is_present: boolean;
}

interface FormData {
    emp_id: string;
    emp_no?: string;
    emp_is_present: boolean;
    dependents: AttDependents[];
}

interface FormProps {
    onSubmit: (data: FormData) => Promise<void> | void;
    employee: any;
}

const AddAttendeeForm: React.FC<FormProps> = ({ onSubmit, employee }) => {
    // console.log(employee);
    const [formData, setFormData] = useState<FormData>({ emp_id: '', emp_no: '', emp_is_present: true, dependents: [],});
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        if (employee) {
            setFormData({
                emp_id: employee.public_id ?? '',
                emp_no: employee.emp_no ?? '',
                emp_is_present: true,
                dependents: employee.dependents.map((depd: any) => ({
                    depd_id: depd.public_id,
                    depd_is_present: false, // default
                })),
            });
        }
    }, [employee]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true); // disable button
        try {
            await onSubmit(formData); // run parent callback (can be async)
            setFormData({ emp_id: '', emp_no: '', emp_is_present: true, dependents: [],}); // reset form if needed
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false); // re-enable button
        }
    };

    // console.log(formData);

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
    const handleDependentChange = (index: number) => {
        setFormData((prev) => {
            const newDependents = [...prev.dependents];
            newDependents[index].depd_is_present = !newDependents[index].depd_is_present;
            return { ...prev, dependents: newDependents };
        });
    };

    const empDetail = employee.emp_details;

    // ✅ Compute the middle initial if middle name exists
    const middleInitial = empDetail.middle_name
        ? `${empDetail.middle_name.charAt(0)}.` // "A."
        : "";

    // ✅ Construct the full name
    const fullName = [
        empDetail?.first_name ?? "",
        middleInitial,
        empDetail?.last_name ?? "",
        empDetail?.suffix ?? ""
    ].filter(Boolean).join(" ");

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className='flex flex-row gap-2'>
                <input
                    id="isPresent"
                    name="emp_is_present"
                    type="checkbox"
                    checked={formData.emp_is_present}
                    onChange={handleChange}
                />
                <label htmlFor="isPresent">{fullName}</label>
            </div>
            <div className="flex flex-col gap-2">
            <h3 className="font-medium">Dependentss</h3>
                {employee.dependents.map((depd: any, index: number) => (
                    <div key={`${depd.public_id}-${index}`} className="flex items-center gap-2">
                        <input
                            id={`dep-${depd.public_id}`}
                            type="checkbox"
                            checked={formData.dependents[index]?.depd_is_present || false}
                            onChange={() => handleDependentChange(index)}
                        />
                        <label htmlFor={`dep-${depd.public_id}`}>{depd.full_name}</label>
                    </div>
                ))}
            </div>
            <Button type='submit'>{isSubmitting ? "Submitting..." : "Submit"}</Button>
        </form>
    );
};

export default AddAttendeeForm;
