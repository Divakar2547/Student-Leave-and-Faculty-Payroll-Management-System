import React, { useState, useEffect } from 'react';
import Layout from '../Component/Layout';
import LoadingSpinner from '../Component/LoadingSpinner';
import Alert from '../Component/Alert';
import { studentAPI } from '../Services/api';
import { formatDate } from '../utils/helpers';
import { ATTENDANCE_STATUS } from '../utils/constants';

// Mock attendance data
const MOCK_ATTENDANCE_DATA = {
  records: [
    { _id: '1', date: '2026-02-12', status: 'present' },
    { _id: '2', date: '2026-02-11', status: 'present' },
    { _id: '3', date: '2026-02-10', status: 'present' },
    { _id: '4', date: '2026-02-09', status: 'absent' },
    { _id: '5', date: '2026-02-06', status: 'present' },
    { _id: '6', date: '2026-02-05', status: 'present' },
    { _id: '7', date: '2026-02-04', status: 'half_day' },
    { _id: '8', date: '2026-02-03', status: 'leave' },
  ],
  stats: {
    presentDays: 45,
    absentDays: 3,
    halfDays: 1,
    leavesDays: 1,
    totalWorkingDays: 50,
    attendancePercentage: 92,
  },
};

const Attendance = () => {
  const [attendance, setAttendance] = useState(MOCK_ATTENDANCE_DATA.records);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(MOCK_ATTENDANCE_DATA.stats);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      try {
        const data = await studentAPI.getAttendance();
        setAttendance(data.records || []);
        setStats(data.stats);
        setError('');
      } catch (err) {
        // Use mock data
        console.log('Using mock attendance data');
        setAttendance(MOCK_ATTENDANCE_DATA.records);
        setStats(MOCK_ATTENDANCE_DATA.stats);
        setError('');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ATTENDANCE_STATUS.PRESENT:
        return 'bg-green-100 text-green-800';
      case ATTENDANCE_STATUS.ABSENT:
        return 'bg-red-100 text-red-800';
      case ATTENDANCE_STATUS.LEAVE:
        return 'bg-blue-100 text-blue-800';
      case ATTENDANCE_STATUS.HALF_DAY:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-2">Your attendance records</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm">Present</p>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm">Absent</p>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm">Leave</p>
              <p className="text-2xl font-bold text-blue-600">{stats.leave}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm">Attendance %</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.percentage}%
              </p>
            </div>
          </div>
        )}

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {attendance.length ? (
                  attendance.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {formatDate(record.date)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {record.remarks || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
