"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { ref, get } from "firebase/database";
import { useRouter } from "next/navigation";

export default function MentorPage() {
	const [checking, setChecking] = useState(true);
	const [isMentor, setIsMentor] = useState(false);
	const [mentorName, setMentorName] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (user: User | null) => {
			setChecking(true);
			if (!user) {
				setIsMentor(false);
				setMentorName(null);
				setChecking(false);
				return;
			}

			try {
				const snap = await get(ref(db, `mentors/${user.uid}`));
				if (snap.exists()) {
					const data = snap.val();
					setIsMentor(true);
					setMentorName(data.name || null);
				} else {
					setIsMentor(false);
					setMentorName(null);
				}
			} catch (err) {
				console.error("Error checking mentor record:", err);
				setIsMentor(false);
				setMentorName(null);
			}
			setChecking(false);
		});
		return () => unsub();
	}, []);

	const handleLogout = async () => {
		try {
			await signOut(auth);
			setIsMentor(false);
			setMentorName(null);
			router.push("/");
		} catch (err) {
			console.error("Logout failed", err);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
			<Navbar />
			<main className="flex-1 max-w-4xl mx-auto py-12 px-4">
				<h2 className="text-3xl font-bold text-[#2386ff] mb-4 text-center">Mentor Portal</h2>

				{checking ? (
					<div className="text-center text-[#1a3c6b]">Checking session...</div>
				) : isMentor ? (
					<div className="max-w-3xl mx-auto bg-white/90 rounded-2xl p-8 shadow-lg">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-2xl font-semibold text-[#2386ff]">Welcome{mentorName ? `, ${mentorName}` : ""} 👋</h3>
								<p className="text-[#1a3c6b] mt-2">You're signed in as a mentor. Use the tools below to manage sessions and mentees.</p>
							</div>
							<div className="flex gap-3 items-center">
								<button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
							<Link href="/mentor/requests" className="block bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white rounded-xl p-6 text-center">View Requests</Link>
							<Link href="/mentor/schedule" className="block bg-gradient-to-r from-[#00bfae] to-[#8D44FF] text-white rounded-xl p-6 text-center">My Schedule</Link>
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-6 items-center mt-8">
						<Link href="/mentor/register" className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">Register as Mentor</Link>
						<Link href="/mentor/login" className="bg-gradient-to-r from-[#00bfae] to-[#2386ff] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">Mentor Login</Link>
					</div>
				)}
			</main>
		</div>
	);
}
