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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { router } from '@inertiajs/react';


export type Departments = {
  id: number
  public_id: string
  dept_name: string
}

function ActionMenu({ department }: { department: Departments }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [deptName, setDeptName] = useState(department.dept_name)

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    router.post(
        route("update.department"), // your Laravel route name
        {
            deptId: department.public_id, // send which department to update
            dept_name: deptName, // send updated name
        },
        {
            onSuccess: () => {
                console.log("Department updated successfully!")
                setOpen(false)
            },
                onError: (errors) => {
                console.error("Update failed:", errors)
            },
        }
        )
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
                onClick={() => {
                    setMenuOpen(false);
                    setOpen(true);
                }}
                className="cursor-pointer"
            >
                <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => console.log("Delete", department.public_id)}
                className="cursor-pointer text-red-600"
            >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        {/* Dialog for editing */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Edit Department</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                <label className="block mb-2 text-sm font-medium">
                    Department Name
                </label>
                <Input
                    type="text"
                    value={deptName}
                    onChange={(data) => setDeptName(data.target.value)}
                    required
                />
                </div>
                <DialogFooter className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
                </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>
        </>
    )
}

export const columns: ColumnDef<Departments>[] = [
    {
        accessorKey: "dept_name",
        header: "Department Name",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionMenu department={row.original} />,
    },
]
