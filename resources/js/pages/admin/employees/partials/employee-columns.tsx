import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
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

export type Employee = {
    emp_details: any
    public_id: string
    name: string
    departments: any
    emp_class: string
}

interface EmployeeListPageProps{
    empClasses: Record<string, string>;
}

function ActionMenu({ employee }: { employee: Employee }) {
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
                {/* <Link href={route('employee.details',{ id: employee.public_id })}><Edit className="h-4 w-4 mr-2" /> Edit</Link> */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => console.log("Delete", employee.public_id)}
                className="cursor-pointer text-red-600"
            >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({row}) => {
            const empDetail = row.original.emp_details;
            const middleInitial = empDetail.middle_name
                ? `${empDetail.middle_name.charAt(0)}.` // Example: "A."
                : "";
            const fullName = [
                empDetail.first_name,
                middleInitial,
                empDetail.last_name,
                empDetail.suffix,
            ].filter(Boolean).join(" ");
            return fullName
        }
    },
    {
        // accessorKey: "dept_id",
        header: "Department",
        cell: ({row}) => {
            return row.original.departments?.dept_name || "data unavailable";
        }
    },
    {
        accessorKey: "emp_class",
        header: "Classification",
        cell: ({ row, table }) => {
            const empClass = row.original.emp_class;
            const empClasses = (table.options.meta as EmployeeListPageProps | undefined)?.empClasses || {};
            return empClasses[empClass] || empClass; // ✅ Will now display "Bioseed" or "Agency"
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionMenu employee={row.original} />,
    },
]
