const StatusIndicator = ({ status, isUploading, progress, errorMessage, successMessage }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'uploading':
        return {
          color: 'blue',
          icon: 'upload',
          title: 'Uploading File',
          description: 'Your file is being uploaded to our secure servers...'
        };
      case 'processing':
        return {
          color: 'yellow',
          icon: 'cog',
          title: 'Processing Data',
          description: 'AI is analyzing your sales data and generating insights...'
        };
      case 'success':
        return {
          color: 'green',
          icon: 'check',
          title: 'Success!',
          description: successMessage || 'Your insights have been generated and sent!'
        };
      case 'error':
        return {
          color: 'red',
          icon: 'x',
          title: 'Error',
          description: errorMessage || 'Something went wrong. Please try again.'
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  const getIcon = () => {
    switch (config.icon) {
      case 'upload':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'cog':
        return (
          <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'check':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'x':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getColorClasses = () => {
    switch (config.color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'green':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'red':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className={`
      border rounded-lg p-4 flex items-start space-x-3
      ${getColorClasses()}
      animate-slide-up
    `}>
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">
            {config.title}
          </h4>
          
          {isUploading && progress > 0 && (
            <span className="text-xs font-medium">
              {Math.round(progress)}%
            </span>
          )}
        </div>
        
        <p className="text-sm mt-1 opacity-90">
          {config.description}
        </p>
        
        {isUploading && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-current h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="mt-3 text-xs opacity-75">
            Check your email inbox for the detailed insights report.
          </div>
        )}
        
        {status === 'error' && (
          <div className="mt-3 text-xs opacity-75">
            Please check your file format and try again, or contact support if the issue persists.
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusIndicator;
