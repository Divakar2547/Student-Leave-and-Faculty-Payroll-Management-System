import React from 'react';
import Layout from '../Component/Layout';

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            System administration and management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">156</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Pending Leaves</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">This Month Attendance</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">94%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Payroll Status</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">Processed</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              User Management
            </h2>
            <p className="text-gray-600 mb-4">Manage system users and roles</p>
            <a
              href="/users"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Users
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Leave Requests
            </h2>
            <p className="text-gray-600 mb-4">Approve/Reject leave requests</p>
            <a
              href="/leave-requests"
              className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
            >
              Go to Leave Requests
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Attendance Management
            </h2>
            <p className="text-gray-600 mb-4">Mark and manage attendance</p>
            <a
              href="/attendance-management"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Go to Attendance
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payroll Management
            </h2>
            <p className="text-gray-600 mb-4">Generate and manage payslips</p>
            <a
              href="/payroll-management"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Go to Payroll
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
