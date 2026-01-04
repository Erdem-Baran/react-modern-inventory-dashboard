import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../api/customerApi";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type SortingState,
} from "@tanstack/react-table";
import {
  Loader2,
  Search,
  ArrowUpDown,
  Mail,
  Phone,
  MoreHorizontal,
} from "lucide-react";
import type { Customer } from "../../types/customer";

const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.accessor("name", {
    header: "Customer Name",
    cell: (info) => (
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{info.getValue()}</span>
        <span className="text-xs text-gray-400 dark:text-gray-200">
          ID: #{info.row.original.id}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("email", {
    header: "Contact",
    cell: (info) => (
      <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-200">
        <div className="flex items-center gap-2">
          <Mail className="w-3 h-3" /> {info.getValue()}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3 h-3" /> {info.row.original.phone}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("totalSpent", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-400"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Expense <ArrowUpDown className="w-4 h-4" />
      </button>
    ),
    cell: (info) => (
      <span className="font-semibold text-gray-700 dark:text-gray-200">
        ${info.getValue().toLocaleString("en-US")}
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const isActive = info.getValue() === "Active";
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            isActive
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-gray-50 text-gray-600 border-gray-200"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  }),
  columnHelper.accessor("joinDate", {
    header: "Join Date",
    cell: (info) => (
      <span className="text-gray-500 dark:text-gray-200">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <button className="p-2 text-gray-400 dark:text-gray-200 hover:text-gray-600">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    ),
  }),
];

export default function CustomersPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const table = useReactTable({
    data: customers,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
            Customers
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your customer database and spending history.
          </p>
        </div>
      </div>

      {/* Search Field */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or phone number..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none dark:placeholder-gray-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-800">
          <span className="text-sm text-gray-700 dark:text-gray-200">
            Page{" "}
            <span className="font-medium">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            / <span className="font-medium">{table.getPageCount()}</span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded hover:bg-white dark:hover:bg-gray-300 dark:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 border rounded hover:bg-white dark:hover:bg-gray-300 dark:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
