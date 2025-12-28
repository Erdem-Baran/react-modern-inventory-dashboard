import { useState } from "react";
import {
  Save,
  User,
  Bell,
  Lock,
  Globe,
  Moon,
  Store,
  Mail,
  Sun,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../store/themeSlice";
import type { RootState } from "../../store/store";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.mode);

  // Save simulation
  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Settings have been saved successfully! (Demo)");
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">
            Manage your app preferences and account settings.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isLoading ? "Recording..." : "Save"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* --- LEFT MENU  --- */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <nav className="flex flex-col p-2 space-y-1">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "general"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Store className="w-5 h-5" />
                General
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "notifications"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Bell className="w-5 h-5" />
                Notifications
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "security"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Lock className="w-5 h-5" />
                Security
              </button>
            </nav>
          </div>
        </div>

        {/* --- RIGHT CONTENT --- */}
        <div className="flex-1">
          {/* GENERAL SETTINGS */}
          {activeTab === "general" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 animate-in fade-in duration-300">
              {/* THEME SETTINGS SECTION */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Appearance Preference
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => dispatch(setTheme("light"))} // Redux Dispatch
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      currentTheme === "light"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 dark:text-gray-400 dark:border-gray-700"
                    }`}
                  >
                    <Sun className="w-6 h-6" />
                    <div className="text-left">
                      <p className="font-semibold">Light Mode</p>
                      <p className="text-xs opacity-70">For daytime use</p>
                    </div>
                  </button>

                  <button
                    onClick={() => dispatch(setTheme("dark"))} // Redux Dispatch
                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      currentTheme === "dark"
                        ? "border-blue-500 bg-gray-900 text-white"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 dark:text-gray-400 dark:border-gray-700"
                    }`}
                  >
                    <Moon className="w-6 h-6" />
                    <div className="text-left">
                      <p className="font-semibold">Dark Mode</p>
                      <p className="text-xs opacity-70">Eye-friendly theme</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Store Information
                </h2>
                <p className="text-sm text-gray-500">
                  Your business's basic information.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    defaultValue="NexStock Technology"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="info@nexstock.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value="TRY">Türk Lirası (₺)</option>
                    <option value="USD">Amerikan Doları ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Zone
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option>(GMT+03:00) İstanbul</option>
                    <option>(GMT+00:00) Londra</option>
                    <option>(GMT-05:00) New York</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Notification Preferences
                </h2>
                <p className="text-sm text-gray-500">
                  Select the situations in which you want to receive alerts.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Low Stock Alert
                      </p>
                      <p className="text-sm text-gray-500">
                        Notify when product stock falls below 10.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        New Order Notification
                      </p>
                      <p className="text-sm text-gray-500">
                        Send an email whenever a new order arrives.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Weekly Report</p>
                      <p className="text-sm text-gray-500">
                        Send the weekly summary report every Monday.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Password and Security
                </h2>
                <p className="text-sm text-gray-500">
                  Keep your account security up to date.
                </p>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password (Repeat)
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
