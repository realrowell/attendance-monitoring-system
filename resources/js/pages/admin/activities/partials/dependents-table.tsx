import { DataTable } from "@/components/data-table"
import { columns, attDependents } from "./att-dependent-column"
import { usePage } from "@inertiajs/react";
import React from "react";
import { Input } from "@/components/ui/input";

interface DependentsTableProps extends Record<string, any> {
    attDependents: any;
    partTypeOptions: any;
}

export default function DependentsTable() {
    const { attDependents, partTypeOptions, suffixes } = usePage<DependentsTableProps>().props;
    // console.log(attendances);
    // const [filter, setFilter] = React.useState("");

    // const filteredData = attendances.filter((item: any) => {
    //     const ref = item.ref?.toLowerCase() || "";
    //     const title = item.activities?.activity_title?.toLowerCase() || "";
    //     const name = item.att_employees?.employees?.emp_details?.first_name?.toLowerCase() || "";
    //     return (
    //     ref.includes(filter.toLowerCase()) ||
    //     title.includes(filter.toLowerCase()) ||
    //     name.includes(filter.toLowerCase())
    //     );
    // });

    return (
        <div className=" w-full">
            {/* <Input
                placeholder="Search..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-60"
            /> */}
            <DataTable columns={columns} data={attDependents} meta={{ partTypeOptions }}/>
        </div>
    )
}
