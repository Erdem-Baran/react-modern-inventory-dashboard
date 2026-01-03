import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { getProducts, deleteProduct } from "../../api/productApi";
import type { Product } from "../../types/product";
import {
  Loader2,
  AlertCircle,
  ArrowUpDown,
  Search,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import AddProductModal from "../../components/inventory/AddProductModal";
import { useDebounce } from "../../hooks/useDebounce";

// Defining Table Columns
const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("name", {
    header: "Product Name",
    cell: (info) => (
      <span className="font-medium text-gray-900 dark:text-gray-200">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("price", {
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-400 dark:text-gray-300"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="w-4 h-4" />
        </button>
      );
    },
    cell: (info) => (
      <span className="text-blue-600 font-medium">
        ${info.getValue().toLocaleString("en-US")}
      </span>
    ),
  }),
  columnHelper.accessor("stock", {
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-400 dark:text-gray-300"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="w-4 h-4" />
        </button>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      // Color determination based on the situation
      const colors = {
        "In Stock": "bg-green-100 text-green-800",
        "Low Stock": "bg-yellow-100 text-yellow-800",
        "Out of Stock": "bg-red-100 text-red-800",
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
        >
          {status}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Processes",
  }),
];

export default function ProductsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 1. Pulling Data with React Query
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // DELETION MUTATION
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // --- HANDLERS (Event Management) ---
  // Will run when the Edit button is clicked
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Will work when the delete button is pressed
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  // Filtering products based on debounced search term
  // --- GÜVENLİ VE PERFORMANSLI FİLTRELEME ---
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const term = debouncedSearchTerm.toLowerCase().trim();

    if (term.length < 3) {
      return products;
    }

    if (!term) return products;

    return products.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const category = String(product.category || "").toLowerCase();
      const status = String(product.status || "").toLowerCase();

      return (
        name.includes(term) || category.includes(term) || status.includes(term)
      );
    });
  }, [products, debouncedSearchTerm]);

  // 2. creating the table
  const table = useReactTable({
    data: filteredProducts,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  // Loading Status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Error Status
  if (isError) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <span>
          An error occurred while loading the data. Is the backend (json-server)
          running?
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER AND BUTTON */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
            Inventory
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            You can manage your products here.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" /> New Product
        </button>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-200" />
        <input
          type="text"
          placeholder="Search by product name, category, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80 focus:ring-2 focus:ring-blue-500 outline-none dark:placeholder-gray-400"
        />
      </div>

      {/* TABLE AREA */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200">
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
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === "actions") {
                    return (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200"
                      >
                        <div className="flex items-center gap-2">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEdit(row.original)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-700 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(row.original.id)}
                            className="p-2 text-red-600 dark:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            {deleteMutation.isPending &&
                            deleteMutation.variables === row.original.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    );
                  }
                  return (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-200">
            No products have been added yet.
          </div>
        )}
        {/* MODAL */}
        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          productToEdit={editingProduct}
        />
      </div>
    </div>
  );
}
