# CodeMentor AI - Design Specification

## 1. System Architecture Overview

CodeMentor AI follows a modern three-tier architecture with clear separation between presentation, business logic, and data layers.

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   React UI   │  │  Monaco      │  │   Charts     │     │
│  │  Components  │  │   Editor     │  │  (Recharts)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│           │                │                  │             │
│           └────────────────┴──────────────────┘             │
│                          │                                  │
│                    Axios HTTP Client                        │
└──────────────────────────┼──────────────────────────────────┘
                           │
                    HTTPS / REST API
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                    SERVER LAYER                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Express.js API Gateway                   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │   Auth     │  │  Learning  │  │     AI     │    │  │
│  │  │  Routes    │  │   Routes   │  │   Routes   │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│           │                │                  │             │
│  ┌────────┴────────┐  ┌────┴─────┐  ┌────────┴────────┐   │
│  │  Auth Service   │  │ Learning │  │   AI Service    │   │
│  │  (JWT/bcrypt)   │  │  Service │  │  (OpenAI API)   │   │
│  └─────────────────┘  └──────────┘  └─────────────────┘   │
└──────────────────────────┼──────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                     DATA LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    User      │  │  Learning    │  │   Progress   │     │
│  │  Collection  │  │    Plan      │  │  Collection  │     │
│  │              │  │  Collection  │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                    MongoDB Database                         │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Architecture Principles

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data
2. **Stateless API**: RESTful design with JWT for authentication
3. **Scalability**: Horizontal scaling capability for both frontend and backend
4. **Security First**: Authentication, authorization, and data encryption
5. **Modularity**: Independent components that can be developed and tested separately

## 2. Frontend Design

### 2.1 Technology Stack

- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Styling**: Tailwind CSS 3.3.6
- **Routing**: React Router DOM 6.20.1
- **HTTP Client**: Axios 1.6.2
- **Code Editor**: Monaco Editor 4.6.0
- **Charts**: Recharts 2.10.3

### 2.2 Component Architecture

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar
│   ├── ProtectedRoute.jsx      # Auth guard
│   └── LoadingSpinner.jsx      # Loading indicator
├── pages/
│   ├── Login.jsx               # Login page
│   ├── Register.jsx            # Registration page
│   ├── Dashboard.jsx           # Main dashboard
│   ├── LearningPlan.jsx        # Learning plan management
│   └── CodeExplainer.jsx       # Code explanation interface
├── services/
│   ├── api.js                  # API client configuration
│   ├── authService.js          # Authentication logic
│   └── learningService.js      # Learning plan logic
├── utils/
│   ├── validators.js           # Input validation
│   └── formatters.js           # Data formatting
├── App.jsx                     # Root component
└── main.jsx                    # Entry point
```

### 2.3 Key Components Design

#### 2.3.1 Authentication Flow

```
User → Login Page → API Auth → JWT Token → Local Storage → Protected Routes
```

**State Management:**
- `isAuthenticated`: Boolean flag for auth status
- `token`: JWT stored in localStorage
- `user`: Current user profile data

#### 2.3.2 Dashboard Component

**Purpose**: Central hub showing learning progress and quick actions

**Key Elements:**
- Statistics cards (study hours, topics completed, streak)
- Quick action buttons to main features
- Recent activity feed
- Progress charts

**Data Flow:**
```
Dashboard → API /learning/stats → Display Stats → Update on interval
```

#### 2.3.3 Learning Plan Component

**Purpose**: Create, view, and manage personalized learning plans

**Features:**
- Plan generator form (goal, experience, time)
- Week-by-week plan display
- Progress tracking with visual indicators
- Mark weeks as completed

**State:**
- `plan`: Current learning plan object
- `showGenerator`: Toggle for plan creation form
- `loading`: Loading state for AI generation

#### 2.3.4 Code Explainer Component

**Purpose**: Interactive code explanation interface

**Features:**
- Monaco code editor with syntax highlighting
- Language selector (JavaScript, Python, Java, C++)
- Difficulty level selector (beginner, intermediate, advanced)
- Real-time explanation display

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Language: [JS ▼]  Level: [Beginner ▼]     │
├──────────────────────┬──────────────────────┤
│                      │                      │
│   Code Editor        │   Explanation        │
│   (Monaco)           │   Panel              │
│                      │                      │
│                      │                      │
├──────────────────────┴──────────────────────┤
│         [Explain Code Button]               │
└─────────────────────────────────────────────┘
```

### 2.4 Styling Guidelines

