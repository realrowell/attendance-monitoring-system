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

export type attDependents = {
    ref: string;
    activities: any;
    date_time: any;
    mop: string;
    dependents: any;
    attendances: any;
    full_name: string;
}
export type Attendances = {
    ref: string;
    activities: any;
    date_time: string;
    mop: string;
    is_raffle: string;
    att_employees: attDependents;
}

interface DependentsListPageProps{
    attDependents: any;
    partTypeOptions: any;
}

function ActionMenu({ attendance }: { attendance: attDependents }) {
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
                <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => console.log("Delete", attendance.ref)}
                className="cursor-pointer text-red-600"
            >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}

export const columns: ColumnDef<attDependents>[] = [
    {
        accessorKey: "ref",
        header: "Attendance Ref",
        cell: ({row}) => {
            return row.original?.attendances?.ref || "data unavailable";
        }
    },
    {
        accessorKey: "dependents.full_name",
        header: "Name",
        enableGlobalFilter: true,
        cell: ({row}) => {
            return row.original?.full_name ?? null;
        }
    },
    {
        accessorKey: "date_time",
        header: "Timestamp",
        cell: ({row}) => {
            return row.original?.attendances?.date_time ?? null;
        }
    },
    {
        accessorKey: "attendances.mop",
        header: "Mode of Participation",
        cell: ({ row, table }) => {
            const partTypes = (table.options.meta as DependentsListPageProps | undefined)?.partTypeOptions || {};
            return partTypes[row.original?.attendances?.mop]?.label || row.original?.attendances?.mop || "—";
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionMenu attendance={row.original} />,
    },
]
