"use client";
import { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Link from "next/link";

type Message = { sender: "user" | "bot"; text: string };

async function fetchFAQAnswer(query: string): Promise<string | null> {
	try {
		const res = await fetch("/faqs.json");
		const faqs = await res.json();
		// Simple keyword match
		const found = faqs.find((faq: { question: string }) =>
			faq.question.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(faq.question.toLowerCase())
		);
		return found ? found.answer : null;
	} catch {
		return null;
	}
}

export default function CareerChatbot() {
	const [messages, setMessages] = useState<Message[]>([
		{ sender: "bot", text: "Hi! I am ClaryBot, your career guide. Ask me anything about degrees, exams, colleges, or careers!" },
	]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const chatEndRef = useRef<HTMLDivElement>(null);

	const sendMessage = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (!input.trim()) return;
		setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
		setLoading(true);
		let answer: string | null = null;
		// Offline check
			if (!navigator.onLine) {
				answer = await fetchFAQAnswer(input);
				if (!answer) answer = "Sorry, I couldn't find an answer offline. Please try again when online.";
			} else {
				// Try FAQ first
				answer = await fetchFAQAnswer(input);
				if (!answer) {
					// Call backend API for dynamic response
					try {
						const res = await fetch("/api/chatbot", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ message: input })
						});
						const data = await res.json();
						answer = data.reply || "Sorry, I couldn't get an answer from AI.";
					} catch {
						answer = "Sorry, there was an error connecting to AI.";
					}
				}
			}
			setMessages((msgs) => [...msgs, { sender: "bot", text: answer! }]);
		setInput("");
		setLoading(false);
		setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
			<Navbar />
			<main className="flex-1 flex flex-col items-center justify-center px-2 py-8">
				<div className="max-w-xl w-full mx-auto bg-white/80 rounded-2xl shadow-2xl p-6 backdrop-blur-lg">
					<div className="flex items-center gap-3 mb-2">
						<Image src="/logo-favicon.png" alt="ClaryBot" width={36} height={36} className="rounded-full" />
						<h2 className="text-2xl font-bold text-[#2386ff]">ClaryBot</h2>
					</div>
					<p className="text-[#1a3c6b] text-center mb-4">Ask about degrees, exams, colleges, careers.</p>
					<div className="h-80 overflow-y-auto flex flex-col gap-2 mb-4 px-2" style={{ background: "#f6fcfd", borderRadius: "1rem" }}>
						{messages.map((msg, i) => (
							<div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
								<div className={`px-4 py-2 rounded-2xl shadow text-base max-w-[80%] ${msg.sender === "user" ? "bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white" : "bg-[#e3eaff] text-[#1a3c6b]"}`}>
									{msg.text}
								</div>
							</div>
						))}
						<div ref={chatEndRef} />
					</div>
					<form className="flex gap-2" onSubmit={sendMessage}>
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Type your question..."
							className="flex-1 border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] bg-white"
							disabled={loading}
						/>
						<button
							type="submit"
							disabled={loading || !input.trim()}
							className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200"
						>{loading ? "..." : "Send"}</button>
					</form>
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
