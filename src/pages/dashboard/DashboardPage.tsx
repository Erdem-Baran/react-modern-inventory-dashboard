import { DollarSign, Package, TrendingUp, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Statistical Card Component (Only used in this page)
const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  description,
  loading,
}: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
        ) : (
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-gray-400">{description}</span>
    </div>
  </div>
);

export default function DashboardPage() {
  //  pulling the data
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  //  calculating the statistics
  const totalProducts = products.length;

  // Total Stock Value (Price * Stock Quantity)
  const totalValue = products.reduce(
    (acc, product) => acc + product.price * product.stock,
    0
  );

  // Critical Stock
  const lowStockCount = products.filter(
    (p) => p.stock < 10 || p.status === "Low Stock"
  ).length;

  // product in Stock
  const inStockCount = products.filter((p) => p.status === "In Stock").length;

  // -- Preparing Data for Charts --

  // Number of products by category
  const categoryData = products.reduce((acc: any[], product) => {
    const existingCategory = acc.find(
      (item) => item.name.toLowerCase() === product.category.toLowerCase()
    );
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: product.category, value: 1 });
    }
    return acc;
  }, []);

  // Pie chart data based on stock status
  const statusData = [
    { name: "In Stock", value: inStockCount, color: "#22c55e" },
    { name: "Low Stock", value: lowStockCount, color: "#eab308" },
    {
      name: "Out of stock",
      value: products.filter((p) => p.status === "Out of Stock").length,
      color: "#ef4444",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Control Panel</h1>
        <p className="text-gray-500">
          Live view of your business's overall inventory status.
        </p>
      </div>

      {/* --- STATISTICS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Product */}
        <StatCard
          title="Total Product"
          value={totalProducts}
          icon={Package}
          color="bg-blue-500"
          description="Total items in inventory"
          loading={isLoading}
        />

        {/* Total Value */}
        <StatCard
          title="Total Product Value"
          value={`$${totalValue.toLocaleString("tr-TR")}`}
          icon={DollarSign}
          color="bg-green-500"
          description="Total cost of products"
          loading={isLoading}
        />

        {/* Active Products */}
        <StatCard
          title="In Stock"
          value={inStockCount}
          icon={TrendingUp}
          color="bg-purple-500"
          description="Number of products ready for sale"
          loading={isLoading}
        />

        {/* Critical Stock */}
        <StatCard
          title="Critical Stock"
          value={lowStockCount}
          icon={AlertTriangle}
          color="bg-red-500"
          description="Items requiring urgent orders"
          loading={isLoading}
        />
      </div>

      {/* --- GRAPHS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution (Bar Chart) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Category Distribution
          </h3>
          <div className="h-64 w-full min-w-0">
            {isLoading ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                Loading...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip cursor={{ fill: "#f3f4f6" }} />
                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Number of Products"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Stock Status (Pie Chart) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Stock Status
          </h3>
          <div className="h-64 w-full min-w-0">
            {isLoading ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                Loading...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
            {/* Legend */}
            <div className="flex justify-center gap-4 flex-wrap">
              {statusData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {item.name} ({item.value})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
