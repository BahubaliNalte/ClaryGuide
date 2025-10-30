"use client";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import type { ScheduleItem } from "../../../utils/types";
import { auth, db } from "../../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, get, onValue } from "firebase/database";
import { useRouter } from "next/navigation";

export default function MentorSchedulePage() {
  const [checking, setChecking] = useState(true);
  const [mentorName, setMentorName] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
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
          const data = snap.val();
          setMentorName(data.name || null);

          // listen to mentor schedule
          const scheduleRef = ref(db, `mentors/${user.uid}/schedule`);
          onValue(scheduleRef, (s) => {
            const sch = s.val() || {};
            const items = Object.entries(sch).map(([id, value]) => (typeof value === 'object' && value !== null ? { id, ...(value as Record<string, unknown>) } : { id, value }));
            setSchedule(items as ScheduleItem[]);
          });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-[#2386ff] mb-4">My Schedule</h2>
        <p className="mb-6 text-[#1a3c6b]">Hello{mentorName ? `, ${mentorName}` : ''}. This page shows your accepted and scheduled mentor sessions.</p>

        {schedule.length === 0 ? (
          <div className="bg-white/90 rounded-2xl p-6 shadow text-center text-[#6b7280]">No scheduled sessions yet.</div>
        ) : (
          <div className="space-y-4">
            {schedule.map((s) => (
              <div key={s.id} className="bg-white/90 rounded-xl p-4 shadow border">
                <div className="text-[#1a3c6b]"><strong>Name:</strong> {s.name}</div>
                <div className="text-[#1a3c6b]"><strong>Email:</strong> {s.email}</div>
                <div className="text-[#1a3c6b]"><strong>Mobile:</strong> {s.mobile}</div>
                <div className="text-[#1a3c6b]"><strong>Area:</strong> {s.mentorshipArea}</div>
                <div className="text-[#1a3c6b]"><strong>Date:</strong> {s.date}</div>
                <div className="text-[#1a3c6b]"><strong>Time:</strong> {s.time}</div>
                {s.meetingLink && (<div className="text-[#2386ff] break-all"><strong>Meeting Link:</strong> <a href={s.meetingLink} target="_blank" rel="noreferrer" className="underline">{s.meetingLink}</a></div>)}
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
