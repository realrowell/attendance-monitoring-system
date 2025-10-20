import { QRCodeCanvas } from "qrcode.react";
import { usePage } from "@inertiajs/react";

interface Activity {
    ref: string;
    activity_name: string;
    activity_desc: string;
    date_time: string | number | readonly string[] | undefined;
    activity_status: string;
    activity_type: string;
}

interface ActivityDetailsProps extends Record<string, any> {
    activity: Activity;
    activityType: any;
}

export default function EmployeeQRCode({ activity, activityType }: ActivityDetailsProps ) {

    const payload = {
        ref: activity.ref,
        activity: activity.activity_name,
        description: activity.activity_desc,
        date_time: activity.date_time,
        activity_type: activityType[activity.activity_type].label || activity.activity_type || "N/A"
    };

    return (
        <div className="flex flex-col items-center">
            <QRCodeCanvas
                value={JSON.stringify(payload, null, 2)}
                size={250}
                includeMargin={true}
            />

            <p className="mt-2 text-xl text-gray-400">{activity.activity_name}</p>
        </div>
    );
}
