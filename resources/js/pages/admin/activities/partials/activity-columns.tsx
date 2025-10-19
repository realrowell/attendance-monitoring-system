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
import { DateTime } from "luxon";

export type Activity = {
    activityName: string;
    activityDesc: string;
    activityType: string;
    activityStatus: string;
    ref: string;
    dateTime: DateTime;
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
    // {
    //     accessorKey: "emp_class",
    //     header: "Classification",
    //     cell: ({ row, table }) => {
    //         const empClass = row.original.emp_class;
    //         const empClasses = (table.options.meta as EmployeeListPageProps | undefined)?.empClasses || {};
    //         return empClasses[empClass] || empClass;
    //     },
    // },
    // {
    //     id: "actions",
    //     header: "Actions",
    //     cell: ({ row }) => <ActionMenu employee={row.original} />,
    // },
]
