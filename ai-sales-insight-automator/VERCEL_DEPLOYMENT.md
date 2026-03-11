# 🚀 VERCEL DEPLOYMENT GUIDE - Frontend + Backend

## **Deploy Both Frontend and Backend on Vercel**

---

## **STEP 1: Prepare Your Project**

### **1.1 Verify Configuration Files**

Ensure these files exist in your root directory:
- ✅ `vercel.json` (already created)
- ✅ `frontend/next.config.js` (already updated)

### **1.2 Push to GitHub**
```bash
cd "c:\Users\sujal\OneDrive\Desktop\New folder (2)\AI-Summary-Insights\ai-sales-insight-automator"
git add .
git commit -m "Update for Vercel deployment - frontend and backend"
git push origin main
```

---

## **STEP 2: Deploy to Vercel (Both Services Together)**

### **Option A: Vercel Dashboard (Recommended)**

1. **Go to Vercel.com**
   - Sign up/login with your GitHub account

2. **Import Project**
   - Click "Add New Project"
   - Select your GitHub repository: `AI-Summary-Insights`
   - **Important**: Select the ROOT directory (not frontend or backend)

3. **Configure Project**
   ```
   Project Name: ai-sales-insight-automator
   Framework Preset: Next.js (auto-detected from frontend/package.json)
   Root Directory: ./ (root)
   ```

4. **Build Settings (Should auto-detect)**
   - If not detected automatically:
   ```
   Build Command: cd frontend && npm run build
   Output Directory: frontend/.next
   Install Command: npm install
   ```

5. **Add Environment Variables**
   
   Go to Settings → Environment Variables and add:
   
   ```
   OPENAI_API_KEY = your_openai_api_key_here
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = your_email@gmail.com
   SMTP_PASS = your_app_password_here
   FRONTEND_URL = https://your-project-url.vercel.app
   NODE_ENV = production
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait 3-5 minutes for build and deployment

---

## **STEP 3: Verify Deployment**

### **3.1 Test Frontend**
Visit: `https://ai-sales-insight-automator.vercel.app`

### **3.2 Test Backend API**
Visit: `https://ai-sales-insight-automator.vercel.app/api/health`
Should return: `{"status":"OK"}`

### **3.3 Test API Documentation**
Visit: `https://ai-sales-insight-automator.vercel.app/api-docs`

### **3.4 Test File Upload**
Use the Swagger UI or frontend to upload a test file

---

## **STEP 4: Custom Domain (Optional)**

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## **🔧 TROUBLESHOOTING**

### **Build Fails**
```bash
# Check if all dependencies are installed
# Ensure package.json has all required dependencies
# Check build logs in Vercel Dashboard
```

### **API Not Working**
```bash
# Check if vercel.json routes are configured correctly
# Verify environment variables are set
# Check function logs in Vercel Dashboard → Functions
```

### **CORS Errors**
```bash
# Update FRONTEND_URL environment variable to match your actual URL
# Check backend CORS configuration in server.js
```

---

## **📋 DEPLOYMENT CHECKLIST**

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Root directory selected (./)
- [ ] Environment variables added
- [ ] Build successful
- [ ] Frontend loads correctly
- [ ] API endpoints working (/api/health, /api/status)
- [ ] File upload working
- [ ] Email delivery working (if SMTP configured)
- [ ] AI insights generating (if OpenAI configured)

---

## **🎯 LIVE URLS**

After deployment, your URLs will be:

| Service | URL |
|---------|-----|
| **Frontend** | `https://ai-sales-insight-automator.vercel.app` |
| **Backend API** | `https://ai-sales-insight-automator.vercel.app/api` |
| **Health Check** | `https://ai-sales-insight-automator.vercel.app/api/health` |
| **API Docs** | `https://ai-sales-insight-automator.vercel.app/api-docs` |

---

## **⚡ QUICK TEST COMMANDS**

```bash
# Test Health Endpoint
curl https://ai-sales-insight-automator.vercel.app/api/health

# Test API Status
curl https://ai-sales-insight-automator.vercel.app/api/status

# Test File Upload
curl -X POST \
  -F "file=@sample-data.csv" \
  -F "email=test@example.com" \
  https://ai-sales-insight-automator.vercel.app/api/upload
```

---

## **💰 COST**

**Vercel Free Tier Includes:**
- ✅ Unlimited Frontend Deployments
- ✅ Serverless Functions (API)
- ✅ 100GB Bandwidth/month
- ✅ 1000GB-hours Execution/month
- ✅ SSL Certificates
- ✅ Automatic HTTPS

**Perfect for this project!**

---

## **📞 SUPPORT**

If deployment fails:
1. Check Vercel Dashboard → Deployment logs
2. Verify all environment variables are set
3. Check GitHub repo is public or properly connected
4. Ensure `vercel.json` is in root directory

**Deploy Now and Go Live!** 🚀
