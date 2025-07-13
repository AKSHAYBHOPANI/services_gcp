# Services - Content Creation & Development Platform

Content Creation, Advertising, Blogs, Development and Hosting Services by The Tech Show Media

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project
- Stripe account
- Google Cloud project (for Gemini AI)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd services_gcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your actual credentials:
   - Firebase configuration
   - Stripe keys
   - Google OAuth credentials
   - Email settings
   - Gemini AI API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🔐 Security

This repository has been sanitized for public release. All sensitive credentials have been removed and replaced with placeholder values. You must configure your own:

- **Firebase Configuration**: Set up a Firebase project and add your credentials
- **Stripe Keys**: Get your Stripe publishable and secret keys
- **Google OAuth**: Configure Google OAuth for user authentication
- **Email Services**: Set up SMTP credentials for email functionality
- **Gemini AI**: Get API key from Google AI Studio

## 📁 Project Structure

```
services_gcp/
├── src/
│   ├── app/           # Next.js app directory
│   │   ├── api/       # API routes
│   │   ├── Components/ # Reusable components
│   │   └── ...
├── assets/            # Static assets
├── public/            # Public files
└── ...
```

## 🛠️ Key Features

- **User Authentication**: Google OAuth integration
- **Payment Processing**: Stripe integration
- **AI Integration**: Gemini AI for content generation
- **Email Services**: Contact forms and notifications
- **Content Management**: Blog and media management
- **E-commerce**: Shopping cart and checkout

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Important Notes

- Never commit `.env.local` or any files containing real credentials
- Keep your API keys secure and rotate them regularly
- Test thoroughly in development before deploying to production
