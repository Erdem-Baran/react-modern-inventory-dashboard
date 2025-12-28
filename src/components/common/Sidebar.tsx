import { LayoutDashboard, Package, ShoppingCart, Users, FileBarChart, Settings, LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean;     
  onClose?: () => void; 
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: FileBarChart, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
          flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
        `}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <span className="p-1 bg-blue-600 text-white rounded-lg">NS</span>
            <span className="text-gray-900 dark:text-white">NexStock</span>
          </h1>

          {/* Close Button on Mobile (X Icon) */}
          <button 
            onClick={onClose} 
            className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MENÜ LİNKLERİ */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* EXIT BUTTON */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}