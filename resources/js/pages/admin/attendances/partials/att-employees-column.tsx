import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, ExternalLink } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Link, router } from '@inertiajs/react';

export type attEmployees = {
    ref: string;
    activities: any;
    date_time: any;
    mop: string;
    att_employees: any;
    employees: any;
    empDetails: any;
    suffix: string;
    attendances: any;
}

export type Attendances = {
    ref: string;
    activities: any;
    date_time: string;
    mop: string;
    is_raffle: string;
    att_employees: attEmployees;
}

interface EmployeesListPageProps{
    empClasses: Record<string, string>;
    suffixes: Record<string, string>;
    activities: any;
    partTypeOptions: any;
}

function ActionMenu({ attendanceRef }: { attendanceRef: string }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // router.post(
        //     route("update.department"), // your Laravel route name
        //     {
        //         deptId: department.public_id, // send which department to update
        //         dept_name: deptName, // send updated name
        //     },
        //     {
        //         onSuccess: () => {
        //             console.log("Department updated successfully!")
        //             setOpen(false)
        //         },
        //             onError: (errors) => {
        //             console.error("Update failed:", errors)
        //         },
        //     }
        // )
    }

    return (
        <>
        {/* Dropdown menu */}
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
                className="cursor-pointer"
            >
                {/* <Link href={route('employee.details',{ id: att_employees?.attendances?.ref })} className="flex flex-row"><ExternalLink className="h-4 w-4 mr-2" /> View Details</Link> */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => console.log("Delete", attendanceRef)}
                className="cursor-pointer text-red-600"
            >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}

export const columns: ColumnDef<attEmployees>[] = [
    // {
    //     accessorKey: "ref",
    //     header: "Attendance Ref",
    //     cell: ({row}) => {
    //         return row.original?.attendances?.ref || "data unavailable";
    //     }
    // },
    {
        accessorKey: "name",
        header: "Name",
        enableGlobalFilter: true,
        cell: ({row, table}) => {
            const suffix = row.original?.employees?.emp_details?.suffix ?? null;
            const suffixes = (table.options.meta as EmployeesListPageProps | undefined)?.suffixes || {};

            const empDetail = row.original?.employees?.emp_details;
            const middleInitial = empDetail?.middle_name
                ? `${empDetail?.middle_name.charAt(0)}.` // Example: "A."
                : "";
            const fullName = [
                empDetail?.first_name,
                middleInitial,
                empDetail?.last_name,
                suffixes[suffix] || suffix
            ].filter(Boolean).join(" ");
            return fullName
        }
    },
    {
        accessorKey: "departments.dept_name",
        header: "Department",
        cell: ({ row, table }) => {
            return row.original?.employees?.departments?.dept_name ?? null;
        },
    },
    {
        accessorKey: "employees.emp_class",
        header: "Classification",
        cell: ({ row, table }) => {
            const empClass = row.original?.employees?.emp_class ?? null;
            const empClasses = (table.options.meta as EmployeesListPageProps | undefined)?.empClasses || {};
            return empClasses[empClass] || empClass;
        },
    },
    {
        accessorKey: "date_time",
        header: "Timestamp",
        cell: ({ row }) => {
            return row.original?.attendances?.date_time;
        },
    },
    {
        header: "Mode of Participation",
        cell: ({ row, table }) => {
            const partTypes = (table.options.meta as EmployeesListPageProps | undefined)?.partTypeOptions || {};
            return partTypes[row.original?.attendances?.mop]?.label || row.original?.attendances?.mop || "—";
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionMenu attendanceRef={row.original.ref} />,
    },
]
