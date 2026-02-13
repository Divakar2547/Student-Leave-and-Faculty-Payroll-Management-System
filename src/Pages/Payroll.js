import React, { useState, useEffect } from 'react';
import { FiDownload, FiEye } from 'react-icons/fi';
import Layout from '../Component/Layout';
import LoadingSpinner from '../Component/LoadingSpinner';
import Alert from '../Component/Alert';
import { studentAPI } from '../Services/api';
import { formatDate, formatCurrency } from '../utils/helpers';

// Mock payslip data
const MOCK_PAYSLIPS = [
  {
    _id: '1',
    month: 'February',
    year: 2026,
    issuedDate: '2026-02-01',
    basicSalary: 40000,
    dearness: 2000,
    allowances: 3000,
    deductions: 2500,
    netSalary: 42500,
    status: 'paid',
  },
  {
    _id: '2',
    month: 'January',
    year: 2026,
    issuedDate: '2026-01-01',
    basicSalary: 40000,
    dearness: 2000,
    allowances: 3000,
    deductions: 2500,
    netSalary: 42500,
    status: 'paid',
  },
  {
    _id: '3',
    month: 'December',
    year: 2025,
    issuedDate: '2025-12-01',
    basicSalary: 40000,
    dearness: 2000,
    allowances: 3000,
    deductions: 2500,
    netSalary: 42500,
    status: 'paid',
  },
  {
    _id: '4',
    month: 'November',
    year: 2025,
    issuedDate: '2025-11-01',
    basicSalary: 40000,
    dearness: 2000,
    allowances: 3000,
    deductions: 2500,
    netSalary: 42500,
    status: 'paid',
  },
];

const Payroll = () => {
  const [payslips, setPayslips] = useState(MOCK_PAYSLIPS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  useEffect(() => {
    fetchPayslips();
  }, []);

  const fetchPayslips = async () => {
    try {
      setLoading(true);
      try {
        const data = await studentAPI.getPayslips();
        setPayslips(data);
        setError('');
      } catch (err) {
        // Use mock data
        console.log('Using mock payslip data');
        setPayslips(MOCK_PAYSLIPS);
        setError('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (payslip) => {
    // TODO: Implement payslip download
    console.log('Download payslip:', payslip);
  };

  const handlePreview = (payslip) => {
    setSelectedPayslip(payslip);
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
          <h1 className="text-3xl font-bold text-gray-900">Payslips</h1>
          <p className="text-gray-600 mt-2">Your salary payslips and details</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}

        {/* Payslips Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Month
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payslips.length ? (
                  payslips.map((payslip) => (
                    <tr key={payslip._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {payslip.month}/{payslip.year}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatCurrency(payslip.baseSalary)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {formatCurrency(payslip.deductions)}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {formatCurrency(payslip.netSalary)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePreview(payslip)}
                            className="text-blue-600 hover:text-blue-700"
                            title="Preview"
                          >
                            <FiEye size={18} />
                          </button>
                          <button
                            onClick={() => handleDownload(payslip)}
                            className="text-green-600 hover:text-green-700"
                            title="Download"
                          >
                            <FiDownload size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No payslips found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payslip Preview Modal */}
      {selectedPayslip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Payslip - {selectedPayslip.month}/{selectedPayslip.year}
            </h2>

            <div className="space-y-6">
              {/* Header */}
              <div className="border-b pb-4">
                <p className="text-gray-600">PayslipID: {selectedPayslip._id}</p>
                <p className="text-gray-600">Date: {formatDate(new Date())}</p>
              </div>

              {/* Earnings and Deductions */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Earnings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Salary</span>
                      <span className="text-gray-900">
                        {formatCurrency(selectedPayslip.baseSalary)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Allowances</span>
                      <span className="text-gray-900">
                        {formatCurrency(selectedPayslip.allowances || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Deductions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">
                        {formatCurrency(selectedPayslip.tax || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Other Deductions</span>
                      <span className="text-gray-900">
                        {formatCurrency(selectedPayslip.deductions || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Salary */}
              <div className="border-t border-b py-4 bg-blue-50">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Net Salary
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatCurrency(selectedPayslip.netSalary)}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={() => setSelectedPayslip(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(selectedPayslip)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  <FiDownload className="mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Payroll;
