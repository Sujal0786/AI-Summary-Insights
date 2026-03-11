const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Only initialize email service if SMTP credentials are configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      this.isConfigured = true;
    } else {
      console.warn('SMTP credentials not configured. Email service will be disabled.');
      this.isConfigured = false;
    }
  }

  /**
   * Send sales insights email
   * @param {string} to - Recipient email
   * @param {string} insights - AI-generated insights
   * @param {Object} metrics - Sales metrics
   * @returns {Promise<Object>} - Email send result
   */
  async sendInsightsEmail(to, insights, metrics) {
    // If email service is not configured, return mock success
    if (!this.isConfigured) {
      console.log(`Email would be sent to ${to} (SMTP not configured)`);
      return {
        success: true,
        messageId: 'mock-message-id',
        response: 'Email service not configured - mock success'
      };
    }

    try {
      const mailOptions = {
        from: `"AI Sales Insight Automator" <${process.env.SMTP_USER}>`,
        to: to,
        subject: 'Your Sales Insights Report',
        html: this.generateEmailTemplate(insights, metrics),
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      
      return {
        success: true,
        messageId: info.messageId,
        response: info.response
      };
    } catch (error) {
      console.error('Email Service Error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  /**
   * Generate HTML email template
   * @param {string} insights - AI-generated insights
   * @param {Object} metrics - Sales metrics
   * @returns {string} - HTML email content
   */
  generateEmailTemplate(insights, metrics) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Insights Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #007bff;
        }
        .header h1 {
            color: #007bff;
            margin: 0;
            font-size: 28px;
        }
        .metrics {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .metric-item {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 10px;
            background-color: white;
            border-radius: 5px;
            border-left: 4px solid #007bff;
        }
        .metric-label {
            font-weight: 600;
            color: #555;
        }
        .metric-value {
            font-weight: bold;
            color: #007bff;
        }
        .insights {
            margin: 30px 0;
        }
        .insights h2 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        .insights-content {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            white-space: pre-line;
            font-size: 16px;
            line-height: 1.8;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
        }
        .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 20px;
            margin: 0 auto 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AI</div>
            <h1>Sales Insights Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="metrics">
            <h3>Key Metrics</h3>
            <div class="metric-item">
                <span class="metric-label">Total Revenue</span>
                <span class="metric-value">$${metrics.totalRevenue.toLocaleString()}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Top Product Category</span>
                <span class="metric-value">${metrics.topProductCategory}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Top Region</span>
                <span class="metric-value">${metrics.topRegion}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Total Records</span>
                <span class="metric-value">${metrics.totalRecords}</span>
            </div>
        </div>

        <div class="insights">
            <h2>AI-Generated Insights</h2>
            <div class="insights-content">${insights}</div>
        </div>

        <div class="footer">
            <p>This report was generated by AI Sales Insight Automator</p>
            <p>For questions or support, please contact our team</p>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Verify SMTP configuration
   * @returns {Promise<boolean>} - Connection verification result
   */
  async verifyConnection() {
    if (!this.isConfigured) {
      console.log('SMTP not configured - returning false');
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('SMTP connection verified successfully');
      return true;
    } catch (error) {
      console.error('SMTP connection verification failed:', error);
      return false;
    }
  }
}

module.exports = new EmailService();
