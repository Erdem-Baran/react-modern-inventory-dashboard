import { DollarSign, Package, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';

// Statistical Card Component (Only used in this page)
const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      {trend.startsWith('+') ? (
        <span className="text-green-500 flex items-center font-medium">
        <TrendingUp className="w-4 h-4 mr-1" />
        {trend}
      </span>) : (<span className="text-red-500 flex items-center font-medium">
        <TrendingDown className="w-4 h-4 mr-1" />
        {trend}
      </span>)}
      <span className="text-gray-400 ml-2">compared to last month</span>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500">You can monitor your business's current status here.</p>
      </div>

      {/* Statistical Cards Grid Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value="$124,500"
          icon={DollarSign}
          trend="+12%"
          color="bg-blue-500"
        />
        <StatCard
          title="Total Orders"
          value="1,240"
          icon={ShoppingCart}
          trend="+8%"
          color="bg-purple-500"
        />
        <StatCard
          title="Active Products"
          value="45"
          icon={Package}
          trend="+2%"
          color="bg-orange-500"
        />
        <StatCard
          title="Low Stock"
          value="3"
          icon={TrendingDown} 
          trend="-5%"
          color="bg-red-500"
        />
      </div>

      {/* Bottom Section: Recent Activities (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center">
          <p className="text-gray-400">Chart Area (Recharts Will Be Here)</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center">
          <p className="text-gray-400">Recent Orders Table</p>
        </div>
      </div>
    </div>
  );
}