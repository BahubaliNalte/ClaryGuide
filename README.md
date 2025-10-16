# ClaryGuide

ClaryGuide is a career guidance platform designed to help students explore career paths, compare courses, connect with mentors, and access college information. It features AI-assisted suggestions, visual roadmaps, and a user-friendly interface.

## Features

- **Career Paths:** Search and explore degrees, careers, exams, higher studies, and industries.
- **College Hub:** Find colleges, filter by city/type, and view details.
- **Mentor Connect:** Book mentorship sessions, auto-fill user info, select date/time.
- **Admin Dashboard:** Manage users, contacts, mentor requests (secure access).
- **ClaryBot:** AI-powered chatbot for career queries.
- **Responsive Design:** Works seamlessly on mobile and desktop.
- **Authentication:** Secure login/signup, profile management.

## Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) (React-based SSR & SSG)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Vercel](https://vercel.com/) for deployment

### Backend
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- RESTful APIs for data fetching and management

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ClaryGuide.git
   cd ClaryGuide
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env.local` file and add your Firebase and API keys.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Deployment

- The project is deployed on [Vercel](https://vercel.com/).
- Push to `main` branch for automatic deployment.

## Security

- Admin routes are protected using Firebase Authentication and email-based checks.
- User data is securely managed via Firebase.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.

---

**ClaryGuide – Clarity Today, Career Tomorrow**
