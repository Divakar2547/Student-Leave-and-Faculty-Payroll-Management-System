import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiUser, FiHome, FiGitBranch } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import { getInitials } from '../utils/helpers';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <header className="bg-gradient-to-r from-white to-blue-50 border-b-2 border-blue-200 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left - Logo and Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900 mr-2 md:hidden"
          >
            <FiMenu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              <FiGitBranch size={20} />
            </div>
            <span className="hidden sm:inline text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
              LeaveFlow
            </span>
          </Link>
        </div>

        {/* Right - User Profile */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Student'}
              </p>
            </div>
            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
              {user?.role?.toUpperCase()}
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center font-semibold hover:shadow-md transition"
            >
              {getInitials(user?.name || 'User')}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 divide-y">
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                </div>
                <Link
                  to="/"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  <FiHome className="mr-3" size={18} />
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  <FiUser className="mr-3" size={18} />
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    handleLogout();
                  }}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition text-left"
                >
                  <FiLogOut className="mr-3" size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
