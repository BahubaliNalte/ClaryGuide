"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db } from "../../firebaseConfig";
import { ref, onValue, remove, update, get } from "firebase/database";
import Navbar from "../../components/Navbar";

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [meetingLinks, setMeetingLinks] = useState<{[id: string]: string}>({});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "bahubalidnalte722006@gmail.com") { // <-- Set your admin email here
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        router.replace("/auth"); // Redirect to login if not admin
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSendMeetingLink = async (id: string) => {
    const link = meetingLinks[id];
    if (!link) return;
    try {
      // Update the request with meetingLink
      await update(ref(db, `mentor_requests/${id}`), { meetingLink: link });

      // If the request is already assigned to a mentor, also update that mentor's schedule entry so mentor sees the link
      const reqSnap = await get(ref(db, `mentor_requests/${id}`));
      const reqData: any = reqSnap.exists() ? reqSnap.val() : null;
      if (reqData && reqData.assignedTo) {
        const assignedUid = reqData.assignedTo;
        // Update mentor schedule entry if exists
        await update(ref(db, `mentors/${assignedUid}/schedule/${id}`), { meetingLink: link });
      }

      // Update local UI state
      setMentorRequests(
        mentorRequests.map((req) =>
          req.id === id ? { ...req, meetingLink: link } : req
        )
      );
      setMeetingLinks({ ...meetingLinks, [id]: "" });
    } catch (err) {
      console.error('Failed to send meeting link', err);
    }
  };
  type User = { id: string; name?: string; email?: string; value?: unknown };
  type Contact = { id: string; name?: string; email?: string; message?: string; value?: unknown };
  type MentorRequest = { id: string; name?: string; email?: string; mobile?: string; mentorshipArea?: string; date?: string; time?: string; message?: string; status?: string; meetingLink?: string; value?: unknown };
  const [users, setUsers] = useState<User[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [mentorRequests, setMentorRequests] = useState<MentorRequest[]>([]);
  const [mentorsList, setMentorsList] = useState<Array<{id: string; name?: string; email?: string; stream?: string}>>([]);
  const [selectedMentor, setSelectedMentor] = useState<{[reqId: string]: string}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val() || {};
      setUsers(
        Object.entries(data).map(([id, value]) => {
          if (typeof value === "object" && value !== null) {
            return { id, ...value };
          } else {
            return { id, value };
          }
        })
      );
    });
  // Fetch contact us data 
  const contactRef = ref(db, "contactus");
    onValue(contactRef, (snapshot) => {
      const data = snapshot.val() || {};
      setContacts(
        Object.entries(data).map(([id, value]) => {
          if (typeof value === "object" && value !== null) {
            return { id, ...value };
          } else {
            return { id, value };
          }
        })
      );
    });
    // Fetch mentor requests
    const mentorRef = ref(db, "mentor_requests");
    onValue(mentorRef, (snapshot) => {
      const data = snapshot.val() || {};
      setMentorRequests(
        Object.entries(data).map(([id, value]) => {
          if (typeof value === "object" && value !== null) {
            return { id, ...value };
          } else {
            return { id, value };
          }
        })
      );
    });
    // Fetch mentors list (so admin can assign requests to mentors)
    const mentorsRef = ref(db, "mentors");
    onValue(mentorsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setMentorsList(
        Object.entries(data).map(([id, value]) => {
          if (typeof value === "object" && value !== null) {
            return { id, ...value };
          } else {
            return { id, value };
          }
        })
      );
    });
    setLoading(false);
  }, []);

  // Delete user
  const handleDeleteUser = async (id: string) => {
    await remove(ref(db, `users/${id}`));
    setUsers(users.filter((u) => u.id !== id));
  };

  // Accept/Reject mentor request
  const handleMentorStatus = async (id: string, status: "accepted" | "rejected") => {
    await update(ref(db, `mentor_requests/${id}`), { status });
    setMentorRequests(
      mentorRequests.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    );
  };

  // Delete mentor request
  const handleDeleteMentorRequest = async (id: string) => {
    await remove(ref(db, `mentor_requests/${id}`));
    setMentorRequests(mentorRequests.filter((req) => req.id !== id));
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Checking authentication...</div>
      </div>
    );
  }
  if (!isAdmin) {
    return null; // Or show a message if you prefer
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-[#2386ff] mb-8 text-center">Admin Dashboard</h2>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Users Section */}
            <section className="bg-white/80 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-[#2386ff] mb-4">Users</h3>
              {users.length === 0 ? (
                <div>No users found.</div>
              ) : (
                <ul className="space-y-3">
                  {users.map((user) => (
                    <li key={user.id} className="border-b pb-2 flex items-center">
                      <span className="text-[#1a3c6b]">{user.name || user.email || user.id}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            {/* Contact Us Section */}
            <section className="bg-white/80 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-[#2386ff] mb-4">Contact Us</h3>
              {contacts.length === 0 ? (
                <div>No contact submissions.</div>
              ) : (
                <ul className="space-y-3">
                  {contacts.map((c) => (
                    <li key={c.id} className="border-b pb-2">
                      <div className="text-[#1a3c6b]"><strong>Name:</strong> {c.name}</div>
                      <div className="text-[#1a3c6b]"><strong>Email:</strong> {c.email}</div>
                      <div className="text-[#1a3c6b]"><strong>Message:</strong> {c.message}</div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            {/* Mentor Requests Section */}
            <section className="bg-white/80 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-[#2386ff] mb-4">Mentor Requests</h3>
              {mentorRequests.length === 0 ? (
                <div>No mentor requests.</div>
              ) : (
                <div className="space-y-6">
                  {mentorRequests.map((req) => (
                    <div key={req.id} className="rounded-xl border border-[#e3eaff] bg-white/90 shadow p-5 mb-2">
                      <div className="mb-2">
                        {/* Mentor Image Placeholder - replace src with actual image if available */}
                        {/* <img src="/path/to/mentor-image.jpg" alt="Mentor" className="w-12 h-12 rounded-full mb-2" /> */}
                        <div className="text-[#1a3c6b] break-all mb-1"><strong>Name:</strong> {req.name}</div>
                        <div className="text-[#1a3c6b] break-all mb-1"><strong>Email:</strong> {req.email}</div>
                        <div className="text-[#1a3c6b] mb-1"><strong>Mobile:</strong> {req.mobile}</div>
                        <div className="text-[#1a3c6b] mb-1"><strong>Mentorship Area:</strong> {req.mentorshipArea}</div>
                        <div className="text-[#1a3c6b] mb-1"><strong>Date:</strong> {req.date}</div>
                        <div className="text-[#1a3c6b] mb-1"><strong>Time:</strong> {req.time}</div>
                        <div className="text-[#1a3c6b] break-all mb-1"><strong>Message:</strong> {req.message}</div>
                        <div className="text-[#1a3c6b] mb-1"><strong>Status:</strong> <span className={`font-bold ${req.status === "accepted" ? "text-green-600" : req.status === "rejected" ? "text-red-500" : "text-[#2386ff]"}`}>{req.status || "pending"}</span></div>
                        {req.meetingLink && (
                          <div className="text-[#2386ff] break-all mb-1"><strong>Meeting Link:</strong> <a href={req.meetingLink} target="_blank" rel="noopener noreferrer" className="underline break-all">{req.meetingLink}</a></div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4 items-center">
                        <button onClick={() => handleMentorStatus(req.id, "accepted")} className="bg-green-100 text-green-700 px-3 py-1 rounded-xl font-semibold hover:bg-green-200">Accept</button>
                        <button onClick={() => handleMentorStatus(req.id, "rejected")} className="bg-red-100 text-red-600 px-3 py-1 rounded-xl font-semibold hover:bg-red-200">Reject</button>
                        <button onClick={() => handleDeleteMentorRequest(req.id)} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-xl font-semibold hover:bg-gray-200">Delete</button>
                        {/* Admin: assign this request to a mentor */}
                        <select value={selectedMentor[req.id] || ""} onChange={e => setSelectedMentor({ ...selectedMentor, [req.id]: e.target.value })} className="border border-[#e3eaff] rounded-xl px-3 py-1 text-sm text-[#1a3c6b]">
                          <option value="">Assign to mentor...</option>
                          {mentorsList.map(m => (
                            <option key={m.id} value={m.id}>{m.name || m.email || m.id}</option>
                          ))}
                        </select>
                        <button onClick={async () => {
                          const mentorUid = selectedMentor[req.id];
                          if (!mentorUid) return;
                          const mentor = mentorsList.find(m => m.id === mentorUid);
                          try {
                            // Update request with assigned mentor
                            await update(ref(db, `mentor_requests/${req.id}`), { assignedTo: mentorUid, assignedToEmail: mentor?.email || null, status: 'assigned', assignedAt: new Date().toISOString() });
                            // Add reference under mentor (assignedRequests)
                            await update(ref(db, `mentors/${mentorUid}`), { [`assignedRequests/${req.id}`]: true });
                            // Update local state
                            setMentorRequests(mentorRequests.map(r => r.id === req.id ? { ...r, assignedTo: mentorUid, assignedToEmail: mentor?.email, status: 'assigned' } : r));
                            setSelectedMentor({ ...selectedMentor, [req.id]: '' });
                          } catch (err) {
                            console.error('Assign failed', err);
                          }
                        }} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-xl text-sm font-semibold hover:bg-indigo-200">Send to Mentor</button>
                        <input type="text" placeholder="Meeting Link" value={meetingLinks[req.id] || ""} onChange={e => setMeetingLinks({ ...meetingLinks, [req.id]: e.target.value })} className="border border-[#e3eaff] rounded-xl px-3 py-1 text-sm text-[#1a3c6b]" />
                        <button onClick={() => handleSendMeetingLink(req.id)} className="bg-[#2386ff] text-white px-3 py-1 rounded-xl text-sm font-semibold">Send Link</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
