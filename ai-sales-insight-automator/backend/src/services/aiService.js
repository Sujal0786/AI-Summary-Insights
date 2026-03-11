const OpenAI = require('openai');

class AIService {
  constructor() {
    // Only initialize OpenAI if API key is available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.isConfigured = true;
    } else {
      console.warn('OpenAI API key not configured. Using fallback mode.');
      this.isConfigured = false;
    }
  }

  /**
   * Generate sales insights using AI
   * @param {Object} metrics - Sales metrics
   * @param {Array} data - Raw sales data
   * @returns {Promise<string>} - AI-generated insights
   */
  async generateInsights(metrics, data) {
    // If OpenAI is not configured, return fallback insights immediately
    if (!this.isConfigured) {
      return this.generateFallbackInsights(metrics, data);
    }

    try {
      // Prepare data summary for AI
      const dataSummary = {
        totalRevenue: metrics.totalRevenue,
        topProductCategory: metrics.topProductCategory,
        topRegion: metrics.topRegion,
        totalRecords: metrics.totalRecords,
        sampleData: data.slice(0, 5).map(row => ({
          date: row.Date,
          category: row.Product_Category,
          region: row.Region,
          revenue: row.Revenue
        }))
      };

      const prompt = `You are a professional business analyst.

Analyze the following sales dataset summary and produce a concise executive report.

Dataset Summary:
- Total Revenue: $${metrics.totalRevenue.toLocaleString()}
- Top Product Category: ${metrics.topProductCategory}
- Top Region: ${metrics.topRegion}
- Total Records: ${metrics.totalRecords}

Sample Data:
${dataSummary.sampleData.map(row => 
  `Date: ${row.date}, Category: ${row.category}, Region: ${row.region}, Revenue: $${row.revenue}`
).join('\n')}

Include:
- Total revenue insight
- Best performing product category
- Best performing region
- Observed sales trends
- 2 strategic recommendations

Limit response to 200 words.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional business analyst providing concise, actionable sales insights."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Fallback response if AI service fails
      return `Sales Analysis Report:

Total Revenue: $${metrics.totalRevenue.toLocaleString()}
Best Performing Category: ${metrics.topProductCategory}
Best Performing Region: ${metrics.topRegion}

Key Insights:
- Strong performance in ${metrics.topProductCategory} category
- ${metrics.topRegion} region shows highest revenue generation
- Dataset contains ${metrics.totalRecords} sales records

Recommendations:
1. Focus marketing efforts on top-performing categories and regions
2. Analyze factors contributing to regional performance differences

Note: AI analysis service temporarily unavailable. This is a summary of key metrics.`;
    }
  }

  /**
   * Generate fallback insights when AI is not available
   * @param {Object} metrics - Sales metrics
   * @param {Array} data - Raw sales data
   * @returns {string} - Fallback insights
   */
  generateFallbackInsights(metrics, data) {
    return `Sales Analysis Report:

Total Revenue: $${metrics.totalRevenue.toLocaleString()}
Best Performing Category: ${metrics.topProductCategory}
Best Performing Region: ${metrics.topRegion}

Key Insights:
- Strong performance in ${metrics.topProductCategory} category with $${metrics.revenueByCategory?.[metrics.topProductCategory]?.toLocaleString() || 'N/A'} revenue
- ${metrics.topRegion} region shows highest revenue generation
- Dataset contains ${metrics.totalRecords} sales records
- Average revenue per record: $${Math.round(metrics.totalRevenue / metrics.totalRecords).toLocaleString()}

Recommendations:
1. Focus marketing efforts on top-performing categories and regions
2. Analyze factors contributing to regional performance differences
3. Consider expanding successful strategies to underperforming regions

Note: This is an automated analysis. Configure OpenAI API for enhanced AI-powered insights.`;
  }

  /**
   * Fallback to Groq API if OpenAI fails
   * @param {Object} metrics - Sales metrics
   * @param {Array} data - Raw sales data
   * @returns {Promise<string>} - AI-generated insights
   */
  async generateInsightsWithGroq(metrics, data) {
    try {
      // This would be implemented if Groq API key is available
      // For now, return the same fallback as above
      return await this.generateInsights(metrics, data);
    } catch (error) {
      console.error('Groq Service Error:', error);
      throw new Error('AI service temporarily unavailable');
    }
  }
}

module.exports = new AIService();
