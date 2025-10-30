"use client";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import type { Mentor } from "../../../utils/types";
import { auth, db } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { useRouter } from "next/navigation";

export default function MentorRegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", stream: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Check Realtime DB for existing mentor email
      const mentorsSnap = await get(ref(db, "mentors"));
      const mentors = mentorsSnap.exists() ? (mentorsSnap.val() as Record<string, Mentor>) : null;
      if (mentors) {
        const exists = Object.values(mentors).some((m) => m.email === form.email);
        if (exists) {
          setError("A mentor with this email already exists.");
          setLoading(false);
          return;
        }
      }

      // Create user with Firebase Auth
      const uc = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = uc.user;

      // Write mentor profile to Realtime DB
      await set(ref(db, `mentors/${user.uid}`), {
        uid: user.uid,
        name: form.name,
        email: form.email,
        stream: form.stream,
        createdAt: new Date().toISOString(),
      });

      setSuccess("Mentor registered successfully! Redirecting to login...");
      setForm({ name: "", email: "", password: "", stream: "" });
      // Optional: sign out the new user so they can login via the login page
      await signOut(auth);
      setTimeout(() => router.push("/mentor/login"), 1200);
    } catch (err: unknown) {
      const message = (err instanceof Error) ? err.message : String(err);
      setError(message || "Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-md mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-[#2386ff] mb-4 text-center">Mentor Registration</h2>
        <form className="flex flex-col gap-4 bg-white/80 rounded-2xl shadow-2xl p-8" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b]" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b]" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b]" />
          <select name="stream" value={form.stream} onChange={handleChange} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] bg-white">
            <option value="" disabled>Select Mentor Stream</option>
            <option value="Engineering">Engineering</option>
            <option value="Medical">Medical</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
            <option value="Management">Management</option>
            <option value="Other">Other</option>
          </select>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button type="submit" disabled={loading} className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">{loading ? "Registering..." : "Register as Mentor"}</button>
        </form>
      </main>
    </div>
  );
}
