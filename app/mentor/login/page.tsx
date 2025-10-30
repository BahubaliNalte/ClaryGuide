"use client";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { auth, db } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { useRouter } from "next/navigation";

export default function MentorLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Ensure this email belongs to a registered mentor in Realtime DB
      const mentorsSnap = await get(ref(db, "mentors"));
      const mentors = mentorsSnap.exists() ? mentorsSnap.val() : null;
      if (!mentors) {
        setError("No mentors registered yet.");
        setLoading(false);
        return;
      }
      const found = Object.values(mentors as Record<string, any>).some((m: any) => m.email === form.email);
      if (!found) {
        setError("Mentor not found. Please register first.");
        setLoading(false);
        return;
      }

      // Sign in with Firebase Auth
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setSuccess("Mentor logged in successfully!");
      setTimeout(() => router.push("/mentor"), 800);
    } catch (err: any) {
      setError(err?.message || "Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-md mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-[#2386ff] mb-4 text-center">Mentor Login</h2>
        <form className="flex flex-col gap-4 bg-white/80 rounded-2xl shadow-2xl p-8" onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b]" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b]" />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">{loading ? "Logging in..." : "Login as Mentor"}</button>
        </form>
      </main>
    </div>
  );
}