**Color Palette:**
- Primary: `#3b82f6` (Blue)
- Secondary: `#8b5cf6` (Purple)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Orange)
- Error: `#ef4444` (Red)
- Background: `#f9fafb` (Light Gray)
- Text: `#1f2937` (Dark Gray)

**Typography:**
- Font Family: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- Headings: Bold, larger sizes (2xl, 3xl, 4xl)
- Body: Regular weight, 16px base size
- Code: Monospace font

**Spacing:**
- Consistent padding/margin using Tailwind scale (4, 6, 8, 12, 16)
- Card spacing: p-6 (24px)
- Section spacing: mb-8 (32px)

### 2.5 Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Responsive Patterns:**
- Grid layouts collapse to single column on mobile
- Navigation converts to hamburger menu on mobile
- Code editor maintains minimum usable width
- Charts adapt to container width

## 3. Backend Design

### 3.1 Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose 8.0.3
- **Authentication**: JWT (jsonwebtoken 9.0.2) + bcryptjs 2.4.3
- **AI Integration**: OpenAI API 4.20.1
- **CORS**: cors 2.8.5

### 3.2 API Architecture

#### 3.2.1 RESTful Endpoints

**Authentication Routes** (`/api/auth`)
```
POST   /register    - Create new user account
POST   /login       - Authenticate user
GET    /profile     - Get current user profile
PUT    /profile     - Update user profile
```

**Learning Routes** (`/api/learning`)
```
POST   /plan        - Create learning plan
GET    /plan        - Get user's learning plan
PATCH  /plan/:id/progress - Update progress
GET    /stats       - Get learning statistics
```

**AI Routes** (`/api/ai`)
```
POST   /explain     - Explain code snippet
POST   /generate-plan - Generate learning plan
POST   /debug       - Get debugging assistance
POST   /chat        - General AI conversation
```

#### 3.2.2 Request/Response Format

**Standard Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Standard Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### 3.3 Database Design

#### 3.3.1 User Schema

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, indexed),
  password: String (required, hashed),
  experienceLevel: String (enum: beginner/intermediate/advanced),
  learningGoal: String,
  studyTimePerWeek: Number (default: 5),
  knownLanguages: [String],
  createdAt: Date (default: now),
  updatedAt: Date
}
```

**Indexes:**
- `email`: Unique index for fast lookup
- `createdAt`: For sorting and analytics

#### 3.3.2 Learning Plan Schema

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, required, indexed),
  goal: String (required),
  weeks: [{
    weekNumber: Number,
    topics: [String],
    resources: [{
      title: String,
      url: String,
      type: String (video/article/documentation)
    }],
    estimatedHours: Number,
    completed: Boolean (default: false),
    completedAt: Date
  }],
  progress: Number (0-100, default: 0),
  createdAt: Date (default: now),
  updatedAt: Date
}
```

**Indexes:**
- `userId`: For user-specific queries
- `createdAt`: For sorting plans

#### 3.3.3 Progress Schema (Future Enhancement)

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  date: Date,
  hoursStudied: Number,
  topicsCompleted: [String],
  quizScores: [{
    topic: String,
    score: Number,
    totalQuestions: Number
  }],
  codeExplanationsRequested: Number,
  debuggingSessionsCompleted: Number
}
```

### 3.4 Authentication & Authorization

#### 3.4.1 JWT Token Structure

```javascript
{
  userId: "user_id_here",
  iat: 1234567890,  // Issued at
  exp: 1234567890   // Expires at (7 days)
}
```

**Token Flow:**
1. User logs in with credentials
2. Server validates and generates JWT
3. Client stores token in localStorage
4. Client includes token in Authorization header
5. Server validates token on protected routes

#### 3.4.2 Middleware Chain

```
Request → CORS → Body Parser → Auth Middleware → Route Handler → Response
```

**Auth Middleware Logic:**
```javascript
1. Extract token from Authorization header
2. Verify token signature and expiration
3. Decode userId from token
4. Attach userId to request object
5. Call next() or return 401 Unauthorized
```

### 3.5 AI Integration Design

#### 3.5.1 OpenAI API Integration

**Configuration:**
- Model: GPT-4 (primary), GPT-3.5-turbo (fallback)
- Temperature: 0.7 (balanced creativity)
- Max Tokens: 1000-2000 (based on use case)

**Prompt Engineering Strategy:**

**Code Explanation Prompt:**
```
You are a coding tutor. Explain this {language} code to a {level} 
developer in simple terms. Break it down line by line if complex:

{code}

