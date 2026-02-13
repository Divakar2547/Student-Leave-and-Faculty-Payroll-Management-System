import React from 'react';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">403</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-2">Unauthorized Access</p>
        <p className="text-gray-500 mb-8">You do not have permission to access this resource.</p>
        <a
          href="/login"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
