"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
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

				{/* HERO SECTION */}
				<section className="w-full flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto mt-8 md:mt-16 px-4 animate-fade-in">
				<div className="flex-1 flex flex-col gap-6">
						  <h2 className="text-4xl md:text-5xl font-extrabold text-[#2386ff] leading-tight mb-2 animate-slide-in">Find careers that match who you actually are</h2>
						  <p className="text-[#6b7280] text-lg mb-4 animate-fade-in">AI-assisted guidance, visual roadmaps and college info — reimagined for students.</p>
						  <div className="flex flex-wrap gap-4 mb-2">
							<Link href="/features" className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200">Explore Features</Link>
							<Link href="/chatbot" className="bg-gradient-to-r from-[#3ecf8e] to-[#2386ff] text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200">Talk to ClaryBot</Link>
							<Link href="/mentor" className="bg-gradient-to-r from-[#00bfae] to-[#2386ff] text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200">Connect with our Mentor</Link>
						</div>
									<div className="flex flex-wrap gap-4">
										<Link href="/career-compare" className="bg-white text-[#2386ff] px-4 py-2 rounded-full font-medium shadow hover:scale-105 transition-transform duration-200">Career Comparison Tool</Link>
										<Link href="/quiz" className="bg-white text-[#2386ff] px-4 py-2 rounded-full font-medium shadow hover:scale-105 transition-transform duration-200">Career Quiz</Link>
										<Link href="/courses" className="bg-white text-[#2386ff] px-4 py-2 rounded-full font-medium shadow hover:scale-105 transition-transform duration-200">Course Hub</Link>
						</div>
					</div>
							<div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
								<div className="relative w-72 h-72 md:w-96 md:h-96 animate-fade-in">
									<div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e0f7fa] via-[#e3eaff] to-[#c1f2e7] blur-2xl opacity-80 animate-pulse"></div>
									<div className="absolute inset-6 md:inset-10 bg-white/40 backdrop-blur-lg rounded-full shadow-lg flex items-center justify-center animate-fade-in">
										<svg className="w-56 h-56 md:w-80 md:h-80" viewBox="0 0 400 400" aria-hidden="true">
											<defs>
												<linearGradient id="heroGrad" x1="0" x2="1">
													<stop offset="0" stopColor="#2B8BFF" />
													<stop offset="1" stopColor="#00C389" />
												</linearGradient>
												<filter id="blur">
													<feGaussianBlur stdDeviation="18" />
												</filter>
											</defs>
											<g filter="url(#blur)">
												<circle cx="200" cy="130" r="120" fill="url(#heroGrad)" opacity="0.28"></circle>
												<circle cx="260" cy="220" r="70" fill="#8D44FF" opacity="0.12"></circle>
											</g>
											<g>
												<circle className="node animate-bounce" cx="155" cy="120" r="8" fill="#fff"></circle>
												<circle className="node animate-bounce" cx="240" cy="150" r="6" fill="#fff"></circle>
												<circle className="node animate-bounce" cx="200" cy="210" r="5" fill="#fff"></circle>
											</g>
										</svg>
									</div>
								</div>
							</div>
				</section>

				{/* Why ClaryGuide Section */}
						<section className="w-full max-w-6xl mx-auto mt-16 px-4 animate-fade-in">
							<h3 className="text-4xl font-extrabold text-[#2386ff] mb-8 animate-slide-in">Why ClaryGuide?</h3>
											<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
												<div className="bg-gradient-to-br from-[#e0f7fa] to-[#e3eaff] rounded-2xl shadow-lg p-8 flex flex-col gap-2 hover:scale-105 transition-transform duration-200 animate-fade-in">
													<h4 className="font-bold text-lg text-[#2386ff]">Personalized</h4>
													<p className="text-[#1a3c6b]">Tailored suggestions from simple inputs.</p>
												</div>
												<div className="bg-gradient-to-br from-[#c1f2e7] to-[#e3eaff] rounded-2xl shadow-lg p-8 flex flex-col gap-2 hover:scale-105 transition-transform duration-200 animate-fade-in">
													<h4 className="font-bold text-lg text-[#00bfae]">Visual Roadmaps</h4>
													<p className="text-[#1a3c6b]">Step-by-step timelines to reach a career.</p>
												</div>
												<div className="bg-gradient-to-br from-[#e3eaff] to-[#f7fdfc] rounded-2xl shadow-lg p-8 flex flex-col gap-2 hover:scale-105 transition-transform duration-200 animate-fade-in">
													<h4 className="font-bold text-lg text-[#8D44FF]">College Hub</h4>
													<p className="text-[#1a3c6b]">Search colleges & deadlines in one place.</p>
												</div>
											</div>
						</section>

				{/* CTA strip */}
						<section className="w-full py-10 text-center bg-gradient-to-r from-[#f7fdfc] via-[#e3eaff] to-[#c1f2e7] mt-16 animate-fade-in">
							<div className="cta-inner">
								<h4 className="text-2xl text-[#00bfae] font-bold mb-4 animate-slide-in">Ready to explore?</h4>
								<Link className="bg-gradient-to-r from-[#3ecf8e] to-[#2386ff] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-200 text-xl animate-fade-in" href="/features">Start Now</Link>
							</div>
						</section>

				{/* Floating Chatbot */}
				<button id="botBtn" className="fixed bottom-6 right-6 bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white rounded-full p-4 shadow-lg text-2xl hover:scale-110 transition-transform duration-200 animate-fade-in" aria-label="Open chat">💬</button>

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
