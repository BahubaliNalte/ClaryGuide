"use client";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
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
					<Link href="/about" className="text-[#1a3c6b] hover:text-[#2386ff] pb-1">About Us</Link>
					<Link href="/contact" className="text-[#2386ff] font-bold border-b-2 border-[#2386ff] pb-1">Contact Us</Link>
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

			{/* Contact Form Section */}
					<main className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
						<h2 className="text-4xl font-extrabold text-[#2386ff] mb-10 text-center">Contact Us</h2>
						<form className="w-full max-w-xl mx-auto flex flex-col gap-6 items-center">
							  <input type="text" placeholder="Your Name" className="w-full bg-white border border-[#e3eaff] rounded-2xl px-6 py-4 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" required />
							  <input type="tel" placeholder="Mobile Number" className="w-full bg-white border border-[#e3eaff] rounded-2xl px-6 py-4 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" required />
							  <input type="email" placeholder="Your Email" className="w-full bg-white border border-[#e3eaff] rounded-2xl px-6 py-4 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" required />
							  <textarea placeholder="Your Message" rows={4} className="w-full bg-white border border-[#e3eaff] rounded-2xl px-6 py-4 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff] resize-none" required />
							<button type="submit" className="w-full bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold py-4 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">Send Message</button>
						</form>
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
