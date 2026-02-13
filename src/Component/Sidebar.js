import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiUsers,
  FiX,
} from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import { USER_ROLES } from '../utils/constants';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { label: 'Dashboard', href: '/dashboard', icon: FiHome },
    ];

    if (user?.role === USER_ROLES.STUDENT) {
      return [
        ...baseItems,
        { label: 'Apply Leave', href: '/apply-leave', icon: FiCalendar },
        { label: 'My Leaves', href: '/my-leaves', icon: FiFileText },
        { label: 'Attendance', href: '/attendance', icon: FiClock },
        { label: 'Payslips', href: '/payslips', icon: FiDollarSign },
      ];
    }

    if (user?.role === USER_ROLES.FACULTY) {
      return [
        ...baseItems,
        { label: 'Apply Leave', href: '/apply-leave', icon: FiCalendar },
        { label: 'My Leaves', href: '/my-leaves', icon: FiFileText },
        { label: 'Attendance', href: '/attendance', icon: FiClock },
        { label: 'Payroll', href: '/payroll', icon: FiDollarSign },
      ];
    }

    if (user?.role === USER_ROLES.ADMIN) {
      return [
        ...baseItems,
        { label: 'Users', href: '/users', icon: FiUsers },
        { label: 'Leave Requests', href: '/leave-requests', icon: FiCalendar },
        { label: 'Attendance', href: '/attendance-management', icon: FiClock },
        { label: 'Payroll', href: '/payroll-management', icon: FiDollarSign },
        { label: 'Reports', href: '/reports', icon: FiFileText },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white transform transition-transform duration-300 ease-in-out z-30 border-r border-blue-500 border-opacity-20 shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
      >
        {/* Close button for mobile */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white"
        >
          <FiX size={24} />
        </button>

        {/* Logo */}
        <div className="p-6 flex items-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold mr-3 shadow-lg">
            LF
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">LeaveFlow</span>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => toggleSidebar()}
                className={`flex items-center px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`mr-3 size-5 transition ${isActive ? 'scale-110' : 'group-hover:translate-x-1'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-opacity-20 border border-blue-400 border-opacity-30 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-2 font-semibold">LOGGED IN AS</p>
            <p className="text-white font-bold text-sm truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 mt-1">{user?.role}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
