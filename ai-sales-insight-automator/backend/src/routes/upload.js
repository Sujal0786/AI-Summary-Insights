const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { upload } = require('../middleware/fileValidation');

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Sales insights processed and emailed successfully"
 *         data:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "user@example.com"
 *             filename:
 *               type: string
 *               example: "sales_data.csv"
 *             recordsProcessed:
 *               type: integer
 *               example: 150
 *             metrics:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *                   example: 500000
 *                 topProductCategory:
 *                   type: string
 *                   example: "Electronics"
 *                 topRegion:
 *                   type: string
 *                   example: "North"
 *             emailSent:
 *               type: boolean
 *               example: true
 *             messageId:
 *               type: string
 *               example: "abc123def456"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: "Invalid file format"
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload sales data file and receive AI-generated insights via email
 *     description: Upload a CSV or XLSX file containing sales data. The system will process the data, generate AI-powered insights, and email the results to the specified address.
 *     tags:
 *       - Sales Data Processing
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - email
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV or XLSX file containing sales data
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to receive the insights report
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: File processed successfully and insights emailed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 *       400:
 *         description: Bad request - invalid file format, missing data, or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     security: []
 *     x-rate-limit: 10 requests per 15 minutes
 */
router.post('/upload', upload.single('file'), uploadController.processSalesData);

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Get system status and service health
 *     description: Returns the current status of the system and connected services
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: System status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: string
 *                   example: "operational"
 *                 services:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "connected"
 *                     ai:
 *                       type: string
 *                       example: "configured"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00.000Z"
 *       500:
 *         description: Failed to get system status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/status', uploadController.getStatus);

module.exports = router;
