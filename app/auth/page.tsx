
"use client";
import { useState } from "react";
import { auth, googleProvider } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  User
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        setUser(res.user);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        setUser(res.user);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Authentication failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Google authentication failed. Please try again.");
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-4 md:px-8 py-6 bg-transparent animate-fade-in">
        <div className="flex items-center gap-3">
          <Image src="/logo-favicon.png" alt="ClaryGuide Logo" width={48} height={48} className="rounded-xl drop-shadow-lg animate-fade-in" />
          <div>
            <h1 className="font-bold text-2xl text-[#2386ff] tracking-tight animate-slide-in">ClaryGuide</h1>
            <p className="text-sm text-[#6b7280] animate-fade-in">Clarity Today, Career Tomorrow</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-base md:text-lg font-medium">
          <Link href="/" className="text-[#1a3c6b] hover:text-[#2386ff] pb-1">Home</Link>
          <Link href="/features" className="text-[#1a3c6b] hover:text-[#2386ff] pb-1">Features</Link>
          <Link href="/chatbot" className="text-[#1a3c6b] hover:text-[#2386ff] pb-1">ClaryBot</Link>
          <Link href="/about" className="text-[#1a3c6b] hover:text-[#2386ff] pb-1">About Us</Link>
          <Link href="/contact" className="text-[#1a3c6b] hover:text-[#2386ff] pb-1">Contact Us</Link>
          <Link href="/auth" className="text-[#2386ff] font-bold border-b-2 border-[#2386ff] pb-1">Auth</Link>
        </nav>
      </header>

      {/* Auth UI */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
        <div className="max-w-md w-full bg-white/80 rounded-2xl shadow-2xl p-8 backdrop-blur-lg flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-[#2386ff] text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
          {user ? (
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg text-[#2386ff]">Welcome, {user.email}! You are successfully logged in. Enjoy exploring ClaryGuide!</p>
                <button onClick={() => window.location.href = '/'} className="bg-gradient-to-r from-[#00bfae] to-[#2386ff] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">Go to Homepage</button>
              <button onClick={handleSignOut} className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">Log Out</button>
            </div>
          ) : (
            <>
              <form className="flex flex-col gap-4" onSubmit={handleAuth}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" />
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <button type="submit" className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">{isLogin ? "Login" : "Sign Up"}</button>
              </form>
              <button onClick={handleGoogleLogin} type="button" className="bg-white border border-[#2386ff] text-[#2386ff] font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:bg-[#e3eaff] transition-colors duration-200 mt-2 flex items-center justify-center gap-2">
                <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" width={24} height={24} />
                Continue with Google
              </button>
            </>
          )}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#2386ff] underline text-center mt-2">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#f7fdfc] via-[#e3eaff] to-[#c1f2e7] text-[#6b7280] py-8 text-base mt-16 border-t border-[#e0e7ef] animate-fade-in">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap sm:justify-between items-center gap-6 px-4">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <Image src="/logo-favicon.png" alt="ClaryGuide Logo" width={32} height={32} className="drop-shadow-lg animate-fade-in" />
            <span className="font-bold text-[#2386ff] text-lg animate-slide-in">ClaryGuide</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 flex-wrap text-lg items-center justify-center w-full sm:w-auto mb-4 sm:mb-0">
            <Link href="/" className="text-[#2386ff] hover:scale-105 transition-transform duration-200">Home</Link>
            <Link href="/about" className="hover:text-[#2386ff] hover:scale-105 transition-transform duration-200">About Us</Link>
            <Link href="/features" className="hover:text-[#2386ff] hover:scale-105 transition-transform duration-200">Features</Link>
            <Link href="/chatbot" className="hover:text-[#2386ff] hover:scale-105 transition-transform duration-200">ClaryBot</Link>
            <Link href="/contact" className="hover:text-[#2386ff] hover:scale-105 transition-transform duration-200">Contact</Link>
            <Link href="/auth" className="hover:text-[#2386ff] hover:scale-105 transition-transform duration-200">Auth</Link>
          </div>
          <div className="text-base text-[#8D44FF] animate-fade-in text-center w-full sm:w-auto">&copy; 2025 ClaryGuide. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
