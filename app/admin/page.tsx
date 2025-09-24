"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { ref, onValue, remove, update } from "firebase/database";
import Navbar from "../../components/Navbar";

export default function AdminPage() {
  const [meetingLinks, setMeetingLinks] = useState<{[id: string]: string}>({});

  const handleSendMeetingLink = async (id: string) => {
    const link = meetingLinks[id];
    if (!link) return;
    await update(ref(db, `mentor_requests/${id}`), { meetingLink: link });
    setMentorRequests(
      mentorRequests.map((req) =>
        req.id === id ? { ...req, meetingLink: link } : req
      )
    );
    setMeetingLinks({ ...meetingLinks, [id]: "" });
  };
  const [users, setUsers] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [mentorRequests, setMentorRequests] = useState<any[]>([]);
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
    const contactRef = ref(db, "contact_us");
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
                    <li key={user.id} className="border-b pb-2 flex justify-between items-center">
                      <span className="text-[#1a3c6b]">{user.name || user.email || user.id}</span>
                      <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:underline">Delete</button>
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
                <ul className="space-y-3">
                  {mentorRequests.map((req) => (
                    <li key={req.id} className="border-b pb-2">
                      <div className="text-[#1a3c6b]"><strong>Name:</strong> {req.name}</div>
                      <div className="text-[#1a3c6b]"><strong>Email:</strong> {req.email}</div>
                      <div className="text-[#1a3c6b]"><strong>Mobile:</strong> {req.mobile}</div>
                      <div className="text-[#1a3c6b]"><strong>Mentorship Area:</strong> {req.mentorshipArea}</div>
                      <div className="text-[#1a3c6b]"><strong>Date:</strong> {req.date}</div>
                      <div className="text-[#1a3c6b]"><strong>Time:</strong> {req.time}</div>
                      <div className="text-[#1a3c6b]"><strong>Message:</strong> {req.message}</div>
                      <div className="text-[#1a3c6b]"><strong>Status:</strong> {req.status || "pending"}</div>
                      {req.meetingLink && (
                        <div className="text-[#2386ff]"><strong>Meeting Link:</strong> <a href={req.meetingLink} target="_blank" rel="noopener noreferrer" className="underline">{req.meetingLink}</a></div>
                      )}
                      <div className="flex gap-2 mt-2 items-center">
                        <button onClick={() => handleMentorStatus(req.id, "accepted")} className="text-green-600 hover:underline">Accept</button>
                        <button onClick={() => handleMentorStatus(req.id, "rejected")} className="text-red-500 hover:underline">Reject</button>
                        <button onClick={() => handleDeleteMentorRequest(req.id)} className="text-gray-500 hover:underline">Delete</button>
                        <input type="text" placeholder="Meeting Link" value={meetingLinks[req.id] || ""} onChange={e => setMeetingLinks({ ...meetingLinks, [req.id]: e.target.value })} className="border border-[#e3eaff] rounded-2xl px-2 py-1 text-sm text-[#1a3c6b] ml-2" />
                        <button onClick={() => handleSendMeetingLink(req.id)} className="bg-[#2386ff] text-white px-2 py-1 rounded-2xl text-sm ml-1">Send Link</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
