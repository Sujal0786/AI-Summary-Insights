import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(async (file, email) => {
    if (!file || !email) {
      throw new Error('File and email are required');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    setIsUploading(true);
    setProgress(0);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
      
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
        timeout: 60000, // 60 seconds timeout
      });

      if (response.data && response.data.success) {
        toast.success('File processed successfully!');
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        throw new Error(response.data?.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      let errorMessage = 'Upload failed. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          errorMessage = data?.error || 'Invalid file format or missing data';
        } else if (status === 413) {
          errorMessage = 'File too large. Maximum size is 10MB';
        } else if (status === 429) {
          errorMessage = 'Too many requests. Please wait and try again';
        } else if (status >= 500) {
          errorMessage = 'Server error. Please try again later';
        } else {
          errorMessage = data?.error || `Request failed with status ${status}`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection';
      } else if (error.code === 'ECONNABORTED') {
        // Timeout
        errorMessage = 'Request timed out. Please try again';
      } else {
        // Other error
        errorMessage = error.message || 'An unexpected error occurred';
      }
      
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }, []);

  const resetUpload = useCallback(() => {
    setIsUploading(false);
    setProgress(0);
  }, []);

  return {
    uploadFile,
    isUploading,
    progress,
    resetUpload,
  };
};

export default useFileUpload;
