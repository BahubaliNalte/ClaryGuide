"use client";
import Image from "next/image";
import Link from "next/link";

const team = [
  { name: "add your name", role: "Founder & CEO", img: "/logo-favicon.png" },
  { name: "Aarya Sharma", role: "CTO", img: "/logo-favicon.png" },
  { name: "Riya Patel", role: "Lead Designer", img: "/logo-favicon.png" },
  { name: "Karan Singh", role: "Product Manager", img: "/logo-favicon.png" },
  { name: "Priya Mehra", role: "AI Engineer", img: "/logo-favicon.png" },
  { name: "Aditya Verma", role: "Frontend Developer", img: "/logo-favicon.png" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      {/* Header / Nav */}
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
          <Link href="/about" className="text-[#2386ff] font-bold border-b-2 border-[#2386ff] pb-1">About Us</Link>
          <Link href="/contact" className="text-[#1a3c6b] hover:text-[#2386ff] pb-1">Contact Us</Link>
        </nav>
        <button className="md:hidden text-3xl text-[#2386ff] ml-auto" onClick={() => {
          const drawer = document.getElementById('mobileDrawer');
          if (drawer) drawer.classList.toggle('hidden');
        }} aria-label="Open menu">☰</button>
        <div className="ml-4 flex items-center">
          <Image src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/person-circle.svg" alt="Profile" width={40} height={40} className="hover:scale-110 transition-transform duration-200" />
        </div>
      </header>

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

      {/* About Us Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-[#2386ff] mb-8 text-center">About Us</h2>
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg text-[#1a3c6b] mb-4">ClaryGuide is dedicated to helping students find clarity in their career paths through AI-powered guidance, visual roadmaps, and college information.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#2386ff] mb-2">Our Vision</h3>
              <p className="text-[#1a3c6b]">Empower every student to make informed career choices and achieve their dreams with clarity and confidence.</p>
            </div>
            <div className="bg-white/80 rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#2386ff] mb-2">Our Goals</h3>
              <p className="text-[#1a3c6b]">Provide personalized career guidance, easy access to college info, and visual roadmaps for every career journey.</p>
            </div>
          </div>
        </div>
        <h3 className="text-3xl font-bold text-[#2386ff] mb-6 text-center">Meet Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200">
              <Image src={member.img} alt={member.name} width={64} height={64} className="rounded-full mb-2" />
              <h4 className="font-bold text-lg text-[#2386ff]">{member.name}</h4>
              <p className="text-[#1a3c6b]">{member.role}</p>
            </div>
          ))}
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
    </div>
  );
}
