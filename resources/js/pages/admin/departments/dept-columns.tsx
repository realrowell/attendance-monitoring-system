import { ColumnDef } from "@tanstack/react-table"

export type Departments = {
  id: number
  name: string
  email: string
}

export const columns: ColumnDef<Departments>[] = [
//   {
//     accessorKey: "public_id",
//     header: "Id",
//   },
  {
    accessorKey: "dept_name",
    header: "Department Name",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
]
