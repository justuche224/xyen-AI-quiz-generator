# Xyen AI Quiz Generator

An AI-powered quiz generation platform that transforms documents into interactive quizzes. Built with Next.js, TypeScript, and modern UI components.

## Features

- 📄 Support for multiple file formats (PDF, TXT, DOC, DOCX, CSV, RTF)
- 🤖 AI-powered question generation
- ✨ Beautiful and responsive UI
- 🔒 Secure file handling
- 📱 Mobile-friendly design
- 🎯 Customizable question types (Multiple Choice, Yes/No)
- 📊 Instant results and feedback

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** Neon Postgres with Drizzle ORM
- **AI Service:** Google Gemini
- **File Storage:** Supabase Storage
- **Authentication:** Better Auth

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm
- Neon Tech account
- Google Gemini API key
- Supabase account (for storage only)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/justuche224/xyen-AI-quiz-generator.git
cd xyen-AI-quiz-generator
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```env
DATABASE_URL=your_neon_postgres_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
BETTER_AUTH_SECRET=your_better_auth_secret
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
xyen/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utility functions and services
│   └── db/                  # Database schema and configuration
├── public/                  # Static assets
└── package.json            # Project dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing framework
- [Neon](https://neon.tech/) for the serverless Postgres database
- [Drizzle ORM](https://orm.drizzle.team/) for the database ORM
- [Better Auth](https://betterauth.com/) for authentication
- [Supabase](https://supabase.com/) for file storage
- [Google Gemini](https://ai.google.dev/) for the AI capabilities
