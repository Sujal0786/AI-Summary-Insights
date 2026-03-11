import { useState } from 'react';

const EmailInput = ({ value, onChange, disabled }) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (touched) {
      if (!newValue) {
        setError('Email address is required');
      } else if (!validateEmail(newValue)) {
        setError('Please enter a valid email address');
      } else {
        setError('');
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (!value) {
      setError('Email address is required');
    } else if (!validateEmail(value)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email Address
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        
        <input
          type="email"
          id="email"
          name="email"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder="Enter your email address"
          className={`
            input-field pl-10
            ${error ? 'border-error-300 focus:ring-error-500' : ''}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          `}
          autoComplete="email"
        />
      </div>
      
      {error && (
        <div className="flex items-center space-x-2 text-error-600 text-sm">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {!error && value && validateEmail(value) && (
        <div className="flex items-center space-x-2 text-success-600 text-sm">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Email address is valid</span>
        </div>
      )}
      
      <p className="text-xs text-gray-500">
        We'll send your sales insights to this email address
      </p>
    </div>
  );
};

export default EmailInput;
