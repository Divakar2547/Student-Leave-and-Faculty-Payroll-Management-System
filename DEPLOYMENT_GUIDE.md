# Frontend Deployment Guide

## 🚀 Deployment Options

Your React frontend can be deployed to several platforms. Here are the top options:

### **Option 1: Vercel (Recommended - Easiest)**
- ✅ Built for React/Next.js
- ✅ Automatic deployments from GitHub
- ✅ Free tier included
- ✅ Global CDN
- ✅ Environment variables support

### **Option 2: Netlify**
- ✅ Easy GitHub integration
- ✅ Free tier included
- ✅ Continuous deployment
- ✅ Good for static React apps

### **Option 3: GitHub Pages (Free)**
- ✅ Completely free
- ✅ GitHub hosted
- ✅ Good for portfolio/demo

---

## **Quick Start: Vercel (Recommended)**

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd frontend
vercel
```

**Answer the prompts:**
- Link to existing project? → No (first time)
- Project name? → `leave-payroll-system` (or your choice)
- Directory? → `.` (current directory)

### Step 4: Environment Variables
Add to `.env.production`:
```
REACT_APP_API_URL=https://your-backend-api.com/api
```

---

## **Option 2: Deploy with GitHub & Vercel (Automated)**

### Step 1: Push to GitHub (Already Done ✓)
Your code is already on GitHub!

### Step 2: Connect to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repo: `Student-Leave-and-Faculty-Payroll-Management-System`
4. Select `frontend` folder as root
5. Add environment variables
6. Deploy!

**Every push to GitHub will auto-deploy!**

---

## **Option 3: Deploy with Netlify**

### Step 1: Build your app
```bash
cd frontend
npm run build
```

### Step 2: Go to Netlify
1. Visit [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub
4. Select your repo
5. Build command: `npm run build`
6. Publish directory: `build`
7. Deploy!

---

## **Pre-Deployment Checklist**

- ✅ App running locally
- ✅ All pages working
- ✅ Mock data integrated
- ✅ No console errors
- ✅ Pushed to GitHub

### Before Deploying:

1. **Update .env.production file:**
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

2. **Build the app locally:**
```bash
cd frontend
npm run build
```

3. **Check build size:**
```bash
npm run build
# Should show: build size in KB
```

---

## **Post-Deployment**

After deployment, you'll get a URL like:
- Vercel: `https://leave-payroll-system.vercel.app`
- Netlify: `https://your-site.netlify.app`

### Test the deployment:
- Visit homepage
- Click "Get Started"
- Check dashboard loads
- Test all navigation

---

## **Common Issues & Solutions**

### Build fails?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API not connecting?
- Check `REACT_APP_API_URL` in environment variables
- Verify backend is running
- Check CORS settings on backend

### Page blank after deploy?
- Check browser console for errors
- Verify all imports are correct
- Ensure public/index.html exists

---

## **Recommended Setup**

1. **Frontend:** Vercel (free, auto-deploy from GitHub)
2. **Backend:** Railway or Render (free tier available)
3. **Database:** MongoDB Atlas (free tier)

---

## **Next Steps**

1. Choose Vercel (recommended) or Netlify
2. Run: `npm run build` to test locally
3. Deploy using your chosen platform
4. Share your live URL!

---

**Your GitHub Repo:**
📍 https://github.com/Divakar2547/Student-Leave-and-Faculty-Payroll-Management-System.git

**Status:** Ready to deploy! ✅
