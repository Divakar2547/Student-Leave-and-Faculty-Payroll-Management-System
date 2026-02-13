import React, { useState, useEffect } from 'react';
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
} from 'react-icons/fi';
import Layout from '../Component/Layout';
import LoadingSpinner from '../Component/LoadingSpinner';
import Alert from '../Component/Alert';
import { facultyAPI } from '../Services/api';
import { formatCurrency } from '../utils/helpers';

// Mock Data for Faculty
const MOCK_FACULTY_DASHBOARD = {
  leaveBalance: {
    total: 25,
    used: 5,
    remaining: 20,
  },
  pendingLeaves: 1,
  attendance: {
    presentDays: 48,
    absentDays: 1,
    totalWorkingDays: 50,
  },
  salary: 65000,
  departmentStats: {
    totalStudents: 120,
    attendanceRate: 92,
  },
};

const FacultyDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await facultyAPI.getDashboard();
      setDashboardData(data);
      setError('');
    } catch (err) {
      // Use mock data as fallback
      console.log('Using mock data (API not available)');
      setDashboardData(MOCK_FACULTY_DASHBOARD);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to your faculty portal. Manage leaves, attendance, and payroll.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}

        {/* Stats Grid */}
        {dashboardData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={FiCalendar}
                label="Leave Balance"
                value={dashboardData.leaveBalance?.total || 0}
                color="bg-blue-500"
              />
              <StatCard
                icon={FiCalendar}
                label="Pending Leaves"
                value={dashboardData.pendingLeaves || 0}
                color="bg-yellow-500"
              />
              <StatCard
                icon={FiClock}
                label="Present Days"
                value={dashboardData.attendance?.presentDays || 0}
                color="bg-green-500"
              />
              <StatCard
                icon={FiDollarSign}
                label="Monthly Salary"
                value={formatCurrency(dashboardData.salary?.monthly || 0)}
                color="bg-purple-500"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Leaves */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Leaves
                </h2>
                {dashboardData.recentLeaves?.length ? (
                  <div className="space-y-4">
                    {dashboardData.recentLeaves.slice(0, 3).map((leave) => (
                      <div
                        key={leave._id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {leave.leaveType}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(leave.startDate).toLocaleDateString()} -{' '}
                            {new Date(leave.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            leave.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : leave.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {leave.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No recent leaves</p>
                )}
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <a
                    href="/apply-leave"
                    className="block p-4 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition font-medium"
                  >
                    Apply for Leave
                  </a>
                  <a
                    href="/attendance"
                    className="block p-4 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition font-medium"
                  >
                    View Attendance
                  </a>
                  <a
                    href="/payroll"
                    className="block p-4 border border-purple-200 rounded-lg text-purple-600 hover:bg-purple-50 transition font-medium"
                  >
                    View Payroll
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default FacultyDashboard;
