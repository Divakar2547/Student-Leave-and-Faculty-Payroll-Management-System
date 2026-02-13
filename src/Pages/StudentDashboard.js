import React, { useState, useEffect } from 'react';
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFileText,
} from 'react-icons/fi';
import Layout from '../Component/Layout';
import LoadingSpinner from '../Component/LoadingSpinner';
import Alert from '../Component/Alert';
import { studentAPI } from '../Services/api';
import { formatCurrency, formatDate } from '../utils/helpers';

// Mock Data for Development
const MOCK_DASHBOARD_DATA = {
  leaveBalance: {
    total: 20,
    used: 8,
    remaining: 12,
  },
  pendingLeaves: 2,
  attendance: {
    presentDays: 45,
    absentDays: 3,
    totalWorkingDays: 50,
  },
  salary: {
    currentMonth: 45000,
    previousMonth: 45000,
  },
  recentLeaves: [
    {
      _id: '1',
      leaveType: 'Sick Leave',
      startDate: '2026-02-10',
      endDate: '2026-02-12',
      status: 'approved',
    },
    {
      _id: '2',
      leaveType: 'Casual Leave',
      startDate: '2026-02-20',
      endDate: '2026-02-22',
      status: 'pending',
    },
    {
      _id: '3',
      leaveType: 'Annual Leave',
      startDate: '2026-03-01',
      endDate: '2026-03-05',
      status: 'pending',
    },
  ],
  recentPayslips: [
    {
      _id: '1',
      month: 'February',
      year: 2026,
      netSalary: 42500,
    },
    {
      _id: '2',
      month: 'January',
      year: 2026,
      netSalary: 42500,
    },
    {
      _id: '3',
      month: 'December',
      year: 2025,
      netSalary: 42500,
    },
  ],
};

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getDashboard();
      setDashboardData(data);
      setError('');
    } catch (err) {
      // Use mock data as fallback when API is not available
      console.log('Using mock data (API not available)');
      setDashboardData(MOCK_DASHBOARD_DATA);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg hover:border-blue-200 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-3">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color} shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
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
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to LeaveFlow</h1>
          <p className="text-gray-600 mt-2">
            📊 Your leave and attendance overview at a glance.
          </p>
          <div className="mt-4 flex gap-4 flex-wrap">
            <a href="/apply-leave" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold">
              📋 Apply Leave
            </a>
            <a href="/attendance" className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold">
              ✓ View Attendance
            </a>
            <a href="/payroll" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold">
              💰 Check Payslips
            </a>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError('')}
          />
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
                icon={FiFileText}
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
                label="Current Month Salary"
                value={formatCurrency(dashboardData.salary?.currentMonth || 0)}
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
                            {formatDate(leave.startDate)} to{' '}
                            {formatDate(leave.endDate)}
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

              {/* Payslips */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Payslips
                </h2>
                {dashboardData.recentPayslips?.length ? (
                  <div className="space-y-4">
                    {dashboardData.recentPayslips.slice(0, 3).map((payslip) => (
                      <div
                        key={payslip._id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {payslip.month}/{payslip.year}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(payslip.netSalary)}
                          </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 font-semibold">
                          <FiFileText size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No payslips available</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default StudentDashboard;
