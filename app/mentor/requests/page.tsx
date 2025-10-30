"use client";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import type { MentorRequest } from "../../../utils/types";
import { auth, db } from "../../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, get, onValue, update, set } from "firebase/database";
import { useRouter } from "next/navigation";

export default function MentorRequestsPage() {
  const [checking, setChecking] = useState(true);
  const [mentorUid, setMentorUid] = useState<string | null>(null);
  const [mentorName, setMentorName] = useState<string | null>(null);
  const [assignedRequests, setAssignedRequests] = useState<MentorRequest[]>([]);
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
          setMentorUid(user.uid);
          setMentorName(data.name || null);
          // Listen for mentor_requests assigned to this mentor
          const mentorReqRef = ref(db, 'mentor_requests');
          onValue(mentorReqRef, (snapshot) => {
            const data = snapshot.val() || {};
            const all = Object.entries(data).map(([id, value]) => (typeof value === 'object' && value !== null ? { id, ...(value as Record<string, unknown>) } : { id, value }));
            const assigned = (all as MentorRequest[]).filter((r) => r.assignedTo === user.uid && r.status !== 'accepted' && r.status !== 'rejected');
            setAssignedRequests(assigned);
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

  const handleAccept = async (req: MentorRequest) => {
    if (!mentorUid) return;
    try {
      // mark request accepted
      await update(ref(db, `mentor_requests/${req.id}`), { status: 'accepted', acceptedAt: new Date().toISOString(), acceptedBy: mentorUid });
      // add to mentor schedule
      await set(ref(db, `mentors/${mentorUid}/schedule/${req.id}`), { ...(req as Record<string, unknown>), scheduledAt: new Date().toISOString() });
      // local update will be handled by onValue listener
    } catch (err) {
      console.error('Accept failed', err);
    }
  };

  const handleReject = async (req: MentorRequest) => {
    if (!mentorUid) return;
    try {
      await update(ref(db, `mentor_requests/${req.id}`), { status: 'rejected', rejectedAt: new Date().toISOString(), rejectedBy: mentorUid });
    } catch (err) {
      console.error('Reject failed', err);
    }
  };

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center">Checking mentor session...</div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-[#2386ff] mb-4">Mentor Requests</h2>
        <p className="mb-6 text-[#1a3c6b]">Hello{mentorName ? `, ${mentorName}` : ''}. Below are mentorship requests assigned to you.</p>

        <div className="space-y-6">
          {assignedRequests.length === 0 ? (
            <div className="bg-white/90 rounded-2xl p-6 shadow text-center text-[#6b7280]">No assigned requests at the moment.</div>
          ) : (
            assignedRequests.map((req) => (
              <div key={req.id} className="bg-white/90 rounded-xl border p-5 shadow">
                <div className="mb-2 text-[#1a3c6b]"><strong>Name:</strong> {req.name}</div>
                <div className="mb-2 text-[#1a3c6b]"><strong>Email:</strong> {req.email}</div>
                <div className="mb-2 text-[#1a3c6b]"><strong>Mobile:</strong> {req.mobile}</div>
                <div className="mb-2 text-[#1a3c6b]"><strong>Area:</strong> {req.mentorshipArea}</div>
                <div className="mb-2 text-[#1a3c6b]"><strong>Date:</strong> {req.date}</div>
                <div className="mb-2 text-[#1a3c6b]"><strong>Time:</strong> {req.time}</div>
                <div className="mb-2 text-[#1a3c6b] break-all"><strong>Message:</strong> {req.message}</div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => handleAccept(req)} className="bg-green-100 text-green-700 px-3 py-1 rounded-xl font-semibold hover:bg-green-200">Accept</button>
                  <button onClick={() => handleReject(req)} className="bg-red-100 text-red-600 px-3 py-1 rounded-xl font-semibold hover:bg-red-200">Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