Provide:
1. Overall purpose
2. Line-by-line explanation
3. Key concepts used
4. Real-world analogy (if helpful)
```

**Learning Plan Generation Prompt:**
```
Create a {weeks}-week learning plan for a {experienceLevel} developer 
who wants to: {goal}. They can study {hoursPerWeek} hours per week.

Format as JSON with weeks array containing:
- weekNumber
- topics (array of specific topics)
- estimatedHours

Make it practical, progressive, and achievable.
```

**Debugging Assistance Prompt:**
```
Help debug this issue:
Code: {code}
Error: {error}
Description: {description}

Provide:
1. What the error means
2. Step-by-step debugging approach
3. Root cause explanation
4. How to fix it
5. How to prevent similar errors
```

#### 3.5.2 Error Handling & Fallbacks

**AI Service Error Handling:**
```javascript
try {
  const response = await openai.chat.completions.create(...)
  return response
} catch (error) {
  if (error.status === 429) {
    // Rate limit - retry with exponential backoff
  } else if (error.status === 500) {
    // OpenAI server error - use fallback model
  } else {
    // Other errors - return user-friendly message
  }
}
```

**Fallback Strategy:**
1. Primary: GPT-4
2. Fallback: GPT-3.5-turbo
3. Final: Pre-cached responses for common queries
4. Error: User-friendly message with retry option

#### 3.5.3 Cost Optimization

**Strategies:**
- Cache common explanations (e.g., "explain for loop")
- Rate limiting per user (10 requests/hour for free tier)
- Token optimization (concise prompts)
- Batch similar requests
- Use cheaper model for simple queries

## 4. Security Design

### 4.1 Authentication Security

**Password Security:**
- Minimum 8 characters required
- Hashed with bcrypt (10 salt rounds)
- Never stored or transmitted in plain text

**Token Security:**
- JWT signed with strong secret key
- 7-day expiration
- Stored in localStorage (XSS protection needed)
- Validated on every protected route

### 4.2 API Security

**Rate Limiting:**
- 100 requests per 15 minutes per IP
- 10 AI requests per hour per user
- Exponential backoff for repeated violations

**Input Validation:**
- Sanitize all user inputs
- Validate email format
- Limit code snippet size (10KB max)
- Prevent SQL/NoSQL injection

**CORS Configuration:**
```javascript
{
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}
```

### 4.3 Data Security

**Encryption:**
- HTTPS for all communications (production)
- Database connection encrypted
- Sensitive data encrypted at rest

**Privacy:**
- Code snippets not permanently stored
- User data anonymized for analytics
- GDPR compliance (data deletion on request)

## 5. Performance Optimization

### 5.1 Frontend Optimization

**Code Splitting:**
- Lazy load routes with React.lazy()
- Split vendor bundles
- Dynamic imports for heavy components

**Caching:**
- Service worker for offline capability
- Cache API responses (5-minute TTL)
- Memoize expensive computations

**Bundle Size:**
- Tree shaking unused code
- Minification and compression
- Image optimization

### 5.2 Backend Optimization

**Database Optimization:**
- Indexes on frequently queried fields
- Connection pooling
- Query result caching (Redis)

**API Optimization:**
- Response compression (gzip)
- Pagination for large datasets
- Efficient query patterns

**Caching Strategy:**
```
User Request → Check Cache → Cache Hit? → Return Cached
                    ↓
              Cache Miss → Query DB → Store in Cache → Return Data
```

## 6. Deployment Architecture

### 6.1 Development Environment

```
Local Machine
├── Frontend: localhost:3000 (Vite dev server)
├── Backend: localhost:5000 (Nodemon)
└── Database: localhost:27017 (MongoDB local)
```

### 6.2 Production Environment

```
Cloud Infrastructure (AWS/GCP/Azure)
├── Frontend: CDN (Vercel/Netlify)
│   └── Static files served globally
├── Backend: Container Service (Docker)
│   ├── Load Balancer
│   ├── App Server 1
│   ├── App Server 2
│   └── App Server N (auto-scaling)
└── Database: MongoDB Atlas (Managed)
    ├── Primary Node
    ├── Secondary Node
    └── Arbiter Node
```

### 6.3 CI/CD Pipeline

```
Git Push → GitHub Actions
    ↓
Run Tests (Unit + Integration)
    ↓
Build Docker Image
    ↓
Push to Container Registry
    ↓
Deploy to Staging
    ↓
Automated Tests
    ↓
Manual Approval
    ↓
Deploy to Production
    ↓
