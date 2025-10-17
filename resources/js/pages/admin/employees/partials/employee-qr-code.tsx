import { QRCodeCanvas } from "qrcode.react";
import { usePage } from "@inertiajs/react";

// 1️⃣ Define the type of your employee
interface Employee {
    public_id: string;
    name: string;
    type?: string; // optional
    emp_details: any;
    suffix?: string;
    departments: any;
}

interface Suffixes {
  [key: string]: string; // 👈 makes it a dictionary (object lookup)
}

// 2️⃣ Define the props type for your component
interface EmployeeQRCodeProps {
    employee: Employee;
    suffixes: Suffixes;
}


export default function EmployeeQRCode({ employee, suffixes }: EmployeeQRCodeProps ) {
    const empDetail = employee.emp_details;

    // ✅ Compute the middle initial if middle name exists
    const middleInitial = empDetail.middle_name
        ? `${empDetail.middle_name.charAt(0)}.` // "A."
        : "";

    // ✅ Use the lookup table directly from props
    const suffixLabel =
        suffixes[empDetail.suffix] || empDetail.suffix || "";

    // ✅ Construct the full name
    const fullName = [
        empDetail.first_name,
        middleInitial,
        empDetail.last_name,
        empDetail.suffix,
    ].filter(Boolean).join(" ");

    const payload = {
        id: employee.public_id,
        name: fullName,
        department: employee.departments.dept_name,
    };

    return (
        <div className="flex flex-col items-center">
            <QRCodeCanvas
                value={JSON.stringify(payload, null, 2)}
                size={300}
                includeMargin={true}
            />

            <p className="mt-2 text-xl text-gray-400">{fullName}</p>
        </div>
    );
}
