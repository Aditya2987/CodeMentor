# 🛡️ Error Handling Documentation

## Overview

CodeMentor AI now includes comprehensive error handling across the entire application - both frontend and backend. This ensures a smooth user experience even when things go wrong.

## ✨ Features

### Frontend Error Handling

#### 1. **Error Boundary Component**
Catches React component errors and displays a user-friendly fallback UI.

**Location:** `client/src/components/ErrorBoundary.jsx`

**Features:**
- Catches JavaScript errors anywhere in the component tree
- Displays friendly error message to users
- Shows detailed error info in development mode
- Provides "Try Again" and "Go Home" buttons
- Logs errors for debugging

**Usage:**
```jsx
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

#### 2. **Toast Notifications**
Beautiful, non-intrusive notifications for user feedback.

**Location:** `client/src/components/Toast.jsx`

**Types:**
- ✅ Success (green)
- ❌ Error (red)
- ⚠️ Warning (yellow)
- ℹ️ Info (blue)

**Features:**
- Auto-dismiss after 5 seconds
- Manual close button
- Smooth animations
- Stacks multiple toasts
- Customizable duration

**Usage:**
```jsx
import { useToast } from '../hooks/useToast';

const { success, error, warning, info } = useToast();

// Show notifications
success('Operation completed!');
error('Something went wrong');
warning('Please check your input');
info('New feature available');
```

#### 3. **Input Validation**
Client-side validation before API calls.

**Location:** `client/src/utils/errorHandler.js`

**Features:**
- Required field validation
- Min/max length validation
- Pattern matching (regex)
- Custom validation rules
- Real-time error display

**Example:**
```javascript
import { validateInput } from '../utils/errorHandler';

const validation = validateInput(
  { email, password },
  {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email'
    },
    password: {
      required: true,
      minLength: 6
    }
  }
);

if (!validation.isValid) {
  setFieldErrors(validation.errors);
}
```

#### 4. **API Error Handler**
Centralized API error handling with user-friendly messages.

**Location:** `client/src/utils/errorHandler.js`

**Features:**
- Network error detection
- HTTP status code handling
- User-friendly error messages
- Retry logic with exponential backoff
- Online/offline detection

**Error Messages:**
- 400: Invalid request
- 401: Session expired
- 403: Permission denied
- 404: Not found
- 429: Too many requests
- 500: Server error
- 503: Service unavailable

**Usage:**
```javascript
import { handleApiError, retryRequest } from '../utils/errorHandler';

try {
  const response = await axios.post('/api/endpoint', data);
} catch (error) {
  const errorInfo = handleApiError(error);
  showError(errorInfo.message);
}

// With retry
const data = await retryRequest(
  () => axios.get('/api/endpoint'),
  3, // max retries
  1000 // initial delay
);
```

#### 5. **Network Status Detection**
Detects online/offline status.

**Features:**
- Checks navigator.onLine
- Prevents API calls when offline
- Shows appropriate error messages

**Usage:**
```javascript
import { isOnline } from '../utils/errorHandler';

if (!isOnline()) {
  showError('No internet connection');
  return;
}
```

### Backend Error Handling

#### 1. **Error Handler Middleware**
Centralized error handling for Express.

**Location:** `server/middleware/errorHandler.js`

**Features:**
- Custom AppError class
- Development vs production error responses
- Database error handling
- JWT error handling
- Async error wrapper
- 404 handler

**Error Types Handled:**
- CastError (Invalid MongoDB ID)
- Duplicate key errors
- Validation errors
- JWT errors
- Token expiration

**Usage:**
```javascript
const { catchAsync, AppError } = require('../middleware/errorHandler');

router.post('/endpoint', catchAsync(async (req, res, next) => {
  if (!data) {
    return next(new AppError('Data is required', 400));
  }
  
  // Your logic here
  res.json({ success: true });
}));
```

#### 2. **Input Validation**
Server-side validation for all API endpoints.

**Features:**
- Required field checks
- Type validation
- Range validation
- Custom validation logic

**Example:**
```javascript
if (!goal || !goal.trim()) {
  return next(new AppError('Learning goal is required', 400));
}

if (weeksAvailable < 1 || weeksAvailable > 52) {
  return next(new AppError('Weeks must be between 1 and 52', 400));
}
```

#### 3. **API Error Responses**
Consistent error response format.

**Development Mode:**
```json
{
  "status": "error",
  "error": { /* full error object */ },
  "message": "Error message",
  "stack": "Error stack trace"
}
```

**Production Mode:**
```json
{
  "status": "error",
  "message": "User-friendly error message"
}
```

#### 4. **OpenAI Error Handling**
Specific handling for AI service errors.

**Errors Handled:**
- insufficient_quota
- rate_limit_exceeded
- authentication_failed
- timeout
- invalid_response

**Features:**
- Graceful fallback when API key not configured
- Timeout handling (30 seconds)
- Quota exceeded detection
- Rate limit handling

#### 5. **Graceful Shutdown**
Handles process termination gracefully.

**Features:**
- SIGTERM handling
- Unhandled rejection catching
- Server close on shutdown
- Connection cleanup

## 🎯 Error Handling Flow

### Frontend Flow
```
User Action
    ↓
Input Validation (client-side)
    ↓
