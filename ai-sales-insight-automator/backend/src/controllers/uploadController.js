const { parseFile, validateSalesData, calculateMetrics } = require('../utils/fileParser');
const aiService = require('../services/aiService');
const emailService = require('../services/emailService');
const Joi = require('joi');

/**
 * Validate email address
 */
const emailSchema = Joi.string().email().required();

/**
 * Handle file upload and processing
 */
const uploadController = {
  /**
   * Process uploaded sales file and generate insights
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  processSalesData: async (req, res) => {
    try {
      // Validate input
      const { error } = emailSchema.validate(req.body.email);
      if (error) {
        return res.status(400).json({
          success: false,
          error: 'Valid email address is required'
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        });
      }

      const email = req.body.email;
      const file = req.file;
      const filename = file.originalname;

      console.log(`Processing file: ${filename} for email: ${email}`);

      // Parse the uploaded file
      let salesData;
      try {
        salesData = await parseFile(file.buffer, filename);
        console.log(`Successfully parsed ${salesData.length} records`);
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          error: `File parsing error: ${parseError.message}`
        });
      }

      // Validate sales data structure
      const validation = validateSalesData(salesData);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          error: validation.error
        });
      }

      // Calculate metrics
      const metrics = calculateMetrics(salesData);
      console.log('Calculated metrics:', {
        totalRevenue: metrics.totalRevenue,
        topCategory: metrics.topProductCategory,
        topRegion: metrics.topRegion
      });

      // Generate AI insights
      let insights;
      try {
        insights = await aiService.generateInsights(metrics, salesData);
        console.log('AI insights generated successfully');
      } catch (aiError) {
        console.error('AI Service Error:', aiError);
        // Continue with fallback insights
        insights = `Sales Analysis Report:

Total Revenue: $${metrics.totalRevenue.toLocaleString()}
Best Performing Category: ${metrics.topProductCategory}
Best Performing Region: ${metrics.topRegion}

Key Insights:
- Strong performance in ${metrics.topProductCategory} category
- ${metrics.topRegion} region shows highest revenue generation
- Dataset contains ${metrics.totalRecords} sales records

Recommendations:
1. Focus marketing efforts on top-performing categories and regions
2. Analyze factors contributing to regional performance differences`;
      }

      // Send email with insights
      let emailResult;
      try {
        emailResult = await emailService.sendInsightsEmail(email, insights, metrics);
        console.log('Email sent successfully:', emailResult.messageId);
      } catch (emailError) {
        console.error('Email Service Error:', emailError);
        return res.status(500).json({
          success: false,
          error: `Failed to send email: ${emailError.message}`
        });
      }

      // Return success response
      res.status(200).json({
        success: true,
        message: 'Sales insights processed and emailed successfully',
        data: {
          email: email,
          filename: filename,
          recordsProcessed: salesData.length,
          metrics: {
            totalRevenue: metrics.totalRevenue,
            topProductCategory: metrics.topProductCategory,
            topRegion: metrics.topRegion
          },
          emailSent: true,
          messageId: emailResult.messageId
        }
      });

    } catch (error) {
      console.error('Upload Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error during processing'
      });
    }
  },

  /**
   * Get system status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getStatus: async (req, res) => {
    try {
      const emailConnected = await emailService.verifyConnection();
      
      res.status(200).json({
        success: true,
        status: 'operational',
        services: {
          email: emailConnected ? 'connected' : 'disconnected',
          ai: process.env.OPENAI_API_KEY ? 'configured' : 'not configured'
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to get system status'
      });
    }
  }
};

module.exports = uploadController;
