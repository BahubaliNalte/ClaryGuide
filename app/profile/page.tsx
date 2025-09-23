"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged, updateProfile, updateEmail, User } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [currentClass, setCurrentClass] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setName(u.displayName || "");
        setEmail(u.email || "");
        // Fetch extra profile data from DB
        const snap = await get(ref(db, `users/${u.uid}`));
        if (snap.exists()) {
          const data = snap.val();
          setMobile(data.mobile || "");
          setCurrentClass(data.currentClass || "");
          setLocation(data.location || "");
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!user) return;
    try {
      await updateProfile(user, { displayName: name });
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      await set(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        email,
        displayName: name,
        mobile,
        currentClass,
        location,
        provider: user.providerData[0]?.providerId || "password",
      });
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!user) return <div className="text-center py-20">Please log in to update your profile.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white/80 rounded-2xl shadow-2xl p-8 backdrop-blur-lg flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-[#2386ff] text-center mb-4">Update Profile</h2>
          <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" />
            <input type="tel" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" />
            <input type="text" placeholder="Current Class" value={currentClass} onChange={e => setCurrentClass(e.target.value)} className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" />
            <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2386ff]" />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <button type="submit" className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">Update Profile</button>
          </form>
        </div>
      </main>
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
