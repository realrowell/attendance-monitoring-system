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
import { Link, router, usePage } from '@inertiajs/react';
import { DateTime } from "luxon";

export type Activity = {
    activity_name: string;
    activity_desc: string;
    activity_type: string;
    activity_status: string;
    ref: string;
    dateTime: DateTime;
}

interface Meta {
    activityStatusOptions: any;
    activityTypeOptions: any;
}

function ActionMenu({ activity }: { activity: Activity }) {
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
                onClick={() => console.log("Delete", activity.ref)}
                className="cursor-pointer text-red-600"
            >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}

export const columns: ColumnDef<Activity>[] = [
    {
        accessorKey: "ref",
        header: "Reference"
    },
    {
        accessorKey: "activity_name",
        header: "Name"
    },
    {
        accessorKey: "date_time",
        header: "Date Time",
    },
    {
        accessorKey: "activity_type",
        header: "Type",
        cell: ({ row, table }) => {
            const activityType = row.original.activity_type;
            const activityTypes = (table.options.meta as Meta | undefined)?.activityTypeOptions || {};
            return activityTypes[activityType].label || activityType;
        },
    },
    {
        accessorKey: "activity_status",
        header: "Status",
        cell: ({ row, table }) => {
            const activityStatus = row.original.activity_status;
            const activityStatuses = (table.options.meta as Meta | undefined)?.activityStatusOptions || {};
            return activityStatuses[activityStatus].status || activityStatus;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionMenu activity={row.original} />,
    },
]
