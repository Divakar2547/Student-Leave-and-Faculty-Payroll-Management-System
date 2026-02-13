import React, { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import Layout from '../Component/Layout';
import LoadingSpinner from '../Component/LoadingSpinner';
import Alert from '../Component/Alert';
import { adminAPI } from '../Services/api';
// Format functions not needed for this component
import { ATTENDANCE_STATUS } from '../utils/constants';

const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAttendance();
      setAttendance(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (attendanceId, newStatus) => {
    const updated = attendance.map((record) =>
      record._id === attendanceId ? { ...record, status: newStatus } : record
    );
    setAttendance(updated);
  };

  const handleSave = async () => {
    try {
      await adminAPI.markAttendance({
        date: selectedDate,
        records: attendance,
      });
      setSuccess('Attendance saved successfully');
    } catch (err) {
      setError(err.message || 'Failed to save attendance');
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-2">Mark and manage employee attendance</p>
          </div>
          <div className="flex gap-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FiSave size={20} />
              Save Attendance
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}
        {success && (
          <Alert type="success" message={success} onClose={() => setSuccess('')} />
        )}

        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Department
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
                        {record.employeeName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                        {record.role}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {record.department || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={record.status}
                          onChange={(e) =>
                            handleStatusChange(record._id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-lg text-sm font-semibold border ${
                            record.status === ATTENDANCE_STATUS.PRESENT
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : record.status === ATTENDANCE_STATUS.ABSENT
                              ? 'bg-red-100 text-red-800 border-red-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          <option value={ATTENDANCE_STATUS.PRESENT}>Present</option>
                          <option value={ATTENDANCE_STATUS.ABSENT}>Absent</option>
                          <option value={ATTENDANCE_STATUS.LEAVE}>Leave</option>
                          <option value={ATTENDANCE_STATUS.HALF_DAY}>Half Day</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {record.remarks || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
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

export default AttendanceManagement;
