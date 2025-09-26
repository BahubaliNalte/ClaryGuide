"use client";
import { useState, useEffect } from "react";
// import Image from "next/image";
import Link from "next/link";

interface College {
  Name: string;
  Location: string;
  StudentRating?: number;
  Website?: string;
  EstablishedYear?: number;
  Approvals?: string[];
  Courses?: { CourseName: string; Specialization?: string; FeePerSemester?: string | null }[];
  _city?: string;
  _type?: keyof CityColleges;
  // Removed invalid index signature. Explicitly declare extra properties below.
}

interface CityColleges {
  Government: College[];
  Private: College[];
}

export default function CollegeHub() {
  const [colleges, setColleges] = useState<Record<string, CityColleges>>({});
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<College[]>([]);

  useEffect(() => {
    fetch("/up_colleges.json")
      .then((res) => res.json())
      .then((data) => setColleges(data));
  }, []);

  useEffect(() => {
    // Flatten all colleges into a single array
    const all: College[] = [];
    Object.entries(colleges).forEach(([city, types]) => {
      (["Government", "Private"] as (keyof CityColleges)[]).forEach((type) => {
        types[type]?.forEach((college: College) => {
          all.push({ ...college, _city: city, _type: type });
        });
      });
    });
    // Filter by name or city
    const q = search.trim().toLowerCase();
    if (!q) {
      setFiltered(all);
    } else {
      setFiltered(
        all.filter(
          (c) =>
            c.Name.toLowerCase().includes(q) ||
            (c._city && c._city.toLowerCase().includes(q))
        )
      );
    }
  }, [colleges, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col items-center py-8 px-2">
      <h1 className="text-3xl font-bold text-[#2386ff] mb-4">UP College Hub</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by college name or city..."
        className="w-full max-w-xl border border-[#e3eaff] rounded-2xl px-4 py-3 text-lg text-[#1a3c6b] bg-white mb-6"
      />
      <div className="max-w-4xl w-full mx-auto bg-white/80 rounded-2xl shadow-2xl p-6 backdrop-blur-lg">
        {filtered.length === 0 ? (
          <div className="text-center text-[#8D44FF]">No colleges found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <div key={c.Name + c._city + c._type + i} className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 border border-[#e3eaff] hover:shadow-2xl transition-all duration-200">
                <div className="font-bold text-lg text-[#2386ff] mb-1">{c.Name}</div>
                <div className="flex flex-wrap gap-2 text-sm text-[#1a3c6b]">
                  <span className="bg-[#e3eaff] px-2 py-1 rounded-full">{c._city}</span>
                  <span className="bg-[#c1f2e7] px-2 py-1 rounded-full">{c._type}</span>
                  {c.StudentRating && <span className="bg-[#f7fdfc] px-2 py-1 rounded-full">⭐ {c.StudentRating}</span>}
                  {c.EstablishedYear && <span className="bg-[#f7fdfc] px-2 py-1 rounded-full">Est. {c.EstablishedYear}</span>}
                </div>
                {c.Website && (
                  <a href={c.Website} target="_blank" rel="noopener noreferrer" className="text-[#00bfae] underline text-sm mt-2">Visit Website</a>
                )}
                {c.Courses && c.Courses.length > 0 && (
                  <div className="mt-2">
                    <div className="font-semibold text-[#8D44FF] text-sm mb-1">Courses:</div>
                    <ul className="list-disc ml-5 text-sm text-[#1a3c6b]">
                      {c.Courses.map((course, idx) => (
                        <li key={course.CourseName + idx}>
                          {course.CourseName}
                          {course.Specialization ? ` (${course.Specialization})` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
{/* Floating Chatbot */}
		<Link
			id="botBtn"
			href="/chatbot"
			className="fixed bottom-6 right-6 bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white rounded-full p-4 shadow-lg text-2xl hover:scale-110 transition-transform duration-200 animate-fade-in"
			aria-label="Open chat"
		>
			💬
		</Link>

				
    </div>
    
  );
}