Network Check (online/offline)
    ↓
API Call with Timeout
    ↓
Error Occurs?
    ├─ Yes → Handle Error
    │         ├─ Parse error type
    │         ├─ Show user-friendly message
    │         ├─ Log for debugging
    │         └─ Offer retry/fallback
    │
    └─ No → Success Response
              └─ Show success toast
```

### Backend Flow
```
API Request
    ↓
Route Handler (with catchAsync)
    ↓
Input Validation
    ↓
Business Logic
    ↓
Error Occurs?
    ├─ Yes → Error Middleware
    │         ├─ Identify error type
    │         ├─ Format response
    │         ├─ Log error
    │         └─ Send to client
    │
    └─ No → Success Response
```

## 📋 Error Handling Checklist

### For Every API Call
- [ ] Wrap in try-catch
- [ ] Check network status
- [ ] Validate input
- [ ] Set timeout
- [ ] Handle specific errors
- [ ] Show user feedback
- [ ] Log errors
- [ ] Provide fallback

### For Every Form
- [ ] Client-side validation
- [ ] Show field errors
- [ ] Disable submit while loading
- [ ] Show loading state
- [ ] Handle submission errors
- [ ] Clear errors on input change

### For Every Component
- [ ] Wrap in ErrorBoundary
- [ ] Handle loading states
- [ ] Handle empty states
- [ ] Handle error states
- [ ] Provide retry mechanism

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
NODE_ENV=production
OPENAI_API_KEY=your_key_here
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### Error Logging

**Development:**
- Errors logged to console
- Full stack traces shown
- Detailed error info in UI

**Production:**
- Errors logged to service (e.g., Sentry)
- Generic messages to users
- Stack traces hidden

## 🎨 User Experience

### Error Messages
- ✅ Clear and concise
- ✅ Actionable (tell user what to do)
- ✅ Non-technical language
- ✅ Appropriate tone
- ✅ Helpful suggestions

### Visual Feedback
- ✅ Toast notifications
- ✅ Inline field errors
- ✅ Loading spinners
- ✅ Disabled states
- ✅ Error icons

### Recovery Options
- ✅ Retry buttons
- ✅ Go back links
- ✅ Clear error buttons
- ✅ Alternative actions
- ✅ Help links

## 📊 Error Types & Handling

### Network Errors
**Cause:** No internet, server down, timeout
**Handling:** Show offline message, retry option
**User Action:** Check connection, try again

### Validation Errors
**Cause:** Invalid input
**Handling:** Show field-specific errors
**User Action:** Fix input, resubmit

### Authentication Errors
**Cause:** Expired token, invalid credentials
**Handling:** Redirect to login, clear session
**User Action:** Login again

### Permission Errors
**Cause:** Insufficient permissions
**Handling:** Show permission denied message
**User Action:** Contact admin, use different account

### Server Errors
**Cause:** Backend issues, database errors
**Handling:** Show generic error, log details
**User Action:** Try again later, contact support

### Rate Limit Errors
**Cause:** Too many requests
**Handling:** Show wait message, auto-retry
**User Action:** Wait and try again

## 🚀 Best Practices

### Do's ✅
- Always validate input
- Provide clear error messages
- Log errors for debugging
- Handle edge cases
- Test error scenarios
- Provide fallback options
- Show loading states
- Use error boundaries

### Don'ts ❌
- Don't expose sensitive info
- Don't show technical jargon
- Don't ignore errors silently
- Don't block UI indefinitely
- Don't show generic "Error" messages
- Don't forget to clean up
- Don't skip validation
- Don't trust client input

## 🧪 Testing Error Handling

### Manual Testing
1. Disconnect internet → Check offline handling
2. Submit invalid data → Check validation
3. Expire token → Check auth handling
4. Trigger server error → Check error display
5. Rapid requests → Check rate limiting

### Automated Testing
```javascript
// Example test
it('should show error message on API failure', async () => {
  mockApi.post.mockRejectedValue(new Error('Network error'));
  
  render(<Component />);
  fireEvent.click(screen.getByText('Submit'));
  
  await waitFor(() => {
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });
});
```

## 📈 Monitoring

### Metrics to Track
- Error rate by type
- API response times
- Failed requests
- User retry attempts
- Error recovery success

### Tools
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user flow
- Custom logging service

## 🎓 Examples

### Complete Error Handling Example

```javascript
import { useState } from 'react';
import { handleApiError, validateInput, isOnline } from '../utils/errorHandler';
import { useToast } from '../hooks/useToast';

function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { success, error } = useToast();

  const handleSubmit = async (data) => {
    // Clear previous errors
    setErrors({});

    // Check network
    if (!isOnline()) {
      error('No internet connection');
      return;
    }

    // Validate input
    const validation = validateInput(data, rules);
    if (!validation.isValid) {
      setErrors(validation.errors);
      error('Please fix the errors');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/endpoint', data, {
        timeout: 10000
      });
      
      success('Operation completed successfully!');
      // Handle success
    } catch (err) {
      const errorInfo = handleApiError(err);
      error(errorInfo.message);
      console.error('API Error:', errorInfo);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Your component JSX
  );
}
```

---

**Your application now has enterprise-grade error handling! 🛡️**
