"use client";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import type { Mentor } from "../../../utils/types";
import { auth, db } from "../../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { useRouter } from "next/navigation";

export default function MentorProfilePage() {
  const [checking, setChecking] = useState(true);
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: User | null) => {
      setChecking(true);
      if (!user) {
        router.push('/mentor/login');
        return;
      }
      try {
        const snap = await get(ref(db, `mentors/${user.uid}`));
        if (snap.exists()) {
          setMentor(snap.val() as Mentor);
        } else {
          router.push('/mentor/login');
        }
      } catch (err) {
        console.error(err);
        router.push('/mentor/login');
      }
      setChecking(false);
    });
    return () => unsub();
  }, [router]);

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center">Checking mentor session...</div>
  );

  const handleSave = async () => {
    if (!mentor?.uid) return;
    try {
      await set(ref(db, `mentors/${mentor.uid}`), mentor as Record<string, unknown>);
      alert('Profile saved');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-[#2386ff] mb-4">My Profile</h2>
        <div className="bg-white/90 rounded-2xl p-6 shadow">
          {mentor ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#6b7280]">Name</label>
                <input value={mentor.name || ''} onChange={(e) => setMentor({...mentor, name: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-[#6b7280]">Email</label>
                <input value={mentor.email || ''} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm text-[#6b7280]">Stream</label>
                <input value={mentor.stream || ''} onChange={(e) => setMentor({...mentor, stream: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="md:col-span-2 text-right">
                <button onClick={handleSave} className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white px-4 py-2 rounded">Save</button>
              </div>
            </div>
          ) : (
            <div className="text-center text-[#6b7280]">No profile data</div>
          )}
        </div>
      </main>
    </div>
  );
}
