"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/chatbot", label: "ClaryBot" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError("");
    setLoading(true);
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    try {
      const res = await fetch("/api/clarybot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I couldn't get a response." }]);
      }
    } catch {
      setError("Failed to connect to AI. Try again.");
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, there was an error." }]);
    }
    setInput("");
    setLoading(false);
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

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
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    isActive
                      ? "text-[#2386ff] font-bold border-b-2 border-[#2386ff] pb-1"
                      : "text-[#1a3c6b] hover:text-[#2386ff] pb-1"
                  }
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Chatbot UI Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-6 sm:py-12 animate-fade-in">
        <div className="w-full max-w-md sm:max-w-xl bg-white/80 rounded-2xl shadow-2xl p-4 sm:p-8 backdrop-blur-lg flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2 sm:mb-4">
            <Image src="/logo-favicon.png" alt="ClaryBot" width={36} height={36} className="rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2386ff]">ClaryBot</h2>
          </div>
          <div className="flex-1 overflow-y-auto max-h-48 sm:max-h-64 mb-2 sm:mb-4">
            <div className="flex flex-col gap-2 sm:gap-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.sender === "bot"
                      ? "self-start bg-gradient-to-r from-[#e3eaff] to-[#f6fcfd] text-[#2386ff] px-4 py-2 rounded-2xl shadow w-fit"
                      : "self-end bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white px-4 py-2 rounded-2xl shadow w-fit"
                  }
                >
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
          <form className="flex flex-col sm:flex-row gap-2 items-center" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full sm:flex-1 border border-[#e3eaff] rounded-2xl px-4 py-3 text-base sm:text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-base sm:text-lg hover:scale-105 transition-transform duration-200"
              disabled={loading || !input.trim()}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
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
