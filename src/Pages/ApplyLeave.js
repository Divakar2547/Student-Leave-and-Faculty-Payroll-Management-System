import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Layout from '../Component/Layout';
import LoadingSpinner from '../Component/LoadingSpinner';
import Alert from '../Component/Alert';
import { studentAPI } from '../Services/api';
import { formatDate } from '../utils/helpers';
import { LEAVE_STATUS, LEAVE_TYPES } from '../utils/constants';

// Mock leave data
const MOCK_LEAVES = [
  {
    _id: '1',
    leaveType: 'Sick Leave',
    startDate: '2026-01-15',
    endDate: '2026-01-17',
    reason: 'Personal health issue',
    status: 'approved',
    approvedBy: 'Faculty Coordinator',
  },
  {
    _id: '2',
    leaveType: 'Casual Leave',
    startDate: '2026-02-10',
    endDate: '2026-02-12',
    reason: 'Family commitment',
    status: 'approved',
    approvedBy: 'Faculty Coordinator',
  },
  {
    _id: '3',
    leaveType: 'Casual Leave',
    startDate: '2026-02-20',
    endDate: '2026-02-22',
    reason: 'Personal errand',
    status: 'pending',
  },
];

const MOCK_LEAVE_BALANCE = {
  total: 20,
  used: 8,
  remaining: 12,
  casualLeave: 10,
  sickLeave: 8,
  annualLeave: 2,
};

const ApplyLeave = () => {
  const [leaves, setLeaves] = useState(MOCK_LEAVES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState(MOCK_LEAVE_BALANCE);

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    leaveType: 'casual',
    reason: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchLeaves();
    fetchLeaveBalance();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      try {
        const data = await studentAPI.getLeaves();
        setLeaves(data);
        setError('');
      } catch (err) {
        // Use mock data as fallback
        console.log('Using mock leave data');
        setLeaves(MOCK_LEAVES);
        setError('');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaveBalance = async () => {
    try {
      try {
        const data = await studentAPI.getLeaveBalance();
        setLeaveBalance(data);
      } catch (err) {
        // Use mock data
        console.log('Using mock leave balance');
        setLeaveBalance(MOCK_LEAVE_BALANCE);
      }
    } catch (err) {
      console.error('Failed to fetch leave balance:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.dateRange = 'End date must be after start date';
    }
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await studentAPI.applyLeave(formData);
      setSuccess('Leave application submitted successfully');
      setShowModal(false);
      setFormData({
        startDate: '',
        endDate: '',
        leaveType: 'casual',
        reason: '',
      });
      fetchLeaves();
      fetchLeaveBalance();
    } catch (err) {
      setError(err.message || 'Failed to apply leave');
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
            <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-gray-600 mt-2">Apply and manage your leaves</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiPlus className="mr-2" />
            Apply Leave
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}
        {success && (
          <Alert type="success" message={success} onClose={() => setSuccess('')} />
        )}

        {/* Leave Balance */}
        {leaveBalance && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Leave Balance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(leaveBalance).map(([type, days]) => (
                <div key={type} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 capitalize">
                    {type.replace('_', ' ')}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">{days}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaves Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Leave Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Days
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {leaves.length ? (
                  leaves.map((leave) => (
                    <tr key={leave._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {leave.leaveType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatDate(leave.startDate)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatDate(leave.endDate)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            leave.status === LEAVE_STATUS.APPROVED
                              ? 'bg-green-100 text-green-800'
                              : leave.status === LEAVE_STATUS.REJECTED
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {leave.numberOfDays}
                      </td>
                      <td className="px-6 py-4">
                        {leave.status === LEAVE_STATUS.PENDING && (
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <FiEdit2 size={18} />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No leaves found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Apply Leave</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Leave Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Type
                </label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {Object.entries(LEAVE_TYPES).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.startDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {formErrors.startDate}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formErrors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.endDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {formErrors.endDate}
                  </p>
                )}
              </div>

              {formErrors.dateRange && (
                <p className="text-sm text-red-600">{formErrors.dateRange}</p>
              )}

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formErrors.reason ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="3"
                  placeholder="Reason for leave"
                />
                {formErrors.reason && (
                  <p className="text-sm text-red-600 mt-1">
                    {formErrors.reason}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ApplyLeave;
