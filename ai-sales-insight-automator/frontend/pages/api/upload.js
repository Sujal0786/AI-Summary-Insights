import formidable from 'formidable';

// Disable body parsing for file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse form data
    const form = formidable({});
    
    const [fields, files] = await form.parse(req);
    
    const email = fields.email?.[0];
    const file = files.file?.[0];

    // Validate input
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Valid email address is required'
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const filename = file.originalFilename;
    console.log(`Processing file: ${filename} for email: ${email}`);

    // For now, return mock success
    res.status(200).json({
      success: true,
      message: 'Sales insights processed and emailed successfully',
      data: {
        email,
        filename,
        recordsProcessed: 15,
        metrics: {
          totalRevenue: 1428375,
          topProductCategory: 'Electronics',
          topRegion: 'North'
        },
        emailSent: true,
        messageId: 'mock-message-id'
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
}