Health Check
```

## 7. Monitoring & Logging

### 7.1 Application Monitoring

**Metrics to Track:**
- Request rate and response time
- Error rate and types
- AI API usage and costs
- Database query performance
- Memory and CPU usage

**Tools:**
- Application: Sentry for error tracking
- Infrastructure: Prometheus + Grafana
- Logs: Winston + CloudWatch

### 7.2 User Analytics

**Events to Track:**
- User registration and login
- Feature usage (explainer, planner, debugger)
- Learning plan creation and completion
- Session duration and frequency
- User retention and churn

**Tools:**
- Mixpanel or Amplitude for product analytics
- Google Analytics for web analytics

## 8. Testing Strategy

### 8.1 Frontend Testing

**Unit Tests:**
- Component rendering
- User interactions
- Utility functions

**Integration Tests:**
- API integration
- Authentication flow
- Form submissions

**E2E Tests:**
- Complete user journeys
- Critical paths (login → create plan → explain code)

### 8.2 Backend Testing

**Unit Tests:**
- Route handlers
- Service functions
- Utility functions

**Integration Tests:**
- Database operations
- API endpoints
- Authentication middleware

**Load Tests:**
- Concurrent user simulation
- API stress testing
- Database performance

## 9. Scalability Considerations

### 9.1 Horizontal Scaling

**Frontend:**
- Stateless React app
- CDN distribution
- Multiple edge locations

**Backend:**
- Stateless API servers
- Load balancer distribution
- Session stored in JWT (no server state)

**Database:**
- MongoDB replica sets
- Read replicas for scaling reads
- Sharding for large datasets

### 9.2 Vertical Scaling

**When to Scale:**
- CPU usage > 70% sustained
- Memory usage > 80%
- Response time > 1 second
- Database connections exhausted

**Scaling Strategy:**
1. Optimize code and queries first
2. Add caching layer (Redis)
3. Scale horizontally (add servers)
4. Scale vertically (bigger servers) as last resort

## 10. Future Architecture Enhancements

### 10.1 Microservices Migration

**Potential Services:**
- Auth Service
- Learning Service
- AI Service
- Analytics Service
- Notification Service

### 10.2 Real-time Features

**WebSocket Integration:**
- Live code collaboration
- Real-time progress updates
- Instant AI responses
- Chat with mentors

### 10.3 Mobile Applications

**React Native App:**
- Shared business logic
- Native performance
- Offline capability
- Push notifications

### 10.4 Advanced AI Features

**Custom Model Training:**
- Fine-tuned models for specific languages
- Personalized explanations based on user history
- Predictive learning recommendations
- Automated code review

## 11. Design Patterns Used

### 11.1 Frontend Patterns

- **Component Pattern**: Reusable UI components
- **Container/Presenter**: Separation of logic and presentation
- **Higher-Order Components**: Auth guards, error boundaries
- **Custom Hooks**: Reusable stateful logic

### 11.2 Backend Patterns

- **MVC Pattern**: Model-View-Controller separation
- **Repository Pattern**: Data access abstraction
- **Middleware Pattern**: Request processing pipeline
- **Factory Pattern**: Service instantiation

### 11.3 API Patterns

- **RESTful Design**: Resource-based URLs
- **Stateless Communication**: No server-side sessions
- **HATEOAS**: Hypermedia links (future enhancement)
- **Versioning**: API version in URL (/api/v1/)

## 12. Accessibility Design

### 12.1 WCAG 2.1 Compliance

**Level AA Requirements:**
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast (4.5:1)
- Focus indicators
- Alt text for images
- Semantic HTML

### 12.2 Inclusive Design

**Features:**
- Adjustable font sizes
- High contrast mode
- Keyboard shortcuts
- Clear error messages
- Simple language options

## 13. Documentation Standards

### 13.1 Code Documentation

**Comments:**
- Function purpose and parameters
- Complex logic explanation
- API endpoint documentation
- Component props description

**README Files:**
- Setup instructions
- Environment variables
- Running tests
- Deployment guide

### 13.2 API Documentation

**Format:** OpenAPI/Swagger specification

**Includes:**
- Endpoint descriptions
- Request/response schemas
- Authentication requirements
- Example requests
- Error codes

## 14. Conclusion

This design specification provides a comprehensive blueprint for building CodeMentor AI. The architecture prioritizes:

- **Scalability**: Can grow from prototype to production
- **Security**: Multiple layers of protection
- **Performance**: Optimized for speed and efficiency
- **Maintainability**: Clean code and clear structure
- **User Experience**: Intuitive and responsive interface

The modular design allows for incremental development and easy feature additions, making it ideal for a hackathon project that can evolve into a production application.
