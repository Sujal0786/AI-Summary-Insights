# 🚀 COMPLETE DEPLOYMENT GUIDE

## **DEPLOYMENT ORDER: Backend First → Frontend Second**

---

## **STEP 1: Deploy Backend to Render (5 minutes)**

### **Option A: Using Render Dashboard (Easiest)**

1. **Go to Render.com**
   - Sign up/login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` as root directory (or keep root if backend is in root)

3. **Configure Settings**
   ```
   Name: ai-sales-insight-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   | Key | Value |
   |-----|-------|
   | NODE_ENV | production |
   | PORT | 10000 |
   | FRONTEND_URL | https://your-frontend-url.vercel.app |
   | OPENAI_API_KEY | your_openai_key_here |
   | SMTP_HOST | smtp.gmail.com |
   | SMTP_PORT | 587 |
   | SMTP_USER | your_email@gmail.com |
   | SMTP_PASS | your_app_password |

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - Copy the URL: `https://ai-sales-insight-backend.onrender.com`

---

## **STEP 2: Deploy Frontend to Vercel (3 minutes)**

### **Using Vercel Dashboard**

1. **Go to Vercel.com**
   - Sign up/login with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Select `frontend` as the root directory

3. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   ```

4. **Add Environment Variables**
   Go to Settings → Environment Variables
   
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your frontend is live at: `https://your-project.vercel.app`

---

## **STEP 3: Update Backend CORS (1 minute)**

After frontend is deployed, update backend environment variable:

1. Go to Render Dashboard → Your Service → Environment
2. Update `FRONTEND_URL` to your actual Vercel URL:
   ```
   https://your-project.vercel.app
   ```
3. Click "Save Changes"

---

## **STEP 4: Test Everything (2 minutes)**

1. **Test API Health**
   ```
   https://your-backend.onrender.com/health
   ```
   Should return: `{"status":"OK"}`

2. **Test File Upload**
   - Go to your Vercel frontend URL
   - Upload the `sample-data.csv` file
   - Enter your email
   - Click "Generate Insights"

3. **Check Email**
   - Check your inbox for the insights report

---

## **🔧 TROUBLESHOOTING**

### **If Backend Fails to Deploy:**
```bash
# Check logs in Render Dashboard → Logs
# Common issues:
# 1. Missing environment variables
# 2. Build command issues
# 3. Port configuration
```

### **If Frontend Can't Connect to Backend:**
```bash
# 1. Verify NEXT_PUBLIC_API_URL is correct
# 2. Check backend CORS settings (FRONTEND_URL)
# 3. Ensure backend is running (check /health endpoint)
```

### **If Email Not Sending:**
```bash
# 1. Verify SMTP credentials
# 2. For Gmail: Use App Password (not regular password)
# 3. Check spam folder
```

---

## **📋 QUICK REFERENCE COMMANDS**

### **Backend (Render)**
```bash
# Health Check
curl https://your-backend.onrender.com/health

# API Status
curl https://your-backend.onrender.com/api/status

# Test Upload
curl -X POST \
  -F "file=@sample-data.csv" \
  -F "email=test@example.com" \
  https://your-backend.onrender.com/api/upload
```

### **Frontend (Vercel)**
```bash
# Your live URL
https://your-project.vercel.app
```

---

## **✅ DEPLOYMENT CHECKLIST**

- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend deployed on Vercel
- [ ] NEXT_PUBLIC_API_URL set correctly
- [ ] FRONTEND_URL updated in backend
- [ ] Environment variables configured
- [ ] Test file upload works
- [ ] Email delivery works
- [ ] AI insights generating

---

## **🎯 LIVE URLs (Replace with yours)**

| Service | URL |
|---------|-----|
| Frontend | `https://ai-sales-insight.vercel.app` |
| Backend API | `https://ai-sales-insight-api.onrender.com` |
| API Docs | `https://ai-sales-insight-api.onrender.com/api-docs` |

---

**Total Deployment Time: ~10 minutes**

**Need Help?** Check the logs in both Render and Vercel dashboards!
