"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      {/* Mobile Drawer */}
      <div id="mobileDrawer" className="fixed top-0 left-0 w-full h-full bg-white z-50 hidden md:hidden animate-fade-in">
        <div className="flex flex-col items-end p-6">
          <button className="text-3xl text-[#2386ff] mb-8" onClick={() => {
            const drawer = document.getElementById('mobileDrawer');
            if (drawer) drawer.classList.add('hidden');
          }} aria-label="Close menu">✕</button>
          <nav className="flex flex-col gap-6 text-lg font-medium items-center w-full">
            <Link href="/" className="text-[#2386ff] font-bold">Home</Link>
            <Link href="/features" className="text-[#1a3c6b]">Features</Link>
            <Link href="/chatbot" className="text-[#1a3c6b]">ClaryBot</Link>
            <Link href="/about" className="text-[#1a3c6b]">About Us</Link>
            <Link href="/contact" className="text-[#1a3c6b]">Contact Us</Link>
          </nav>
        </div>
      </div>

      {/* Features Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-[#2386ff] mb-8 text-center">Website Features</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#e0f7fa] to-[#e3eaff] rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#2386ff] mb-2">Personalized Career Guidance</h3>
            <p className="text-[#1a3c6b]">Get tailored career suggestions based on your interests, strengths, and goals using AI-powered recommendations.</p>
          </div>
          <div className="bg-gradient-to-br from-[#c1f2e7] to-[#e3eaff] rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#00bfae] mb-2">Visual Roadmaps</h3>
            <p className="text-[#1a3c6b]">Explore step-by-step timelines and visual guides to reach your desired career, making planning easy and clear.</p>
          </div>
          <div className="bg-gradient-to-br from-[#e3eaff] to-[#f7fdfc] rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#8D44FF] mb-2">College Hub</h3>
            <p className="text-[#1a3c6b]">Search colleges, view deadlines, and access all the information you need to make informed decisions about your education.</p>
          </div>
          <div className="bg-gradient-to-br from-[#2386ff] to-[#3ecf8e] rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#2386ff] mb-2">Career Comparison Tool</h3>
            <p className="text-[#1a3c6b]">Compare different career paths, job roles, and growth opportunities to find the best fit for you.</p>
          </div>
          <div className="bg-gradient-to-br from-[#3ecf8e] to-[#00bfae] rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#00bfae] mb-2">Interactive Career Quiz</h3>
            <p className="text-[#1a3c6b]">Take a fun and interactive quiz to discover careers that match your personality and skills.</p>
          </div>
          <div className="bg-gradient-to-br from-[#e3eaff] to-[#2386ff] rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#2386ff] mb-2">Mentor Connect</h3>
            <p className="text-[#1a3c6b]">Connect with experienced mentors for guidance, advice, and support throughout your career journey.</p>
          </div>
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
          </div>
          <div className="text-base text-[#8D44FF] animate-fade-in text-center w-full sm:w-auto">&copy; 2025 ClaryGuide. All rights reserved.</div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <button id="botBtn" className="fixed bottom-6 right-6 bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white rounded-full p-4 shadow-lg text-2xl hover:scale-110 transition-transform duration-200 animate-fade-in" aria-label="Open chat">💬</button>
    </div>
  );
}
