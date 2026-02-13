# Features Documentation - Frontend

## Complete Feature Set

### 1. Authentication & Authorization

#### Login Page (`/Pages/Login.js`)
- Email and password-based authentication
- Form validation with error messages
- "Remember me" functionality
- Demo credentials display
- Automatic redirect to dashboard on successful login
- Demo credentials shown for testing

**Features:**
- Email format validation
- Password requirement check
- Loading state during authentication
- Error handling and user feedback
- Responsive design for mobile

#### Registration Page (`/Pages/Register.js`)
- New user account creation
- Multiple user roles (Student, Faculty)
- Comprehensive form validation
- Phone number validation (10 digits)
- Password strength requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- Password confirmation matching

**Validation:**
- All form fields are validated
- Real-time error clearing while typing
- Detailed error messages for each field
- Phone number formatting validation

#### Protected Routes (`/middleware/ProtectedRoute.js`)
- Route-level authentication check
- Role-based access control (RBAC)
- Automatic redirect to login for unauthenticated users
- Unauthorized access prevention
- Loading spinner during auth check

#### JWT Token Management
- Automatic token attachment to all API requests
- Token storage in localStorage
- Automatic logout on token expiration
- Refresh token support (ready for backend implementation)

---

### 2. Dashboard Features

#### Student Dashboard (`/Pages/StudentDashboard.js`)
**Statistics Cards:**
- Leave Balance - Total available leaves
- Pending Leaves - Leaves awaiting approval
- Present Days - Days marked present
- Current Month Salary - Monthly compensation display

**Recent Activity Sections:**
- Recent Leaves - Last 3 leave requests with status
- Recent Payslips - Last 3 salary payslips

**Navigation:**
- Quick links to all student features
- Dashboard updates on data changes

#### Faculty Dashboard (`/Pages/FacultyDashboard.js`)
**Statistics Cards:**
- Leave Balance
- Pending Leaves
- Present Days
- Monthly Salary

**Quick Actions:**
- Apply for Leave
- View Attendance
- View Payroll

#### Admin Dashboard (`/Pages/AdminDashboard.js`)
**Management Links:**
- User Management
- Leave Requests
- Attendance Management
- Payroll Management

**Overview Cards:**
- Total Users count
- Pending Leaves count
- Attendance statistics
- Payroll status

---

### 3. Leave Management (`/Pages/ApplyLeave.js`)

#### Leave Application Features
**Leave Types Supported:**
- Sick Leave
- Casual Leave
- Earned Leave
- Maternity Leave
- Emergency Leave

**Application Modal:**
- Leave type selection dropdown
- Start and end date selection
- Date validation (dates cannot be in past)
- Date range validation (end date must be after start date)
- Reason for leave (text area)
- Form validation before submission

#### Leave Request Display
**Leave History Table:**
- Leave Type column
- Start and End dates
- Current status (Pending/Approved/Rejected)
- Number of days
- Edit and Delete actions (for pending leaves only)

#### Leave Balance Information
**Leave Balance Card:**
- Displays available days for each leave type
- Real-time update after applying
- Color-coded display for easy reading

**Database Fields Tracked:**
- Leave ID
- Applicant ID
- Leave Type
- Start Date
- End Date
- Number of Days (auto-calculated)
- Reason
- Status
- Applied Date
- Response Date (if approved/rejected)

---

### 4. Attendance Management

#### Student Attendance View (`/Pages/Attendance.js`)
**Attendance Statistics:**
- Total Present Days
- Total Absent Days
- Total Leave Days
- Attendance Percentage

**Attendance Records Table:**
- Date of attendance
- Status (Present/Absent/Leave/Half Day)
- Remarks column

#### Admin Attendance Management (`/Pages/AttendanceManagement.js`)
**Features:**
- Date selection for marking attendance
- Employee list for bulk attendance marking
- Status dropdown for each employee
- Save button to persist changes
- Quick status selection
- On-screen feedback

**Status Options:**
- Present
- Absent
- Leave
- Half Day

**Additional Information:**
- Employee name
- Role
- Department
- Current status

---

### 5. Payroll Management

#### Student/Faculty Payslip View (`/Pages/Payroll.js`)
**Payslip List:**
- Month and year display
- Base salary
- Deductions
- Net salary
- Status

**Payslip Preview Modal:**
- Detailed earnings breakdown
- Deductions breakdown
- Net salary calculation
- Payslip download button

**Payslip Details:**
- Base Salary
- Allowances
- Tax Deductions
- Other Deductions
- Net Salary (final amount)

