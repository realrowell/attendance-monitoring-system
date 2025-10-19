import { usePage } from "@inertiajs/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, Edit, Trash2, ExternalLink } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Link, router } from '@inertiajs/react';
import { useState } from "react"

interface Dependent {
    public_id: string;
    full_name: string;
    depd_type: string;
    is_active: boolean;
}

interface DependentsTableProp extends Record<string, any> {
    dependents: Dependent[];
    dependentTypes: any;
}

function ActionMenu({ dependent }: { dependent: Dependent }){
    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);

    return (
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
                    onClick={() => console.log("Delete", dependent.public_id)}
                    className="cursor-pointer text-red-600"
                >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function DependentTable() {
    const {dependents, dependentTypes} = usePage<DependentsTableProp>().props;

    return (
        <Table>
        {/* <TableCaption>List of employee dependents.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Dependent Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dependents.length > 0 ? (
                    dependents.map((dependent) => (
                        <TableRow key={dependent.public_id}>
                            <TableCell className="font-medium">{dependent.full_name}</TableCell>
                            <TableCell>
                                {dependentTypes[dependent.depd_type] || dependent.depd_type || "Not Available"}
                            </TableCell>
                            <TableCell>
                                {dependent.is_active ? "Active" : "Inactive"}
                            </TableCell>
                            <TableCell className="text-right">
                                <ActionMenu dependent={dependent}/>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                            No dependents found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total Dependents</TableCell>
                    <TableCell className="text-right">{dependents.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
