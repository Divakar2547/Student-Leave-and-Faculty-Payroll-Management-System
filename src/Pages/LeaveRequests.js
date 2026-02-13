import React, { useState, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import Layout from '../Component/Layout';
import LoadingSpinner from '../Component/LoadingSpinner';
import Alert from '../Component/Alert';
import { adminAPI } from '../Services/api';
import { formatDate } from '../utils/helpers';
import { LEAVE_STATUS } from '../utils/constants';

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getLeaves();
      setLeaves(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load leave requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (leaveId) => {
    try {
      await adminAPI.approveLeave(leaveId);
      setSuccess('Leave approved successfully');
      fetchLeaves();
    } catch (err) {
      setError(err.message || 'Failed to approve leave');
    }
  };

  const handleReject = async (leaveId) => {
    try {
      const reason = prompt('Enter rejection reason:');
      if (reason) {
        await adminAPI.rejectLeave(leaveId, reason);
        setSuccess('Leave rejected successfully');
        fetchLeaves();
      }
    } catch (err) {
      setError(err.message || 'Failed to reject leave');
    }
  };

  const filteredLeaves = filterStatus
    ? leaves.filter((leave) => leave.status === filterStatus)
    : leaves;

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
          <h1 className="text-3xl font-bold text-gray-900">Leave Requests</h1>
          <p className="text-gray-600 mt-2">Approve or reject leave applications</p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}
        {success && (
          <Alert type="success" message={success} onClose={() => setSuccess('')} />
        )}

        {/* Filter */}
        <div className="flex gap-4">
          {[
            { label: 'All', value: '' },
            { label: 'Pending', value: 'pending' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ].map((status) => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={`px-4 py-2 rounded-lg transition ${
                filterStatus === status.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        {/* Leave Requests Cards */}
        <div className="space-y-4">
          {filteredLeaves.length ? (
            filteredLeaves.map((leave) => (
              <div
                key={leave._id}
                className="bg-white rounded-lg shadow p-6 border-l-4 border-l-blue-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Applicant</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {leave.applicantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Leave Type</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {leave.leaveType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(leave.startDate)} to {formatDate(leave.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Days</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {leave.numberOfDays} days
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Reason</p>
                    <p className="text-gray-900">{leave.reason}</p>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-4 border-t mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      leave.status === LEAVE_STATUS.APPROVED
                        ? 'bg-green-100 text-green-800'
                        : leave.status === LEAVE_STATUS.REJECTED
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {leave.status}
                  </span>

                  {leave.status === LEAVE_STATUS.PENDING && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(leave._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <FiCheck size={18} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(leave._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        <FiX size={18} />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No leave requests found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LeaveRequests;
