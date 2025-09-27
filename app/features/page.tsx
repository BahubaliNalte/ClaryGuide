"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { usePathname } from "next/navigation";

export default function Features() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/chatbot", label: "ClaryBot" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];
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

      {/* Features Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-[#2386ff] mb-8 text-center">Website Features</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-2">
          {/* Career Path */}
          <Link href="/career-paths" className="bg-gradient-to-br from-[#0fefb2] via-[#00bfae] to-[#2386ff] rounded-3xl shadow-2xl p-8 hover:scale-105 transition-transform duration-200 block group">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl text-white drop-shadow">🛤️</span>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-[#0fefb2] transition-colors duration-200 drop-shadow">Career Path</h3>
            </div>
            <p className="text-white text-lg drop-shadow">Explore step-by-step career roadmaps and visualize your journey to your dream profession.</p>
          </Link>
          {/* Chatbot */}
          <Link href="/chatbot" className="bg-gradient-to-br from-[#8D44FF] via-[#2386ff] to-[#00bfae] rounded-3xl shadow-2xl p-8 hover:scale-105 transition-transform duration-200 block group">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl text-white drop-shadow">🤖</span>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-[#8D44FF] transition-colors duration-200 drop-shadow">ClaryBot (Chatbot)</h3>
            </div>
            <p className="text-white text-lg drop-shadow">Get instant answers, career advice, and personalized guidance from our AI-powered chatbot.</p>
          </Link>
          {/* Compare */}
          <Link href="/compare" className="bg-gradient-to-br from-[#185a9d] via-[#43cea2] to-[#00bfae] rounded-3xl shadow-2xl p-8 hover:scale-105 transition-transform duration-200 block group">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl text-white drop-shadow">⚖️</span>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-[#43cea2] transition-colors duration-200 drop-shadow">Compare Degrees</h3>
            </div>
            <p className="text-white text-lg drop-shadow">Compare different degrees, career paths, and growth opportunities to find your best fit.</p>
          </Link>
          {/* Mentor */}
          <Link href="/mentor" className="bg-gradient-to-br from-[#ffd200] via-[#f7971e] to-[#ff5858] rounded-3xl shadow-2xl p-8 hover:scale-105 transition-transform duration-200 block group">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl text-white drop-shadow">🧑‍🏫</span>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-[#ffd200] transition-colors duration-200 drop-shadow">Mentor Connect</h3>
            </div>
            <p className="text-white text-lg drop-shadow">Connect with experienced mentors for guidance, advice, and support throughout your career journey.</p>
          </Link>
          {/* Quiz */}
          <Link href="/quiz" className="bg-gradient-to-br from-[#ff5858] via-[#f857a6] to-[#ffd200] rounded-3xl shadow-2xl p-8 hover:scale-105 transition-transform duration-200 block group">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl text-white drop-shadow">🎯</span>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-[#ff5858] transition-colors duration-200 drop-shadow">Career Quiz</h3>
            </div>
            <p className="text-white text-lg drop-shadow">Take a fun and interactive quiz to discover careers that match your personality and skills.</p>
          </Link>
          {/* College Hub */}
          <Link href="/college-hub" className="bg-gradient-to-br from-[#330867] via-[#30cfd0] to-[#00bfae] rounded-3xl shadow-2xl p-8 hover:scale-105 transition-transform duration-200 block group">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl text-white drop-shadow">🏫</span>
              <h3 className="text-2xl font-extrabold text-white group-hover:text-[#30cfd0] transition-colors duration-200 drop-shadow">College Hub</h3>
            </div>
            <p className="text-white text-lg drop-shadow">Search colleges, view deadlines, and access all the information you need to make informed decisions about your education.</p>
          </Link>
        </div>
      </main>

 
    {/* Floating Chatbot */}
		<Link
			id="botBtn"
			href="/chatbot"
			className="fixed bottom-6 right-6 bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white rounded-full p-4 shadow-lg text-2xl hover:scale-110 transition-transform duration-200 animate-fade-in"
			aria-label="Open chat"
		>
			💬
		</Link>

				{/* Footer */}
									<footer className="bg-gradient-to-r from-[#f7fdfc] via-[#e3eaff] to-[#c1f2e7] text-[#6b7280] py-8 text-base mt-16 border-t border-[#e0e7ef] animate-fade-in">
										<div className="max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap sm:justify-between items-center gap-6 px-4">
											<div className="flex items-center gap-2 mb-4 sm:mb-0">
												<Image src="/logo-favicon.png" alt="ClaryGuide Logo" width={32} height={32} className="drop-shadow-lg animate-fade-in" />
												<span className="font-bold text-[#2386ff] text-lg animate-slide-in">ClaryGuide</span>
											</div>
											<div className="flex flex-col sm:flex-row gap-4 sm:gap-8 flex-wrap text-lg items-center justify-center w-full sm:w-auto mb-4 sm:mb-0">
											 <Link href="/" className="hover:text-[#2386ff] hover:scale-105 transition-transform duration-200">Home</Link>
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
