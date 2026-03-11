# 🚀 AI Sales Insight Automator

**Transform your sales data into actionable AI-powered insights in seconds**

A modern, production-ready full-stack application that analyzes sales data using advanced AI algorithms and delivers comprehensive insights directly to your inbox.

## 🌟 **Live Demo & Deployment**

- **🎨 Frontend**: [https://ai-summary-insights-ngzf.vercel.app/](https://ai-summary-insights-ngzf.vercel.app/)
- **⚙️ Backend API**: [https://ai-sales-insight-backend.onrender.com/](https://ai-sales-insight-backend.onrender.com/)
- **📚 API Documentation**: [https://ai-sales-insight-backend.onrender.com/api-docs](https://ai-sales-insight-backend.onrender.com/api-docs)

---

## 📋 **Project Overview**

AI Sales Insight Automator revolutionizes sales data analysis by providing:

1. **📤 Easy Upload** - Simply upload CSV or XLSX sales datasets
2. **📧 Email Delivery** - Enter your email to receive professional insights
3. **🤖 AI Analysis** - Advanced OpenAI-powered data processing
4. **📊 Comprehensive Reports** - Detailed metrics and strategic recommendations
5. **⚡ Real-time Processing** - Fast, efficient data analysis

---

## 🏗️ **System Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  External APIs  │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│  (OpenAI/SMTP)  │
│  Vercel Deploy  │    │ Render Deploy   │    │   Cloud Services│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌─────────┐            ┌─────────────┐         ┌─────────────┐
    │ Tailwind │            │   Swagger   │         │   Nodemailer │
    │   CSS   │            │   Docs      │         │   Service    │
    └─────────┘            └─────────────┘         └─────────────┘
```

---

## 🛠️ **Technology Stack**

### **Frontend Technologies**
- **Framework**: Next.js 14 with React 18
- **Styling**: TailwindCSS for modern, responsive design
- **HTTP Client**: Axios for API communication
- **State Management**: React Hooks (useState, useCallback)
- **Notifications**: React Hot Toast for user feedback
- **File Upload**: Custom drag-and-drop components
- **Form Handling**: React Hook Form with validation

### **Backend Technologies**
- **Runtime**: Node.js 18.x
- **Framework**: Express.js with RESTful API design
- **Security**: Helmet, CORS, Rate Limiting
- **File Processing**: Multer, CSV-Parser, XLSX
- **AI Integration**: OpenAI GPT for insights generation
- **Email Service**: Nodemailer with SMTP support
- **Documentation**: Swagger/OpenAPI 3.0
- **Validation**: Joi for data validation
- **Environment**: dotenv for configuration management

---

## 🚀 **How It Works**

### **Step-by-Step Process**

1. **📤 Data Upload**
   - User visits the web application
   - Drag-and-drop or select CSV/XLSX files
   - File validation (format, size, structure)
   - Real-time upload progress tracking

2. **🔍 Data Processing**
   - Backend receives file via secure API endpoint
   - Parses CSV/XLSX data into structured format
   - Validates sales data integrity
   - Calculates key metrics (revenue, categories, regions)

3. **🤖 AI Analysis**
   - Sends processed data to OpenAI API
   - Generates intelligent sales insights
   - Identifies trends, patterns, and opportunities
   - Creates strategic recommendations

4. **📧 Email Delivery**
   - Formats insights into professional HTML email
   - Sends comprehensive report to user's email
   - Includes metrics, charts, and actionable insights
   - Backup fallback if email service unavailable

5. **📊 Results**
   - Success confirmation in web interface
   - Detailed analytics dashboard
   - Downloadable reports (future feature)

---

## 📁 **Project Structure**

```
AI-Summary-Insights/
├── ai-sales-insight-automator/
│   ├── frontend/                 # Next.js Frontend Application
│   │   ├── components/          # Reusable UI Components
│   │   ├── hooks/              # Custom React Hooks
│   │   ├── pages/              # Next.js Pages & API Routes
│   │   ├── styles/             # TailwindCSS & Global Styles
│   │   └── package.json        # Frontend Dependencies
│   │
│   ├── backend/                 # Express.js Backend API
│   │   ├── src/
│   │   │   ├── controllers/    # Route Controllers
│   │   │   ├── services/       # Business Logic (AI, Email)
│   │   │   ├── routes/         # API Routes
│   │   │   ├── middleware/     # Custom Middleware
│   │   │   └── utils/          # Utility Functions
│   │   ├── server.js           # Main Server Entry Point
│   │   └── package.json        # Backend Dependencies
│   │
│   └── sample-data.csv         # Example Sales Data
│
├── render.yaml                  # Render Deployment Configuration
└── README.md                   # This Documentation
```

---

## 🚀 **Deployment Guide**

### **Frontend Deployment (Vercel)**

1. **Repository Setup**
   ```bash
   git clone https://github.com/Sujal0786/AI-Summary-Insights.git
   cd AI-Summary-Insights/ai-sales-insight-automator/frontend
   ```

2. **Vercel Configuration**
   - Connect repository to [Vercel](https://vercel.com)
   - Root Directory: `ai-sales-insight-automator/frontend`
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://ai-sales-insight-backend.onrender.com/api
     ```

3. **Deployment Commands**
   ```bash
   npm install
   npm run build
   ```

### **Backend Deployment (Render)**

1. **Repository Setup**
   ```bash
   cd AI-Summary-Insights/ai-sales-insight-automator/backend
   ```

2. **Render Configuration**
   - Connect repository to [Render](https://render.com)
   - Root Directory: `ai-sales-insight-automator/backend`
   - Runtime: Node 18
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check: `/health`

3. **Environment Variables**
   ```bash
   NODE_ENV=production
   PORT=10000
   OPENAI_API_KEY=your_openai_api_key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

---

## 🔧 **Local Development**

### **Prerequisites**
- Node.js 18.x or higher
- npm or yarn
- Git

### **Setup Instructions**

1. **Clone Repository**
   ```bash
   git clone https://github.com/Sujal0786/AI-Summary-Insights.git
   cd AI-Summary-Insights/ai-sales-insight-automator
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your API keys
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Docs: http://localhost:5000/api-docs

---

## 📊 **API Endpoints**

### **Main Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload and process sales data |
| GET | `/api/status` | Check system health status |
| GET | `/health` | Basic health check |
| GET | `/api-docs` | Interactive API documentation |

### **Upload Endpoint Example**

```javascript
const formData = new FormData();
formData.append('file', salesDataFile);
formData.append('email', 'user@example.com');

const response = await fetch('https://ai-sales-insight-backend.onrender.com/api/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

---

## 🔐 **Security Features**

- **Rate Limiting**: 10 requests per 15 minutes per IP
- **CORS Protection**: Configured for production domains
- **Input Validation**: Joi schema validation for all inputs
- **File Security**: Multer with file type and size restrictions
- **Helmet.js**: Security headers for Express.js
- **Environment Variables**: Sensitive data securely stored

---

## 📈 **Key Features**

### **User Experience**
- ✅ Modern, responsive design
- ✅ Drag-and-drop file upload
- ✅ Real-time progress tracking
- ✅ Email notifications
- ✅ Mobile-friendly interface

### **Technical Excellence**
- ✅ Production-ready architecture
- ✅ Comprehensive error handling
- ✅ API documentation with Swagger
- ✅ Automated deployment pipelines
- ✅ Performance optimization

### **Business Intelligence**
- ✅ AI-powered sales insights
- ✅ Revenue analysis by category
- ✅ Regional performance metrics
- ✅ Trend identification
- ✅ Strategic recommendations

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 **Future Enhancements**

- [ ] Dashboard with analytics visualization
- [ ] Multiple file format support
- [ ] User authentication and accounts
- [ ] Historical data tracking
- [ ] Advanced filtering and search
- [ ] Export to PDF/Excel reports
- [ ] Integration with CRM systems
- [ ] Real-time collaboration features

---

## 📞 **Support & Contact**

- **Issues & Bug Reports**: [GitHub Issues](https://github.com/Sujal0786/AI-Summary-Insights/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/Sujal0786/AI-Summary-Insights/discussions)
- **Live Support**: Available through the deployed application

---

## 🏆 **Acknowledgments**

- **OpenAI** for powerful AI capabilities
- **Vercel** for excellent frontend hosting
- **Render** for reliable backend deployment
- **Next.js Team** for the amazing framework
- **TailwindCSS** for utility-first CSS framework

---

**Built with ❤️ by AI Sales Insight Team**

*Transforming data into decisions, one insight at a time.*
