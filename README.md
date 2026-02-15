# AI for Bharat - Learning & Developer Productivity Platform

This is an AI-powered solution that helps people learn faster, work smarter, and become more productive while building or understanding technology.

## Features

- **Personalized Learning Paths**: Generate customized learning journeys based on your skills, experience, and goals
- **AI-Powered Code Explanation**: Understand complex code snippets in any programming language
- **Productivity Analytics**: Analyze your workflow and get recommendations for improvement
- **Practice Exercises**: Get targeted exercises to reinforce your learning
- **Code Review**: Get AI-powered code reviews with suggestions for improvement
- **Study Tips**: Receive personalized study strategies based on your learning progress

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: OpenAI API
- **Authentication**: JWT (implementation ready)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   ```
3. Set up environment variables in `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   MONGODB_URI=mongodb://localhost:27017/aiforbharat
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```
4. Start the development servers:
   ```bash
   npm run dev
   ```

## API Endpoints

### Learning Routes
- `POST /api/learning/path` - Generate personalized learning path
- `POST /api/learning/explain-code` - Explain code snippets
- `POST /api/learning/practice-exercises` - Generate practice exercises
- `POST /api/learning/study-tips` - Get study tips
- `POST /api/learning/code-review` - Get code review

### Productivity Routes
- `POST /api/productivity/analyze` - Analyze productivity patterns
- `POST /api/productivity/coding-help` - Get coding assistance
- `POST /api/productivity/workflow-optimization` - Optimize workflow

### User Routes
- `GET /api/users/:id` - Get user profile
- `POST /api/users/` - Create/update user
- `PUT /api/users/:id/progress` - Update learning progress
- `GET /api/users/:id/productivity` - Get productivity stats
- `POST /api/users/:id/track-interaction` - Track AI interactions

## How to Use

1. **Learning Path Generation**: Navigate to the Learning Path section and enter your skill, experience level, goals, and timeframe to get a personalized learning plan.

2. **Code Explanation**: In the Code Explainer section, paste your code snippet along with the language to get a detailed explanation.

3. **Productivity Analysis**: In the Productivity section, describe your work activities, time distribution, and challenges to get AI-powered recommendations.

## Architecture

The application follows a modular architecture with separate concerns:
- Frontend components for user interface
- Backend services for business logic
- AI processor for OpenAI integration
- Database models for data persistence
- API routes for handling requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.