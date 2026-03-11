import { useState } from 'react';
import Head from 'next/head';
import FileUpload from '../components/FileUpload';
import EmailInput from '../components/EmailInput';
import StatusIndicator from '../components/StatusIndicator';
import ProcessingState from '../components/ProcessingState';
import useFileUpload from '../hooks/useFileUpload';

export default function Home() {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { uploadFile, isUploading, progress } = useFileUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setErrorMessage('Please select a file to upload');
      setStatus('error');
      return;
    }

    if (!email) {
      setErrorMessage('Please enter your email address');
      setStatus('error');
      return;
    }

    setStatus('uploading');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await uploadFile(file, email);
      
      if (result.success) {
        setStatus('success');
        setSuccessMessage(`Sales insights have been sent to ${email}!`);
        setFile(null);
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to process file');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred');
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setErrorMessage('');
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setErrorMessage('');
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const resetForm = () => {
    setFile(null);
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <>
      <Head>
        <title>AI Sales Insight Automator</title>
        <meta name="description" content="Transform your sales data into actionable insights with AI-powered analysis" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <h1 className="text-2xl font-bold text-gradient">Sales Insight Automator</h1>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transform Your Sales Data into
              <span className="text-gradient"> Actionable Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your sales data and receive AI-powered insights delivered straight to your inbox
            </p>
          </div>

          {/* Upload Card */}
          <div className="card max-w-2xl mx-auto animate-slide-up">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Upload Sales Data</h3>
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: CSV, XLSX (Max file size: 10MB)
              </p>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={file}
                  disabled={isUploading}
                />

                {/* Email Input */}
                <EmailInput
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isUploading}
                />

                {/* Status Indicator */}
                {(status !== 'idle' || isUploading) && (
                  <StatusIndicator
                    status={status}
                    isUploading={isUploading}
                    progress={progress}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                  />
                )}

                {/* Processing State */}
                {isUploading && (
                  <ProcessingState
                    status={status}
                    progress={progress}
                  />
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={!file || !email || isUploading}
                    className="btn-primary flex-1"
                  >
                    {isUploading ? (
                      <span className="flex items-center justify-center">
                        <div className="loading-spinner w-5 h-5 mr-2"></div>
                        Processing...
                      </span>
                    ) : (
                      'Generate Insights'
                    )}
                  </button>

                  {(status === 'success' || status === 'error') && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-secondary"
                      disabled={isUploading}
                    >
                      Start Over
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Analysis</h4>
              <p className="text-gray-600">Advanced AI algorithms analyze your sales data for meaningful insights</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Delivery</h4>
              <p className="text-gray-600">Receive comprehensive insights directly in your inbox</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Instant Processing</h4>
              <p className="text-gray-600">Get your insights in seconds, not hours or days</p>
            </div>
          </div>

          {/* Sample Data Section */}
          <div className="mt-16 card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Sample Data Format</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your CSV/XLSX file should include these columns
              </p>
            </div>
            <div className="card-body">
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="grid grid-cols-6 gap-4 font-semibold text-gray-700 mb-2">
                  <div>Date</div>
                  <div>Product_Category</div>
                  <div>Region</div>
                  <div>Units_Sold</div>
                  <div>Unit_Price</div>
                  <div>Revenue</div>
                </div>
                <div className="grid grid-cols-6 gap-4 text-gray-600">
                  <div>2026-01-05</div>
                  <div>Electronics</div>
                  <div>North</div>
                  <div>150</div>
                  <div>1200</div>
                  <div>180000</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-500">
              <p>&copy; 2024 AI Sales Insight Automator. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
