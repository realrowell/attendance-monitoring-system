import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePage } from '@inertiajs/react';
import { DateTime } from 'luxon';
import { DateTimePicker } from '@/components/ui/date-time-picker';


interface AddActivityFormProp extends Record<string, any>{
    onSubmit: (data: FormData) => Promise<void> | void;
    activity: any;
    activityStatusOptions: Record<string, ActivityStatusOption>;
    activityTypeOptions: Record<string, activityTypeOptions>;
}

interface FormData {
    activityName: string;
    activityDesc: string;
    activityType: string;
    activityStatus: string;
    dateTime: DateTime | string | null;
}

interface ActivityStatusOption {
    present: string;
    status: string;
}

interface activityTypeOptions {
    label: string;
    alt: string[];
}


const AddActivityForm: React.FC<AddActivityFormProp> = ({ onSubmit, activityStatusOptions, activityTypeOptions }) => {

    const [formData, setFormData] = useState<FormData>({ activityName: '', activityDesc: '', activityType: '', activityStatus: '', dateTime: null });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value, // dynamically update the field by name
        }));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // console.log(formData);
        setIsSubmitting(true); // disable button
        try {
            await onSubmit(formData); // run parent callback (can be async)
            setFormData({ activityName: '', activityDesc: '', activityType: '', activityStatus: '', dateTime: null }); // reset form if needed
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false); // re-enable button
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className='flex flex-col w-full gap-3'>
                <div className="flex flex-col gap-1">
                    <label htmlFor="title">Activity Title</label>
                    <div className="flex flex-row w-full gap-2">
                        <Input
                            id="title"
                            name="activityName"
                            type="text"
                            placeholder="title"
                            onChange={handleChange}
                            value={formData.activityName}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description">Description</label>
                    <div className="flex flex-row w-full gap-2">
                        <Textarea
                            id="description"
                            name="activityDesc"
                            placeholder="Fdescription"
                            onChange={handleChange}
                            value={formData.activityDesc}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1 md:w-1/2 sm:w-full w-full">
                    <label htmlFor="datetime">Date and Time</label>
                    <Input
                        id='datetime'
                        type="datetime-local"
                        name="dateTime"
                        value={
                            formData.dateTime
                            ? (formData.dateTime instanceof DateTime
                                ? formData.dateTime.toFormat("yyyy-LL-dd'T'HH:mm")
                                : formData.dateTime)
                            : ""
                        }
                        onChange={(e) =>
                            setFormData(prev => ({
                            ...prev,
                            dateTime: e.target.value, // keep string
                            }))
                        }
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label htmlFor="description">Type</label>
                        <Select
                            value={formData.activityType}                // controlled value
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, activityType: value }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(activityTypeOptions).map(([key, type]) => (
                                    <SelectItem className='cursor-pointer' key={key} value={key}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label htmlFor="description">Status</label>
                        <Select
                            value={formData.activityStatus}                // controlled value
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, activityStatus: value }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(activityStatusOptions).map(([key, status]) => (
                                    <SelectItem className='cursor-pointer' key={key} value={key}>
                                        {status.status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <Button type='submit'>{isSubmitting ? "Submitting..." : "Submit"}</Button>
        </form>
    );
}

export default AddActivityForm;
