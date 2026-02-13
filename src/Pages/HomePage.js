import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiBarChart2,
  FiCheckCircle,
  FiUsers,
  FiArrowRight,
  FiGitBranch,
} from 'react-icons/fi';

const HomePage = () => {
  const features = [
    {
      icon: FiCalendar,
      title: 'Leave Management',
      description: 'Apply, track, and manage leaves with ease. Automated approval workflows.',
      color: 'bg-blue-500',
    },
    {
      icon: FiClock,
      title: 'Attendance Tracking',
      description: 'Real-time attendance marking and comprehensive attendance reports.',
      color: 'bg-green-500',
    },
    {
      icon: FiDollarSign,
      title: 'Payroll Management',
      description: 'Automated salary calculation and digital payslip generation.',
      color: 'bg-purple-500',
    },
    {
      icon: FiBarChart2,
      title: 'Analytics & Reports',
      description: 'Comprehensive dashboards with actionable insights and analytics.',
      color: 'bg-orange-500',
    },
  ];

  const stats = [
    { label: 'Active Students', value: '500+' },
    { label: 'Faculty Members', value: '50+' },
    { label: 'Leave Processed', value: '1000+' },
    { label: 'System Uptime', value: '99.9%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Header */}
      <nav className="bg-slate-950 bg-opacity-80 backdrop-blur-md fixed w-full top-0 z-50 border-b border-blue-500 border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <FiGitBranch className="w-6 h-6 text-white font-bold" />
              </div>
              <span className="text-white font-bold text-xl">LeaveFlow</span>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Featured</a>
              <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
            </div>
            <Link
              to="/student-dashboard"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition font-semibold"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-30 rounded-full text-blue-300">
              <FiCheckCircle size={16} />
              Complete Leave & Payroll Solution
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Simplify Leave Management
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              & Payroll Processing
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            An intelligent, automated system designed for educational institutions to streamline
            student and faculty leave applications, attendance tracking, and salary management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/student-dashboard"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition font-semibold flex items-center justify-center gap-2 group"
            >
              Get Started <FiArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
            <button className="bg-slate-800 border border-blue-400 border-opacity-30 text-white px-8 py-4 rounded-lg hover:bg-slate-700 transition font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-800 bg-opacity-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage leaves, attendance, and payroll in one unified platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-slate-800 bg-opacity-50 border border-blue-400 border-opacity-20 rounded-lg p-8 hover:border-opacity-50 hover:bg-opacity-70 transition"
                >
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800 bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Why Choose LeaveFlow?</h2>
              <ul className="space-y-4">
                {[
                  'Automated leave approval workflows',
                  'Real-time attendance synchronization',
                  'Secure payslip generation & delivery',
                  'Detailed analytics & reporting',
                  'Multi-role access control',
                  'Mobile responsive design',
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-1">
              <div className="bg-slate-900 rounded-lg p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-400">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Designed for Everyone</h2>
            <p className="text-gray-400 text-lg">
              Tailored interfaces for students, faculty, and administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Students',
                icon: '👨‍🎓',
                features: ['Apply for leaves', 'Track attendance', 'View payslips'],
              },
              {
                title: 'Faculty',
                icon: '👨‍🏫',
                features: ['Manage leaves', 'View salary', 'Track records'],
              },
              {
                title: 'Administrators',
                icon: '👨‍💼',
                features: ['Approve leaves', 'Generate payroll', 'Analytics'],
              },
            ].map((role, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-1"
              >
                <div className="bg-slate-900 rounded-lg p-8">
                  <div className="text-5xl mb-4">{role.icon}</div>
                  <h3 className="text-white font-bold text-xl mb-4">{role.title}</h3>
                  <ul className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 flex items-center gap-2">
                        <FiCheckCircle size={16} className="text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Leave & Payroll Management?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join hundreds of institutions already using LeaveFlow to simplify their operations
          </p>
          <Link
            to="/student-dashboard"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition font-semibold gap-2 flex items-center justify-center"
          >
            Start Free Trial <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 border-t border-blue-500 border-opacity-20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <FiGitBranch className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">LeaveFlow</span>
              </div>
              <p className="text-gray-400 text-sm">
                Complete leave and payroll management solution for educational institutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2026 LeaveFlow. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
