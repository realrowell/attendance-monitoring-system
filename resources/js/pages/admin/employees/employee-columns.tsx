import { ColumnDef } from "@tanstack/react-table"

export type Employee = {
  id: number
  name: string
  email: string
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
]
