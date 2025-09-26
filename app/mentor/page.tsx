"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { db } from "../../firebaseConfig";
import { ref, push } from "firebase/database";


export default function MentorPage() {
  type MentorRequest = { id: string; name?: string; email?: string; mobile?: string; mentorshipArea?: string; date?: string; time?: string; message?: string; status?: string; meetingLink?: string; value?: unknown };
  const [myRequests, setMyRequests] = useState<MentorRequest[]>([]);
  // Fetch user's submitted requests by email
  const fetchMyRequests = async () => {
    if (!form.email) return;
    const { ref, onValue } = await import("firebase/database");
    const mentorRef = ref(db, "mentor_requests");
    onValue(mentorRef, (snapshot) => {
      const data = snapshot.val() || {};
      const requests = Object.entries(data)
        .map(([id, value]) => (typeof value === "object" && value !== null ? { id, ...value } : { id, value }))
        .filter((req) => req && typeof req === "object" && "email" in req && req.email === form.email);
      setMyRequests(requests);
    });
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    date: "",
    time: "",
    mentorshipArea: "Career Guidance",
  });

  // Auto-fill email from auth
  useEffect(() => {
    // Replace with your actual auth logic
    const getAuthEmail = async () => {
      try {
        // Example: using Firebase Auth
        const { getAuth } = await import("firebase/auth");
        const auth = getAuth();
        let email = "";
        if (auth.currentUser && typeof auth.currentUser.email === "string") {
          email = auth.currentUser.email;
        }
        setForm((prev) => ({ ...prev, email }));
        // Fetch mentor requests after email is set
        if (email) {
          const { ref, onValue } = await import("firebase/database");
          const mentorRef = ref(db, "mentor_requests");
          onValue(mentorRef, (snapshot) => {
            const data = snapshot.val() || {};
            const requests = Object.entries(data)
              .map(([id, value]) => (typeof value === "object" && value !== null ? { id, ...value } : { id, value }))
              .filter((req) => req && typeof req === "object" && "email" in req && req.email === email);
            setMyRequests(requests);
          });
        }
      } catch {}
    };
    getAuthEmail();
  }, []);

  // Fetch requests whenever form.email is set
  // Removed duplicate fetchMyRequests effect; now handled after email is set
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await push(ref(db, "mentor_requests"), form);
      setSuccess("Your request has been submitted! A mentor will contact you soon.");
      setForm({ name: "", email: "", mobile: "", message: "", date: "", time: "", mentorshipArea: "Career Guidance" });
      fetchMyRequests();
    } catch {
      setError("Failed to submit request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-[#2386ff] mb-4 text-center">Mentorship Program</h2>
        <p className="text-lg text-[#1a3c6b] text-center mb-8">Book a session with a mentor for career guidance, college admissions, or personal growth.</p>
        <div className="max-w-lg mx-auto bg-white/80 rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
          <h3 className="text-2xl font-bold text-[#2386ff] mb-4 text-center">Request a Mentor Session</h3>
          {/* Only show request data if user has already submitted a request; otherwise show form */}
          {(() => {
            const activeRequest = myRequests.find(r => r.status !== "done");
            if (activeRequest) {
              return (
                <div className="text-[#1a3c6b] text-center py-6">
                  <div className="text-lg font-semibold mb-2">Your Submitted Mentor Request</div>
                  <div className="bg-[#f6fcfd] rounded-xl p-4 shadow text-left inline-block mx-auto">
                    <div className="mb-2"><strong>Name:</strong> {activeRequest.name}</div>
                    <div className="mb-2"><strong>Email:</strong> {activeRequest.email}</div>
                    <div className="mb-2"><strong>Mobile:</strong> {activeRequest.mobile}</div>
                    <div className="mb-2"><strong>Mentorship Area:</strong> {activeRequest.mentorshipArea}</div>
                    <div className="mb-2"><strong>Date:</strong> {activeRequest.date}</div>
                    <div className="mb-2"><strong>Time:</strong> {activeRequest.time}</div>
                    <div className="mb-2"><strong>Message:</strong> {activeRequest.message}</div>
                    <div className="mb-2"><strong>Status:</strong> {activeRequest.status || "pending"}</div>
                    {activeRequest.meetingLink && (
                      <div className="mb-2 text-[#2386ff]"><strong>Meeting Link:</strong> <a href={activeRequest.meetingLink} target="_blank" rel="noopener noreferrer" className="underline">{activeRequest.meetingLink}</a></div>
                    )}
                  </div>
                  <div className="mt-4 text-[#1a3c6b]">Please wait for your session to complete before booking another.</div>
                </div>
              );
            } else {
              return (
                <>
                  <div className="text-[#1a3c6b] text-base mb-4 bg-[#e3eaff]/60 rounded-xl p-3 text-center">
                    <strong>Note:</strong> You can book a session only for dates from <span className="font-semibold">today</span> up to <span className="font-semibold">1 month ahead</span>.<br />
                    Time slots are available only between <span className="font-semibold">07:00 AM</span> and <span className="font-semibold">10:00 PM</span>.
                  </div>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b]" />
                    <input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] bg-gray-100"
                      disabled={!!form.email}
                    />
                    <input name="mobile" type="tel" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b]" />
                    <select name="mentorshipArea" value={form.mentorshipArea} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] bg-white">
                      <option value="Career Guidance">Career Guidance</option>
                      <option value="College Admission">College Admission</option>
                      <option value="Subject Help">Subject Help</option>
                      <option value="Project Guidance">Project Guidance</option>
                      <option value="Other">Other</option>
                    </select>
                    <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b]" />
                    <div className="flex flex-col gap-2">
                      <label htmlFor="date" className="text-[#2386ff] font-semibold text-base mb-1">Select Date</label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        max={(() => {
                          const d = new Date();
                          d.setMonth(d.getMonth() + 1);
                          return d.toISOString().split("T")[0];
                        })()}
                        className="border border-[#2386ff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] bg-white placeholder-[#2386ff] focus:ring-2 focus:ring-[#2386ff]"
                        placeholder="Select Date"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="time" className="text-[#2386ff] font-semibold text-base mb-1">Select Time</label>
                      <input
                        id="time"
                        name="time"
                        type="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                        min="07:00"
                        max="22:00"
                        step="900"
                        className="border border-[#2386ff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] bg-white placeholder-[#2386ff] focus:ring-2 focus:ring-[#2386ff]"
                        placeholder="Select Time"
                      />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                    <button type="submit" disabled={loading} className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">{loading ? "Submitting..." : "Book Session"}</button>
                  </form>
                </>
              );
            }
          })()}
        </div>
        {/* Removed 'Your Submitted Requests' section as requested */}
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
