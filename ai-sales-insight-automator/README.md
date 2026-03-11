# AI Sales Insight Automator

🚀 **Transform your sales data into actionable AI-powered insights in seconds**

A modern, production-ready web application that analyzes sales data using AI and delivers comprehensive insights directly to your inbox.

## 🌟 Live Demo

- **Frontend URL**: [https://ai-sales-insight-demo.vercel.app](https://ai-sales-insight-demo.vercel.app)
- **Backend API**: [https://ai-sales-insight-api.render.com](https://ai-sales-insight-api.render.com)
- **API Documentation**: [https://ai-sales-insight-api.render.com/api-docs](https://ai-sales-insight-api.render.com/api-docs)

## 📋 Project Overview

AI Sales Insight Automator is a full-stack application that enables users to:

1. **Upload** CSV or XLSX sales datasets
2. **Enter** their email address
3. **Process** data with advanced AI analysis
4. **Receive** professional sales insights via email
5. **Generate** comprehensive reports with strategic recommendations

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  External APIs  │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│  (OpenAI/SMTP)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌─────────┐            ┌─────────────┐         ┌─────────────┐
    │ Docker  │            │   Swagger   │         │   Nodemailer │
    │Compose │            │   Docs      │         │   Service    │
    └─────────┘            └─────────────┘         └─────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **UI Components**: Custom components with React
- **State Management**: React Hooks
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **File Processing**: csv-parser, xlsx
- **AI Integration**: OpenAI API
- **Email Service**: Nodemailer
- **API Documentation**: Swagger UI
- **Security**: Helmet, CORS, Rate Limiting

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render/Railway
- **Security**: Environment variables, input validation

## 📁 Repository Structure

```
ai-sales-insight-automator/
├── frontend/                    # Next.js frontend application
│   ├── pages/                   # Next.js pages
│   │   ├── _app.js            # App component with providers
│   │   └── index.js           # Main landing page
│   ├── components/             # Reusable React components
│   │   ├── FileUpload.js      # File upload component
│   │   ├── EmailInput.js      # Email input with validation
│   │   ├── StatusIndicator.js # Processing status display
│   │   └── ProcessingState.js # Multi-step progress tracker
│   ├── hooks/                  # Custom React hooks
│   │   └── useFileUpload.js   # File upload logic
│   ├── styles/                 # Global styles and TailwindCSS
│   │   └── globals.css        # Global styles with custom components
│   ├── package.json           # Frontend dependencies
│   ├── next.config.js         # Next.js configuration
│   └── tailwind.config.js     # TailwindCSS configuration
├── backend/                     # Express.js backend API
│   ├── src/                   # Source code
│   │   ├── controllers/       # Request handlers
│   │   │   └── uploadController.js
│   │   ├── routes/            # API routes
│   │   │   └── upload.js      # Upload endpoint with Swagger docs
│   │   ├── services/          # Business logic
│   │   │   ├── aiService.js   # OpenAI integration
│   │   │   └── emailService.js # Nodemailer service
│   │   ├── middleware/        # Express middleware
│   │   │   ├── errorHandler.js
│   │   │   └── fileValidation.js
│   │   ├── utils/             # Utility functions
│   │   │   └── fileParser.js  # CSV/XLSX parsing
│   │   └── config/            # Configuration files
│   ├── server.js              # Express server setup
│   ├── package.json           # Backend dependencies
│   └── healthcheck.js         # Docker health check
├── docker/                     # Docker configuration
│   ├── Dockerfile.backend     # Backend Docker image
│   └── Dockerfile.frontend    # Frontend Docker image
├── .github/                    # GitHub workflows
│   └── workflows/
│       └── ci.yml            # CI/CD pipeline
├── docker-compose.yml          # Multi-container setup
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)
- OpenAI API key
- SMTP email credentials

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-sales-insight-automator.git
   cd ai-sales-insight-automator
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Docs: http://localhost:5000/api-docs

### Docker Setup

1. **Using Docker Compose**
   ```bash
   # Configure environment variables
   cp .env.example .env
   
   # Start all services
   docker-compose up -d
   
   # View logs
   docker-compose logs -f
   ```

2. **Individual Services**
   ```bash
   # Backend only
   docker build -f docker/Dockerfile.backend -t ai-sales-backend ./backend
   docker run -p 5000:5000 ai-sales-backend

   # Frontend only
   docker build -f docker/Dockerfile.frontend -t ai-sales-frontend ./frontend
   docker run -p 3000:3000 ai-sales-frontend
   ```

## 📊 API Documentation

### Main Endpoint

#### POST /api/upload

Upload and process sales data file.

**Request:**
```bash
curl -X POST \
  http://localhost:5000/api/upload \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@sales_data.csv' \
  -F 'email=user@example.com'
```

**Response:**
```json
{
  "success": true,
  "message": "Sales insights processed and emailed successfully",
  "data": {
    "email": "user@example.com",
    "filename": "sales_data.csv",
    "recordsProcessed": 150,
    "metrics": {
      "totalRevenue": 500000,
      "topProductCategory": "Electronics",
      "topRegion": "North"
    },
    "emailSent": true,
    "messageId": "abc123def456"
  }
}
```

#### GET /api/status

Check system health and service status.

**Response:**
```json
{
  "success": true,
  "status": "operational",
  "services": {
    "email": "connected",
    "ai": "configured"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Interactive Documentation

Visit `/api-docs` for interactive Swagger UI documentation.

## 🎯 Sample Data Format

Your CSV/XLSX file should include these columns:

```csv
Date,Product_Category,Region,Units_Sold,Unit_Price,Revenue,Status
2026-01-05,Electronics,North,150,1200,180000,Shipped
2026-01-12,Home Appliances,South,45,450,20250,Shipped
2026-01-20,Electronics,East,80,1100,88000,Delivered
2026-02-15,Electronics,North,210,1250,262500,Delivered
2026-02-28,Home Appliances,North,60,400,24000,Cancelled
2026-03-10,Electronics,West,95,1150,109250,Shipped
```

## 🌍 Deployment Guide

### Frontend Deployment (Vercel)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   cd frontend
   vercel --prod
   ```

2. **Environment Variables**
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

### Backend Deployment (Render)

1. **Create Web Service**
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables from `.env.example`

2. **Required Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   OPENAI_API_KEY=your_openai_key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

### Production Considerations

- **Security**: Use HTTPS, environment variables, input validation
- **Performance**: Implement caching, CDN, monitoring
- **Scaling**: Load balancer, horizontal scaling
- **Monitoring**: Logs, error tracking, uptime monitoring

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### Frontend Tests
```bash
cd frontend
npm test                # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### API Testing
```bash
# Health check
curl http://localhost:5000/health

# Status endpoint
curl http://localhost:5000/api/status

# File upload test
curl -X POST \
  -F "file=@test-data.csv" \
  -F "email=test@example.com" \
  http://localhost:5000/api/upload
```

## 🔧 Configuration

### Email Service Setup

#### Gmail (Recommended)
1. Enable 2-Step Verification
2. Generate App Password
3. Use these settings:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

#### Outlook
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
```

#### SendGrid
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

### OpenAI API Setup

1. Create account at [OpenAI Platform](https://platform.openai.com/)
2. Generate API key
3. Add to environment:
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```

## 🚨 Troubleshooting

### Common Issues

1. **File Upload Fails**
   - Check file size (max 10MB)
   - Verify file format (CSV/XLSX only)
   - Ensure required columns are present

2. **Email Not Sending**
   - Verify SMTP credentials
   - Check email provider settings
   - Confirm firewall isn't blocking port 587

3. **AI Analysis Fails**
   - Check OpenAI API key
   - Verify API quota/balance
   - Review rate limits

4. **Docker Issues**
   - Ensure Docker is running
   - Check port availability
   - Verify environment variables

### Debug Mode

Enable detailed logging:
```bash
# Backend
DEBUG=ai-sales:* npm run dev

# Frontend
NEXT_PUBLIC_DEBUG=true npm run dev
```

## 📈 Performance Metrics

- **File Processing**: < 5 seconds for 10MB files
- **AI Analysis**: < 10 seconds for typical datasets
- **Email Delivery**: < 30 seconds
- **API Response**: < 2 seconds average
- **Uptime**: 99.9% target

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Use semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for AI capabilities
- [Nodemailer](https://nodemailer.com/) for email service
- [Next.js](https://nextjs.org/) for frontend framework
- [Express.js](https://expressjs.com/) for backend framework
- [TailwindCSS](https://tailwindcss.com/) for styling

## 📞 Support

- **Documentation**: [Wiki](https://github.com/your-username/ai-sales-insight-automator/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/ai-sales-insight-automator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ai-sales-insight-automator/discussions)
- **Email**: support@ai-sales-insight.com

---

**⭐ Star this repository if it helped you!**

Made with ❤️ by the AI Sales Insight Team
