import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

export default function DashboardLayout() {
  // State that controls whether the sidebar is open or closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // On/Off functions for the sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      {/* We are sending the status and close function to the sidebar. */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* We are sending the toggle function to the header. */}
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}