#### Admin Payroll Management (`/Pages/PayrollManagement.js`)
**Payroll Features:**
- Month and year filters
- Employee payroll records
- Base salary display
- Deductions tracking
- Net salary calculation
- Payroll status (Draft/Processed/Paid/Hold)
- Generate Payslips button (bulk generation)
- Edit and Download options

**Payroll Record Details:**
- Employee Name
- Role
- Base Salary
- Deductions
- Net Salary
- Processing Status
- Action buttons (Edit/Download)

---

### 6. User Management (`/Pages/UserManagement.js`)

#### Admin User Management
**Features:**
- User list with search
- Filter by role
- User information display:
  - Name
  - Email
  - Role (Student/Faculty/Admin)
  - Phone Number
  - Join Date

**Search Functionality:**
- Search by name
- Search by email
- Real-time filtering

**Role Filter:**
- Filter by Student
- Filter by Faculty
- Filter by Admin
- View all users

**User Actions:**
- Edit user information
- Delete user account
- Add new user button (UI ready)

---

### 7. Leave Request Management (`/Pages/LeaveRequests.js`)

#### Admin Leave Request Processing
**Features:**
- Filter by status (All/Pending/Approved/Rejected)
- Leave request cards with details:
  - Applicant name
  - Leave type
  - Date range
  - Number of days
  - Reason for leave
  - Current status

**Action Buttons:**
- Approve button (for pending requests)
- Reject button with reason input
- Status badges (color-coded)

**Request Details:**
- Applicant information
- Leave type
- Duration
- Number of days
- Reason provided

---

### 8. Profile Management (`/Pages/Profile.js`)

#### User Profile Page
**Viewable Information:**
- Full Name
- Email Address
- Phone Number
- Role
- Department
- Designation

**Edit Profile Modal:**
- Toggle between view and edit modes
- Edit fields:
  - Full Name
  - Phone Number
  - Department
  - Designation
- Email field (read-only)
- Role field (read-only)

**Actions:**
- Edit Profile button
- Save Changes button
- Cancel button

---

### 9. Navigation & Layout

#### Header Component (`/Component/Header.js`)
**Features:**
- Responsive header
- Logo and branding
- Mobile menu toggle
- User profile dropdown

**Dropdown Menu:**
- My Profile link
- Logout button

**Display Information:**
- User name
- User role badge
- User initials in avatar

#### Sidebar Component (`/Component/Sidebar.js`)
**Features:**
- Responsive sidebar (mobile drawer on small screens)
- Context-aware menu items based on user role

**Student Menu Items:**
- Dashboard
- Apply Leave
- My Leaves
- Attendance
- Payslips

**Faculty Menu Items:**
- Dashboard
- Apply Leave
- My Leaves
- Attendance
- Payroll

**Admin Menu Items:**
- Dashboard
- Users
- Leave Requests
- Attendance
- Payroll
- Reports

**Features:**
- Active link highlighting
- Close on navigation
- Mobile overlay background
- Logout footer information

#### Layout Component (`/Component/Layout.js`)
- Combines Header and Sidebar
- Main content area
- Responsive mobile/desktop views
- Consistent spacing and padding

---

### 10. Shared Components

#### Alert Component (`/Component/Alert.js`)
- Success alerts (green)
- Error alerts (red)
- Warning alerts (yellow)
- Info alerts (blue)
- Auto-close after 5 seconds
- Manual close button
- Icons with each alert type

#### LoadingSpinner Component (`/Component/LoadingSpinner.js`)
- Three sizes: Small, Medium, Large
- Animated rotation
- Loading states on data fetches
- Skeleton loading ready

---

### 11. Utility Functions

#### Helpers (`/utils/helpers.js`)
- `formatDate()` - Format dates with proper locale
- `calculateDaysBetween()` - Calculate days between two dates
- `validateEmail()` - Email validation regex
- `validatePhone()` - Phone validation
- `generatePayslipFilename()` - Create payslip filenames
- `formatCurrency()` - Format numbers as currency (INR)
- `getInitials()` - Get initials from names
- `hasRole()` - Check user role
- `parseError()` - Parse error responses
- `truncate()` - Truncate long text

#### Validators (`/utils/validators.js`)
- Email validation
- Password strength validation
- Confirm password matching
- Required field validation
- Phone number validation
- Minimum/maximum length validation
- Number range validation
- Date validation (not in past)
- Date range validation

#### Constants (`/utils/constants.js`)
- User roles: STUDENT, FACULTY, ADMIN
- Leave statuses: PENDING, APPROVED, REJECTED, CANCELLED
- Leave types: SICK, CASUAL, EARNED, MATERNITY, EMERGENCY
- Attendance statuses: PRESENT, ABSENT, LEAVE, HALF_DAY
- Payroll statuses: DRAFT, PROCESSED, PAID, HOLD
- Date formats for display
- System messages

