const csv = require('csv-parser');
const xlsx = require('xlsx');
const { Readable } = require('stream');

/**
 * Parse CSV file from buffer
 * @param {Buffer} buffer - File buffer
 * @returns {Promise<Array>} - Parsed data
 */
const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from(buffer);
    
    stream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

/**
 * Parse XLSX file from buffer
 * @param {Buffer} buffer - File buffer
 * @returns {Array} - Parsed data
 */
const parseXLSX = (buffer) => {
  try {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
  } catch (error) {
    throw new Error(`Error parsing XLSX file: ${error.message}`);
  }
};

/**
 * Parse file based on its type
 * @param {Buffer} buffer - File buffer
 * @param {string} filename - Original filename
 * @returns {Promise<Array>} - Parsed data
 */
const parseFile = async (buffer, filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  
  if (extension === 'csv') {
    return await parseCSV(buffer);
  } else if (extension === 'xlsx' || extension === 'xls') {
    return parseXLSX(buffer);
  } else {
    throw new Error('Unsupported file format');
  }
};

/**
 * Validate sales data structure
 * @param {Array} data - Parsed data
 * @returns {Object} - Validation result
 */
const validateSalesData = (data) => {
  if (!data || data.length === 0) {
    return { valid: false, error: 'No data found in file' };
  }

  const requiredColumns = ['Date', 'Product_Category', 'Region', 'Revenue'];
  const firstRow = data[0];
  const missingColumns = requiredColumns.filter(col => !(col in firstRow));
  
  if (missingColumns.length > 0) {
    return { 
      valid: false, 
      error: `Missing required columns: ${missingColumns.join(', ')}` 
    };
  }

  return { valid: true };
};

/**
 * Calculate sales metrics
 * @param {Array} data - Sales data
 * @returns {Object} - Calculated metrics
 */
const calculateMetrics = (data) => {
  // Clean and process revenue data
  const processedData = data.map(row => ({
    ...row,
    Revenue: parseFloat(row.Revenue) || 0,
    Product_Category: row.Product_Category || 'Unknown',
    Region: row.Region || 'Unknown'
  }));

  // Total revenue
  const totalRevenue = processedData.reduce((sum, row) => sum + row.Revenue, 0);

  // Revenue by product category
  const revenueByCategory = {};
  processedData.forEach(row => {
    if (!revenueByCategory[row.Product_Category]) {
      revenueByCategory[row.Product_Category] = 0;
    }
    revenueByCategory[row.Product_Category] += row.Revenue;
  });

  // Revenue by region
  const revenueByRegion = {};
  processedData.forEach(row => {
    if (!revenueByRegion[row.Region]) {
      revenueByRegion[row.Region] = 0;
    }
    revenueByRegion[row.Region] += row.Revenue;
  });

  // Find top performing category and region
  const topCategory = Object.entries(revenueByCategory)
    .sort(([,a], [,b]) => b - a)[0];

  const topRegion = Object.entries(revenueByRegion)
    .sort(([,a], [,b]) => b - a)[0];

  return {
    totalRevenue,
    topProductCategory: topCategory ? topCategory[0] : 'N/A',
    topRegion: topRegion ? topRegion[0] : 'N/A',
    totalRecords: data.length,
    revenueByCategory,
    revenueByRegion
  };
};

module.exports = {
  parseFile,
  validateSalesData,
  calculateMetrics
};
