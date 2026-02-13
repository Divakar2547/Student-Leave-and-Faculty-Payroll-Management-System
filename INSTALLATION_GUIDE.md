# Installation and Setup Guide - Frontend

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)
- **npm** (v8.x or higher) - usually comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **A code editor** - Recommended: [VS Code](https://code.visualstudio.com/)

## Step-by-Step Installation

### 1. Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd frontend

# Or if you have the files, navigate to the frontend directory
cd frontend
```

### 2. Verify Node Installation

Confirm that Node.js and npm are properly installed:

```bash
node --version
npm --version
```

You should see version numbers for both commands.

### 3. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will:
- Download all packages listed in `package.json`
- Create a `node_modules` folder (this might take a few minutes)
- Generate a `package-lock.json` file for consistency

### 4. Configure Environment Variables

Create a `.env.local` file in the frontend directory:

```bash
cp .env.example .env.local
```

Edit the `.env.local` file:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_REPORTS=true
```

**Important:** Make sure the `REACT_APP_API_URL` matches your backend server URL.

### 5. Verify Project Structure

Ensure your project structure looks like this:

```
frontend/
├── src/
│   ├── Component/
│   ├── Pages/
│   ├── Services/
│   ├── contexts/
│   ├── hooks/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .env.local
└── README.md
```

## Running the Application

### Development Server

Start the development server:

```bash
npm start
```

This will:
- Start the React development server
- Open your browser automatically to `http://localhost:3000`
- Enable Hot Reload - changes will reflect immediately

**Console Output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://YOUR_IP:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Testing Login

Use the demo credentials provided on the login page:

**Student:**
- Email: student@example.com
- Password: Pass@123

**Faculty:**
- Email: faculty@example.com
- Password: Pass@123

**Admin:**
- Email: admin@example.com
- Password: Pass@123

## Building for Production

### Create Production Build

```bash
npm run build
```

This will:
- Create an optimized production build
- Generate files in a `build/` directory
- Minimize bundle size significantly
- Output build information

### Build Output Example:

```
The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  https://cra.link/deployment
```

## Deployment Options

### 1. Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### 2. Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### 3. Deploy to GitHub Pages

Update `package.json`:
```json
"homepage": "https://yourusername.github.io/repository-name",
```

Then:
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

### 4. Manual Static Hosting

1. Run: `npm run build`
2. Upload the `build/` folder contents to your hosting service
3. Configure your server to route all requests to `index.html`

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:3000 | xargs kill -9
```

Or use a different port:
```bash
PORT=3001 npm start
```

### Module Not Found Errors

If you get "module not found" errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues

Ensure:
1. Backend server is running on the configured port
2. CORS is enabled on the backend
3. API URL in `.env.local` is correct
4. No firewall is blocking the connection

Check network requests in browser DevTools (F12 → Network tab)

### Tailwind CSS Not Loading

If styles aren't loading:

1. Make sure you installed dependencies: `npm install`
2. Restart the development server: `npm start`
3. Clear browser cache: Press `Ctrl+Shift+Delete` (Chrome)

### Token/Auth Issues

If you get logged out unexpectedly:

1. Check browser's `Application` tab → `Local Storage`
2. Verify token exists and is valid
3. Check backend is issuing tokens correctly
4. Verify API endpoint is correct in `src/config/config.js`

## Development Workflow

### 1. File Watching
React automatically watches for file changes. Save your changes and they'll reflect immediately.

### 2. Hot Reload
- Components update without losing state
- CSS changes apply instantly
- Try making changes to see it in action

### 3. DevTools
- Open browser DevTools: `F12` or `Ctrl+Shift+I`
- React DevTools Chrome Extension recommended
- Use Console tab to see logs
- Use Network tab to debug API calls

### 4. Code Formatting (Optional)

Install Prettier for automatic code formatting:

```bash
npm install --save-dev prettier

# Format code
npx prettier --write src/**/*.{js,css}
```

## Performance Tips

### 1. Code Splitting
Routes are automatically code-split by React Router for better performance.

### 2. Lazy Loading
Images and components load only when needed.

### 3. Bundle Analysis

Install bundle analyzer:
```bash
npm install --save-dev @cra-bundle-analyzer/cra-bundle-analyzer
npm start -- --analyze
```

### 4. Production Build Tips
- Minification reduces bundle by ~70%
- Gzip compression on server reduces by another ~70%
- Use CDN for static assets

## Available npm Scripts

```bash
npm start              # Start development server
npm run build          # Create production build
npm test              # Run tests (if configured)
npm run eject         # Eject from Create React App (not reversible)
```

## Environment Variables

Available environment variables for customization:

```
REACT_APP_API_URL         # Backend API URL
REACT_APP_ENABLE_ANALYTICS # Enable analytics (true/false)
REACT_APP_ENABLE_REPORTS  # Enable reports (true/false)
PORT                      # Development server port (default: 3000)
HOST                      # Development server host (default: localhost)
```

## Git Integration

### Recommended .gitignore entries:

```
node_modules/
build/
.env.local
.env.production.local
.DS_Store
*.log
```

### Git Workflow:

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to repository
git push origin feature/new-feature

# Create pull request on GitHub
```

## Next Steps

1. **Customize branding:**
   - Update logo in `src/Component/Header.js`
   - Update colors in `tailwind.config.js`
   - Update app name in `public/index.html`

2. **Connect to backend:**
   - Ensure backend is running
   - Update API URL in `.env.local`
   - Test API endpoints

3. **Add more features:**
   - Create new pages in `src/Pages/`
   - Add routes in `src/App.js`
   - Create API endpoints in `src/Services/api.js`

4. **Deploy:**
   - Build the project: `npm run build`
   - Deploy to hosting platform
   - Configure custom domain (if applicable)

## Support Resources

- **React Documentation:** https://react.dev
- **React Router:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **Axios:** https://axios-http.com
- **Create React App:** https://create-react-app.dev

## Performance Metrics

After deployment, monitor:

- Core Web Vitals (LCP, FID, CLS)
- Time to First Byte (TTFB)
- Time to Interactive (TTI)
- Bundle size
- Error rates

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Checklist

- [ ] JWT tokens stored securely
- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] API keys not exposed in frontend
- [ ] Sensitive data not logged
- [ ] Environmental variables used for configuration
- [ ] Regular dependency updates
- [ ] Security headers configured on server

---

**Last Updated:** [Date]
**Version:** 1.0.0

For issues or questions, refer to the main README.md or contact the development team.