---

### 12. API Integration (`/Services/api.js`)

#### Axios Configuration
- Base URL from environment variables
- Default content-type headers
- Request interceptors for token attachment
- Response interceptors for error handling

#### Auth API
- `login()` - User authentication
- `register()` - New account creation
- `logout()` - User logout
- `getProfile()` - Fetch user profile
- `refreshToken()` - Token refresh

#### Student API
- `getDashboard()` - Dashboard data
- `getProfile()` - User profile
- `updateProfile()` - Update profile info
- `getLeaves()` - Fetch leave history
- `applyLeave()` - Submit leave request
- `getLeaveBalance()` - Check available leaves
- `getAttendance()` - Attendance records
- `getPayslips()` - Payslip history

#### Faculty API
- Similar to Student API with faculty-specific endpoints

#### Admin API
- `getDashboard()` - Admin dashboard data
- `getUsers()` - List all users
- `getLeaves()` - All leave requests
- `approveLeave()` - Approve a leave request
- `rejectLeave()` - Reject leaf request with reason
- `getAttendance()` - All attendance records
- `markAttendance()` - Bulk mark attendance
- `getPayroll()` - Payroll records
- `generatePayslips()` - Generate payslips
- `getPayslips()` - List payslips

---

### 13. State Management

#### Auth Context (`/contexts/AuthContext.js`)
**State Variables:**
- `user` - Current user object
- `token` - JWT authentication token
- `loading` - Loading state
- `error` - Error message
- `isAuthenticated` - Boolean flag

**Methods:**
- `login()` - Authenticate user
- `register()` - Register new account
- `logout()` - Clear session

**Persistence:**
- localStorage for token and user data
- Automatic hydration on app load

#### useAuth Hook (`/hooks/useAuth.js`)
- Access authentication context
- Used throughout the application
- Error handling for context access

---

### 14. Responsive Design

#### Mobile Optimization
- Hamburger menu on mobile
- Stack layouts for small screens
- Touch-friendly buttons and inputs
- Optimized table display

#### Tailwind CSS Breakpoints
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

#### Responsive Components
- Header adapts to screen size
- Sidebar becomes drawer on mobile
- Tables become cards on mobile
- Forms stack vertically on small screens

---

### 15. Security Features

#### Password Security
- Strong password requirements enforced
- Password confirmation on registration
- No password confirmation on profile
- Visual strength indicator ready

#### Token Management
- JWT tokens in localStorage (upgrade to httpOnly cookies recommended)
- Automatic token attachment to requests
- Token refresh on expiration
- Automatic logout on 401 errors
- No sensitive data in localStorage

#### XSS Protection
- React automatically escapes content
- No dangerouslySetInnerHTML usage
- Input validation and sanitization

#### CORS
- Backend handles CORS
- API requests from frontend domain authorized

---

## Feature Implementation Status

### ✅ Implemented & Ready
- Authentication (Login/Register)
- Protected Routes
- Role-Based Authorization
- Student Dashboard
- Faculty Dashboard
- Admin Dashboard
- Leave Management (UI)
- Attendance Tracking (UI)
- Payroll/Payslips (UI)
- User Management (UI)
- Profile Management
- Responsive Design
- API Integration Layer
- State Management

### 🔄 Ready for Backend Integration
- All API endpoints defined
- Axios configured
- Token interceptors
- Error handling
- Mock data structures ready

### 📋 Future Features
- Email notifications
- SMS alerts
- Calendar view
- Advanced reporting
- Mobile app
- Dark mode
- Internationalization

---

## User Roles & Permissions

### Student
✅ View Dashboard
✅ Apply Leaves
✅ View Leave History
✅ Check Leave Balance
✅ View Attendance Records
✅ View Payslips
✅ Update Profile

### Faculty
✅ View Dashboard
✅ Apply Leaves
✅ View Leave History
✅ Check Leave Balance
✅ View Attendance Records
✅ View Payroll
✅ Update Profile

### Admin
✅ View Dashboard
✅ Manage Users
✅ Process Leave Requests
✅ Manage Attendance
✅ Generate Payslips
✅ View Reports
✅ Configure System

---

## Performance Considerations

- Code splitting by routes
- Lazy loading of components
- Optimized re-renders
- Efficient API calls
- CSS optimization with Tailwind
- Bundle size optimization
- Caching strategies

---

For detailed implementation of individual components, refer to the code comments and JSDoc throughout the codebase.
