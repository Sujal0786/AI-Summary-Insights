const ProcessingState = ({ status, progress }) => {
  if (!status || status === 'idle') return null;

  const getProcessingSteps = () => {
    const steps = [
      { key: 'uploading', label: 'Uploading file', icon: 'upload' },
      { key: 'processing', label: 'Parsing data', icon: 'document' },
      { key: 'analyzing', label: 'AI analysis', icon: 'brain' },
      { key: 'generating', label: 'Generating insights', icon: 'lightbulb' },
      { key: 'emailing', label: 'Sending email', icon: 'mail' },
    ];

    return steps;
  };

  const getCurrentStepIndex = () => {
    switch (status) {
      case 'uploading':
        return 0;
      case 'processing':
        return Math.min(Math.floor((progress || 0) / 25), 4);
      default:
        return 0;
    }
  };

  const getStepIcon = (icon, isActive, isCompleted) => {
    const colorClass = isCompleted ? 'text-green-500' : isActive ? 'text-blue-500' : 'text-gray-300';
    
    switch (icon) {
      case 'upload':
        return (
          <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'document':
        return (
          <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'brain':
        return (
          <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'lightbulb':
        return (
          <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className={`w-5 h-5 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const steps = getProcessingSteps();
  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-blue-900">Processing Progress</h4>
        <span className="text-xs text-blue-700 font-medium">
          {Math.round(progress || 0)}% Complete
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          return (
            <div
              key={step.key}
              className={`
                flex items-center space-x-3
                ${isActive ? 'scale-105' : ''}
                transition-all duration-200
              `}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${isCompleted ? 'bg-green-100' : isActive ? 'bg-blue-100' : 'bg-gray-100'}
              `}>
                {isCompleted ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  getStepIcon(step.icon, isActive, isCompleted)
                )}
              </div>
              
              <div className="flex-1">
                <p className={`
                  text-sm font-medium
                  ${isCompleted ? 'text-green-700' : isActive ? 'text-blue-700' : 'text-gray-500'}
                `}>
                  {step.label}
                </p>
                
                {isActive && (
                  <div className="mt-1">
                    <div className="w-full bg-blue-200 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${(progress || 0) % 25 * 4}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-blue-200">
        <p className="text-xs text-blue-600 text-center">
          {status === 'uploading' && 'Securely uploading your file...'}
          {status === 'processing' && 'AI is working on your insights...'}
          {status === 'success' && 'Processing complete!'}
        </p>
      </div>
    </div>
  );
};

export default ProcessingState;
