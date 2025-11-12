import { DataTable } from "@/components/data-table"
import { columns, attDependents } from "./att-dependent-column"
import { usePage } from "@inertiajs/react";
import React from "react";
import { Input } from "@/components/ui/input";

interface DependentsTableProps extends Record<string, any> {
    attDependents: any;
    partTypeOptions: any;
}

export default function DependentsTable({attDependents, partTypeOptions, }: DependentsTableProps) {

    return (
        <div className="overflow-x-auto max-w-[80vw]">
            <DataTable columns={columns} data={attDependents} meta={{ partTypeOptions }}/>
        </div>
    )
}
