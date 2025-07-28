# ResuMatch

ResuMatch is a Next.js application that matches resumes with job descriptions using advanced AI and NLP technologies. It leverages Azure AI, Gemini, and Cosine Similarityto provide accurate and insightful matching results.

---

## Features

- **Resume & Job Description Matching:** Upload resumes and job descriptions to get a detailed match analysis.
- **AI & NLP Integration:** Utilizes Azure AI Form Recognizer, Gemini API and Cosine Similarity for text extraction and semantic analysis.
- **Modern UI:** Built with React, Next.js, and Tailwind CSS for a responsive and accessible user experience.
- **Reusable Components:** Includes a library of UI components (buttons, cards, inputs, progress bars, toasts, etc.).
- **Custom Hooks:** For enhanced state and notification management.

---

## Project Structure

```
src/
  app/         # Main application pages and layouts
    api/       # API routes
    match/     # Matching logic/pages
    context/   # React context providers
    layout.jsx # Main layout
    page.jsx   # Home page
    globals.css# Global styles
  components/  # React components
    resume-jd-matcher.jsx   # Main matcher component
    match-results.jsx       # Results display
    match-unavailable.jsx   # Fallback UI
    ui/                    # Reusable UI components (badge, button, card, input, progress, textarea, toast, toaster)
  lib/         # Utility functions
    utils.ts
  hooks/       # Custom React hooks
    use-toast.ts
```

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Scripts

- `dev` – Start the development server
- `build` – Build the application for production
- `start` – Start the production server
- `lint` – Run ESLint

---

## Dependencies

- **Core:** next, react, react-dom, tailwindcss
- **AI/NLP:** @azure/ai-form-recognizer, @azure/ai-language-text, @azure/openai, openai, natural, compromise
- **UI/UX:** framer-motion, lucide-react, @radix-ui/react-*
- **Utilities:** clsx, class-variance-authority, dotenv, formidable, mammoth, pdf-lib, pdf-parse

---

## Customization

- **UI Components:** Located in `src/components/ui/`
- **Custom Hooks:** See `src/hooks/use-toast.ts`
- **Utilities:** See `src/lib/utils.ts`

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Azure AI Documentation](https://learn.microsoft.com/en-us/azure/cognitive-services/)
- [OpenAI Documentation](https://platform.openai.com/docs/)
