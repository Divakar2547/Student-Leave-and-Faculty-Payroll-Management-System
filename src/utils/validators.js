/**
 * Form Validation Utilities
 */

export const validators = {
  /**
   * Validate email
   */
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email';
    return '';
  },

  /**
   * Validate password
   */
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain a number';
    if (!/[!@#$%^&*]/.test(value)) return 'Password must contain a special character (!@#$%^&*)';
    return '';
  },

  /**
   * Validate confirm password
   */
  confirmPassword: (value, password) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return '';
  },

  /**
   * Validate required field
   */
  required: (value, fieldName = 'This field') => {
    if (!value || value.trim() === '') return `${fieldName} is required`;
    return '';
  },

  /**
   * Validate phone number
   */
  phone: (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!value) return 'Phone number is required';
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      return 'Please enter a valid 10-digit phone number';
    }
    return '';
  },

  /**
   * Validate minimum length
   */
  minLength: (value, length, fieldName = 'This field') => {
    if (!value) return `${fieldName} is required`;
    if (value.length < length) {
      return `${fieldName} must be at least ${length} characters`;
    }
    return '';
  },

  /**
   * Validate maximum length
   */
  maxLength: (value, length, fieldName = 'This field') => {
    if (value && value.length > length) {
      return `${fieldName} must not exceed ${length} characters`;
    }
    return '';
  },

  /**
   * Validate number range
   */
  range: (value, min, max, fieldName = 'This field') => {
    if (value === '') return `${fieldName} is required`;
    const num = parseFloat(value);
    if (isNaN(num)) return `${fieldName} must be a number`;
    if (num < min || num > max) {
      return `${fieldName} must be between ${min} and ${max}`;
    }
    return '';
  },

  /**
   * Validate date is not in past
   */
  notInPast: (value) => {
    if (!value) return 'Date is required';
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return 'Date cannot be in the past';
    }
    return '';
  },

  /**
   * Validate date range
   */
  dateRange: (startDate, endDate) => {
    if (!startDate || !endDate) return 'Both dates are required';
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return 'Start date must be before end date';
    }
    return '';
  },
};

export default validators;
