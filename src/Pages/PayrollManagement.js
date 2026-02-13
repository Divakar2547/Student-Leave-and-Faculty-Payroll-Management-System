import React, { useState, useEffect } from 'react';
import { FiEdit2, FiDownload, FiLoader } from 'react-icons/fi';
import Layout from '../Component/Layout';
import LoadingSpinner from '../Component/LoadingSpinner';
import Alert from '../Component/Alert';
import { adminAPI } from '../Services/api';
import { formatCurrency } from '../utils/helpers';

const PayrollManagement = () => {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchPayroll();
  }, [selectedMonth, selectedYear]);

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getPayroll();
      setPayroll(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load payroll');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePayslips = async () => {
    try {
      setGenerating(true);
      await adminAPI.generatePayslips();
      setSuccess('Payslips generated successfully');
      fetchPayroll();
    } catch (err) {
      setError(err.message || 'Failed to generate payslips');
    } finally {
      setGenerating(false);
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
            <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
            <p className="text-gray-600 mt-2">Generate and manage employee payslips</p>
          </div>
          <button
            onClick={handleGeneratePayslips}
            disabled={generating}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating && <FiLoader className="animate-spin mr-2" size={20} />}
            {generating ? 'Generating...' : 'Generate Payslips'}
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}
        {success && (
          <Alert type="success" message={success} onClose={() => setSuccess('')} />
        )}

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
              <option key={month} value={month}>
                {new Date(2024, month - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {[2024, 2025, 2026].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Payroll Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Base Salary
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Deductions
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Net Salary
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payroll.length ? (
                  payroll.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {record.employeeName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                        {record.role}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatCurrency(record.baseSalary)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatCurrency(record.deductions)}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {formatCurrency(record.netSalary)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            record.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : record.status === 'processed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <FiEdit2 size={18} />
                          </button>
                          <button className="text-green-600 hover:text-green-700">
                            <FiDownload size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No payroll records found
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

export default PayrollManagement;
