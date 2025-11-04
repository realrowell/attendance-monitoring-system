"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { useState } from "react"

const globalFilterFn = (row: any, _columnId: string, filterValue: string) => {
  const search = filterValue.toLowerCase();

  // Combine all primitive and stringifiable values from the original data
  const combinedRowText = Object.values(row.original)
    .map((value: any) => {
      if (value === null || value === undefined) return "";

      if (typeof value === "object") {
        // If the value is an object (e.g., nested record or array), flatten it
        try {
          return JSON.stringify(value);
        } catch {
          return "";
        }
      }

      return String(value);
    })
    .join(" ")
    .toLowerCase();

  return combinedRowText.includes(search);
};

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    meta?: Record<string, any>
}

export function DataTable<TData, TValue>({ columns, data, meta }: DataTableProps<TData, TValue>) {
    const [filter, setFilter] = useState("")

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter: filter },
        onGlobalFilterChange: setFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn,
        meta,
        initialState: {
        pagination: {
            pageIndex: 0,
            pageSize: 5, // default rows per page
        },
        },
    })

    return (
        <div className="rounded-md border w-full">
    <div className="rounded-md border p-4 w-full">

      {/* Search bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <Input
          placeholder="Search..."
          value={filter ?? ""}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-60"
        />
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <Table className="min-w-max w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 items-center justify-between mt-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            {"<<"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Prev
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            {">>"}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span>
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount()}
          </span>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border rounded p-1"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

    </div>
  </div>
    )
}
