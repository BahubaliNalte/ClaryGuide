"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function Chatbot() {
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

      {/* Chatbot UI Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
        <div className="max-w-xl w-full bg-white/80 rounded-2xl shadow-2xl p-8 backdrop-blur-lg flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/logo-favicon.png" alt="ClaryBot" width={40} height={40} className="rounded-full" />
            <h2 className="text-3xl font-extrabold text-[#2386ff]">ClaryBot</h2>
          </div>
          <div className="flex-1 overflow-y-auto max-h-64 mb-4">
            {/* Example chat bubbles */}
            <div className="flex flex-col gap-3">
              <div className="self-start bg-gradient-to-r from-[#e3eaff] to-[#f6fcfd] text-[#2386ff] px-4 py-2 rounded-2xl shadow w-fit">Hi! How can I help you today?</div>
              <div className="self-end bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white px-4 py-2 rounded-2xl shadow w-fit">What careers match my interests?</div>
              <div className="self-start bg-gradient-to-r from-[#e3eaff] to-[#f6fcfd] text-[#2386ff] px-4 py-2 rounded-2xl shadow w-fit">Tell me about your favorite subjects!</div>
            </div>
          </div>
          <form className="flex gap-2 items-center">
            <input type="text" placeholder="Type your message..." className="flex-1 border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" />
            <button type="submit" className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">Send</button>
          </form>
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
