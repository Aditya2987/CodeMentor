// Centralized error handling utility

export class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const getErrorMessage = (error) => {
  // Network errors
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return 'Request timeout. Please check your internet connection and try again.';
    }
    if (error.message === 'Network Error') {
      return 'Unable to connect to server. Please check your internet connection.';
    }
    return 'Network error. Please try again later.';
  }

  // HTTP errors
  const status = error.response?.status;
  const message = error.response?.data?.message;

  switch (status) {
    case 400:
      return message || 'Invalid request. Please check your input.';
    case 401:
      return 'Session expired. Please login again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return message || 'This resource already exists.';
    case 422:
      return message || 'Validation error. Please check your input.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
      return 'Server error. Our team has been notified.';
    case 502:
    case 503:
    case 504:
      return 'Service temporarily unavailable. Please try again in a few moments.';
    default:
      return message || 'An unexpected error occurred. Please try again.';
  }
};

export const handleApiError = (error, fallbackMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  const userMessage = getErrorMessage(error);
  
  // Log to error tracking service (e.g., Sentry) in production
  if (process.env.NODE_ENV === 'production') {
    // logToErrorTracking(error);
  }
  
  return {
    message: userMessage,
    originalError: error,
    timestamp: new Date().toISOString()
  };
};

export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      const isLastAttempt = i === maxRetries - 1;
      const shouldRetry = error.response?.status >= 500 || !error.response;
      
      if (isLastAttempt || !shouldRetry) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};

export const validateInput = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];
    
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }
    
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${field} must be less than ${rule.maxLength} characters`;
    }
    
    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} format is invalid`;
    }
    
    if (rule.custom && value) {
      const customError = rule.custom(value);
      if (customError) {
        errors[field] = customError;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const isOnline = () => {
  return navigator.onLine;
};

export const showNotification = (message, type = 'info') => {
  // This can be integrated with a toast library like react-hot-toast
  console.log(`[${type.toUpperCase()}] ${message}`);
  return { message, type };
};
