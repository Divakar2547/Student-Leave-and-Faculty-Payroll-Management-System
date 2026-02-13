# Leave and Payroll Management System - Frontend

## Project Overview

A production-ready Full Stack Student Leave and Faculty Payroll Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### 🔐 Authentication & Authorization
- JWT-based secure authentication
- Role-based access control (Student, Faculty, Admin)
- Protected routes with middleware
- Session management with localStorage
- Password encryption with bcrypt

### 👨‍🎓 Student Features
- Apply for leaves (Casual, Sick, Earned, Maternity, Emergency)
- View leave balance and leave history
- Track attendance records
- View generated payslips
- Manage profile information
- Dashboard with analytics

### 👨‍🏫 Faculty Features
- Apply for leaves
- Manage own leaves
- View attendance records
- Access payroll information
- View payslips
- Faculty-specific dashboard

### 🛡️ Admin Features
- User management (Create, Read, Update, Delete)
- Approve/Reject leave requests
- Mark attendance
- Generate and manage payslips
- View comprehensive reports
- Payroll management
- System analytics and statistics

## Technology Stack

### Frontend
- **React 19** with React Router v6
- **Tailwind CSS** for responsive UI design
- **Axios** with interceptors for API calls
- **React Icons** for beautiful icons
- **Chart.js** for analytics and charts
- **jsPDF & html2Canvas** for digital payslip generation
- **date-fns** for date formatting

### Backend (To be implemented)
- **Node.js** and **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password encryption

## Project Structure

```
frontend/
├── src/
│   ├── Component/          # Reusable UI components
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   ├── Layout.js
│   │   ├── Alert.js
│   │   └── LoadingSpinner.js
│   ├── contexts/           # React Context for state management
│   │   └── AuthContext.js
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.js
│   ├── middleware/         # Route protection and guards
│   │   └── ProtectedRoute.js
│   ├── Pages/              # Page components
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── StudentDashboard.js
│   │   ├── FacultyDashboard.js
│   │   ├── AdminDashboard.js
│   │   ├── ApplyLeave.js
│   │   ├── Attendance.js
│   │   ├── Payroll.js
│   │   ├── Profile.js
│   │   └── Unauthorized.js
│   ├── Services/           # API integration layer
│   │   └── api.js          # Axios setup with interceptors
│   ├── config/             # Configuration files
│   │   └── config.js       # API endpoints and config
│   ├── utils/              # Utility functions
│   │   ├── helpers.js      # Helper functions
│   │   ├── validators.js   # Form validation
│   │   └── constants.js    # App constants
│   ├── App.js              # Main app routing
│   ├── index.js            # App entry point
│   └── index.css           # Global styles with Tailwind
├── package.json
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   Create a `.env.local` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   The application will run at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/refresh-token` - Refresh JWT token

### Student APIs
- `GET /api/students/dashboard` - Get student dashboard data
- `GET /api/students/leaves` - Get student leaves
- `POST /api/students/leaves/apply` - Apply for leave
- `GET /api/students/leave-balance` - Get leave balance
- `GET /api/students/attendance` - Get attendance records
- `GET /api/students/payslips` - Get payslips

### Faculty APIs
- `GET /api/faculty/dashboard` - Get faculty dashboard
- `GET /api/faculty/leaves` - Get faculty leaves
- `POST /api/faculty/leaves/apply` - Apply for leave
- `GET /api/faculty/attendance` - Get attendance
- `GET /api/faculty/payslips` - Get payslips

### Admin APIs
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - Get all users
- `GET /api/admin/leaves` - Get all leave requests
- `PUT /api/admin/leaves/approve` - Approve leave
- `PUT /api/admin/leaves/reject` - Reject leave
- `GET /api/admin/attendance` - Get attendance records
- `POST /api/admin/attendance/mark` - Mark attendance
- `GET /api/admin/payroll` - Get payroll data
- `POST /api/admin/payroll/generate-payslips` - Generate payslips
- `GET /api/admin/payslips` - Get all payslips

## User Roles

### Student
- Apply and manage personal leaves
- View attendance records
- Access payslips
- View dashboard with personal statistics

### Faculty
- Similar to student features
- Faculty-specific dashboard
- Faculty payroll management

### Admin
- Full system control
- User management
- Leave request approval
- Attendance management
- Payroll generation and management

## Key Features Implementation

### 1. Authentication System
- Form validation with password strength requirements
- JWT token storage in localStorage
- Automatic token expiration handling
- Protected routes with role-based access

### 2. Leave Management
- Multiple leave types support
- Leave balance tracking
- Leave request workflow (Pending → Approved/Rejected)
- Leave history and reports

### 3. Attendance System
- Daily attendance marking
- Attendance statistics
- Attendance vs Leave correlation
- Monthly and yearly reports

### 4. Payroll System
- Automated salary calculation
- Deduction management
- Digital payslip generation (PDF)
- Payroll history and reports
- Salary analytics

### 5. Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive layout for all screen sizes
- Touch-friendly UI components
- Accessible design patterns

## Form Validation

All forms include comprehensive client-side validation:
- Email format validation
- Password strength requirements (8+ chars, uppercase, lowercase, number, special char)
- Phone number validation (10 digits)
- Date range validation
- Required field validation

## State Management

Uses React Context API for:
- Authentication state
- User information
- Authorization tokens
- Global error handling

## Axios Interceptors

Implemented for:
- Automatic JWT token attachment to requests
- Request/response transformation
- Automatic logout on 401 errors
- Error response handling

## CSS and Styling

- **Tailwind CSS** for utility-first styling
- Custom CSS variables for theme
- Responsive design patterns
- Dark mode ready (customizable)
- Consistent color scheme

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of routes
- Optimized re-renders with React.memo
- Efficient API calls with proper caching
- Image optimization

## Security Measures

- Protected API routes with JWT
- XSS protection through React's built-in escaping
- CSRF token in headers
- Secure password validation
- HTTP-only cookies for tokens (backend)
- CORS configuration (backend)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure
- Keep components small and focused
- Separate concerns (container vs presentational)
- Reuse components when possible
- Use PropTypes for type checking (optional with TypeScript)

### Git Workflow
- Create feature branches for new features
- Write clear commit messages
- Create pull requests for code review
- Maintain clean commit history

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify/Any Static Hosting
- The build process creates optimized static files
- Configure environment variables for production
- Ensure API URL is correctly set for production

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests (if configured)
- `npm run eject` - Eject from Create React App (not reversible)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend is running on correct port and CORS is configured
2. **Token Expiration**: Clear localStorage and login again
3. **Styles not loading**: Make sure Tailwind CSS is properly configured
4. **API calls failing**: Check API endpoint configuration in `src/config/config.js`

## Future Enhancements

- [ ] Email notifications for leave requests
- [ ] SMS notifications for important updates
- [ ] Mobile app version
- [ ] Advanced analytics and reporting
- [ ] Calendar view for attendance/leaves
- [ ] Export reports to Excel
- [ ] Two-factor authentication
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Real-time updates with WebSockets

## Contributing

Follow the project structure and guidelines above. Create meaningful commits and descriptive pull requests.

## License

This project is proprietary and confidential.

## Support

For issues and questions, contact the development team.

---

**Built with ❤️ for Education Management**
