"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Image from "next/image";

const degrees = [
  { name: "B.A.", description: "Bachelor of Arts - Humanities, languages, social sciences.", careers: ["Teacher", "Journalist", "Civil Services", "Writer", "Lawyer", "Social Worker"], exams: ["UPSC", "NET", "SSC", "State PSC", "TET"], higherStudies: ["M.A.", "MFA", "M.Ed", "PhD", "LLM"], industries: ["Media", "Education", "Government", "Law", "NGOs"] },
  { name: "BFA", description: "Bachelor of Fine Arts - Visual and performing arts.", careers: ["Artist", "Designer", "Animator", "Art Teacher", "Photographer"], exams: ["NET", "SSC", "State PSC"], higherStudies: ["MFA", "PhD", "Diploma"], industries: ["Art", "Design", "Media", "Education"] },
  { name: "BPA", description: "Bachelor of Performing Arts - Music, dance, drama.", careers: ["Performer", "Music Teacher", "Choreographer", "Actor"], exams: ["NET", "State PSC"], higherStudies: ["MPA", "PhD", "Diploma"], industries: ["Performing Arts", "Media", "Education"] },
  { name: "BSW", description: "Bachelor of Social Work - Social welfare, community service.", careers: ["Social Worker", "NGO Manager", "Counselor", "Community Organizer"], exams: ["NET", "State PSC"], higherStudies: ["MSW", "PhD", "Diploma"], industries: ["NGOs", "Government", "Education"] },
  { name: "B.Ed.", description: "Bachelor of Education - Teaching and education.", careers: ["Teacher", "Principal", "Education Administrator", "Counselor"], exams: ["TET", "CTET", "State PSC"], higherStudies: ["M.Ed", "PhD", "Diploma"], industries: ["Education", "Schools", "Colleges", "NGOs"] },
  { name: "B.El.Ed.", description: "Bachelor of Elementary Education - Primary teaching.", careers: ["Primary Teacher", "Education Coordinator"], exams: ["TET", "CTET"], higherStudies: ["M.Ed", "Diploma"], industries: ["Education", "Schools"] },
  { name: "B.P.Ed.", description: "Bachelor of Physical Education - Sports and fitness.", careers: ["Sports Coach", "Fitness Trainer", "Physical Education Teacher"], exams: ["NET", "State PSC"], higherStudies: ["M.P.Ed", "Diploma"], industries: ["Sports", "Education", "Fitness"] },
  // Science
  { name: "B.Sc.", description: "Bachelor of Science - General science.", careers: ["Scientist", "Researcher", "Teacher", "Lab Technician"], exams: ["GATE", "NET", "State PSC"], higherStudies: ["M.Sc.", "PhD", "Diploma"], industries: ["Research", "Education", "Healthcare"] },
  { name: "B.Sc. (Hons.)", description: "Bachelor of Science (Honours) - Specialized science.", careers: ["Scientist", "Researcher", "Teacher"], exams: ["GATE", "NET"], higherStudies: ["M.Sc.", "PhD"], industries: ["Research", "Education"] },
  { name: "B.Sc. Agriculture", description: "Agricultural sciences.", careers: ["Agronomist", "Farm Manager", "Researcher"], exams: ["ICAR", "State PSC"], higherStudies: ["M.Sc. Agriculture", "PhD"], industries: ["Agriculture", "Research"] },
  { name: "B.Sc. Nursing", description: "Nursing and healthcare.", careers: ["Nurse", "Healthcare Administrator", "Researcher"], exams: ["AIIMS Nursing", "State PSC"], higherStudies: ["M.Sc. Nursing", "PhD"], industries: ["Healthcare", "Hospitals"] },
  { name: "B.Sc. Forestry", description: "Forestry and environment.", careers: ["Forest Officer", "Researcher", "Environmentalist"], exams: ["IFS", "State PSC"], higherStudies: ["M.Sc. Forestry", "PhD"], industries: ["Forestry", "Environment"] },
  { name: "B.Sc. Biotechnology", description: "Biotechnology.", careers: ["Biotechnologist", "Researcher", "Lab Technician"], exams: ["GATE", "NET"], higherStudies: ["M.Sc. Biotech", "PhD"], industries: ["Biotech", "Research"] },
  { name: "B.Sc. Microbiology", description: "Microbiology.", careers: ["Microbiologist", "Lab Technician", "Researcher"], exams: ["GATE", "NET"], higherStudies: ["M.Sc. Microbiology", "PhD"], industries: ["Healthcare", "Research"] },
  { name: "B.Sc. Zoology", description: "Zoology.", careers: ["Zoologist", "Wildlife Biologist", "Researcher"], exams: ["NET", "State PSC"], higherStudies: ["M.Sc. Zoology", "PhD"], industries: ["Research", "Wildlife"] },
  { name: "B.Sc. Botany", description: "Botany.", careers: ["Botanist", "Researcher", "Teacher"], exams: ["NET", "State PSC"], higherStudies: ["M.Sc. Botany", "PhD"], industries: ["Research", "Education"] },
  { name: "B.Sc. Physics", description: "Physics.", careers: ["Physicist", "Researcher", "Teacher"], exams: ["NET", "State PSC"], higherStudies: ["M.Sc. Physics", "PhD"], industries: ["Research", "Education"] },
  { name: "B.Sc. Chemistry", description: "Chemistry.", careers: ["Chemist", "Researcher", "Lab Technician"], exams: ["NET", "State PSC"], higherStudies: ["M.Sc. Chemistry", "PhD"], industries: ["Research", "Healthcare"] },
  { name: "B.Sc. Mathematics", description: "Mathematics.", careers: ["Mathematician", "Data Analyst", "Teacher"], exams: ["NET", "State PSC"], higherStudies: ["M.Sc. Mathematics", "PhD"], industries: ["Research", "Education"] },
  { name: "B.Sc. Statistics", description: "Statistics.", careers: ["Statistician", "Data Analyst", "Researcher"], exams: ["NET", "State PSC"], higherStudies: ["M.Sc. Statistics", "PhD"], industries: ["Research", "Business"] },
  { name: "B.Sc. Environmental Science", description: "Environmental science.", careers: ["Environmentalist", "Researcher", "Consultant"], exams: ["NET", "State PSC"], higherStudies: ["M.Sc. Env. Science", "PhD"], industries: ["Environment", "Consulting"] },
  { name: "B.Sc. Computer Science", description: "Computer science.", careers: ["Software Developer", "IT Analyst", "Researcher"], exams: ["GATE", "NET"], higherStudies: ["M.Sc. CS", "PhD"], industries: ["IT", "Research"] },
  { name: "B.Sc. IT", description: "Information technology.", careers: ["IT Specialist", "Web Developer", "System Analyst"], exams: ["GATE", "NET"], higherStudies: ["M.Sc. IT", "PhD"], industries: ["IT", "Web Development"] },
  { name: "B.Pharm", description: "Pharmacy.", careers: ["Pharmacist", "Medical Rep", "Researcher"], exams: ["GPAT", "State PSC"], higherStudies: ["M.Pharm", "PhD"], industries: ["Healthcare", "Pharma"] },
  { name: "BPT", description: "Physiotherapy.", careers: ["Physiotherapist", "Healthcare Consultant"], exams: ["State PSC"], higherStudies: ["MPT", "PhD"], industries: ["Healthcare", "Hospitals"] },
  { name: "BMLT", description: "Medical Lab Technology.", careers: ["Lab Technician", "Healthcare Analyst"], exams: ["State PSC"], higherStudies: ["MMLT", "PhD"], industries: ["Healthcare", "Labs"] },
  { name: "BOT", description: "Occupational Therapy.", careers: ["Occupational Therapist", "Healthcare Consultant"], exams: ["State PSC"], higherStudies: ["MOT", "PhD"], industries: ["Healthcare", "Hospitals"] },
  // Commerce & Management
  { name: "B.Com.", description: "Commerce, finance, economics.", careers: ["Accountant", "Banker", "Entrepreneur", "CA", "Financial Analyst", "Business Manager"], exams: ["CA", "IBPS", "SSC", "RBI", "State PSC"], higherStudies: ["M.Com", "MBA", "CFA", "MFC"], industries: ["Banking", "Finance", "Business", "Government", "Startups"] },
  { name: "B.Com. (Hons.)", description: "Commerce (Honours).", careers: ["Accountant", "Financial Analyst", "Auditor"], exams: ["CA", "IBPS"], higherStudies: ["M.Com", "MBA"], industries: ["Finance", "Business"] },
  { name: "BBA", description: "Business administration.", careers: ["Business Manager", "Entrepreneur", "HR Manager", "Marketing Executive", "Consultant"], exams: ["CAT", "MAT", "IBPS", "SSC", "State PSC"], higherStudies: ["MBA", "MHRM", "PGDM", "M.Com"], industries: ["Business", "Management", "Marketing", "Finance", "Startups"] },
  { name: "BBM", description: "Business management.", careers: ["Business Manager", "Entrepreneur", "Consultant"], exams: ["CAT", "MAT"], higherStudies: ["MBA", "PGDM"], industries: ["Business", "Management"] },
  { name: "BMS", description: "Management studies.", careers: ["Manager", "Consultant", "Entrepreneur"], exams: ["CAT", "MAT"], higherStudies: ["MBA", "PGDM"], industries: ["Business", "Management"] },
  { name: "BHM", description: "Hotel management.", careers: ["Hotel Manager", "Chef", "Event Manager"], exams: ["NCHMCT", "State PSC"], higherStudies: ["MHM", "MBA"], industries: ["Hospitality", "Tourism"] },
  { name: "B.Voc.", description: "Skill-based and technical education.", careers: ["Technician", "IT Specialist", "Designer", "Skilled Trades", "Digital Marketer"], exams: ["ITI", "Polytechnic", "Skill India", "SSC"], higherStudies: ["Advanced Diplomas", "B.Voc", "Specialized Certifications"], industries: ["IT", "Design", "Manufacturing", "Services", "Freelancing"] },
  // Law
  { name: "LL.B.", description: "Law and legal studies.", careers: ["Lawyer", "Judge", "Legal Advisor", "Public Prosecutor", "Corporate Counsel"], exams: ["CLAT", "Judicial Services", "State PSC"], higherStudies: ["LLM", "PhD", "MBA"], industries: ["Law", "Judiciary", "Corporate", "Government"] },
  { name: "B.A. LL.B.", description: "Integrated law and arts.", careers: ["Lawyer", "Legal Advisor", "Civil Services"], exams: ["CLAT", "Judicial Services"], higherStudies: ["LLM", "PhD"], industries: ["Law", "Government"] },
  { name: "BBA LL.B.", description: "Integrated law and business.", careers: ["Corporate Lawyer", "Legal Advisor"], exams: ["CLAT", "Judicial Services"], higherStudies: ["LLM", "MBA"], industries: ["Corporate", "Law"] },
  { name: "B.Com. LL.B.", description: "Integrated law and commerce.", careers: ["Corporate Lawyer", "Legal Advisor"], exams: ["CLAT", "Judicial Services"], higherStudies: ["LLM", "MBA"], industries: ["Corporate", "Law"] },
  // Computer & Technology
  { name: "BCA", description: "Computer applications.", careers: ["Software Developer", "System Analyst", "Web Developer", "IT Consultant", "Database Administrator"], exams: ["GATE", "IBPS IT", "SSC", "State PSC"], higherStudies: ["MCA", "M.Sc. IT", "MBA IT"], industries: ["IT", "Software", "Web Development", "Consulting"] },
  { name: "B.Tech.", description: "Engineering and technology.", careers: ["Engineer", "Project Manager", "Researcher", "IT Specialist", "Consultant"], exams: ["JEE", "GATE", "SSC JE", "State PSC"], higherStudies: ["M.Tech", "MBA", "PhD"], industries: ["Engineering", "Technology", "IT", "Manufacturing"] },
  { name: "B.E.", description: "Engineering.", careers: ["Engineer", "Project Manager", "Consultant"], exams: ["JEE", "GATE"], higherStudies: ["M.E.", "MBA", "PhD"], industries: ["Engineering", "Technology"] },
  // Medical & Allied Health Sciences
  { name: "MBBS", description: "Medicine and surgery.", careers: ["Doctor", "Surgeon", "Medical Officer", "Researcher", "Healthcare Administrator"], exams: ["NEET", "AIIMS", "State Medical Exams"], higherStudies: ["MD", "MS", "DM", "MCh"], industries: ["Healthcare", "Hospitals", "Research", "Government"] },
  { name: "BDS", description: "Dental surgery.", careers: ["Dentist", "Dental Surgeon", "Researcher"], exams: ["NEET", "State Medical Exams"], higherStudies: ["MDS", "PhD"], industries: ["Healthcare", "Dental"] },
  { name: "BAMS", description: "Ayurvedic medicine.", careers: ["Ayurvedic Doctor", "Researcher"], exams: ["NEET", "State Medical Exams"], higherStudies: ["MD Ayurveda", "PhD"], industries: ["Healthcare", "Ayurveda"] },
  { name: "BHMS", description: "Homeopathic medicine.", careers: ["Homeopathic Doctor", "Researcher"], exams: ["NEET", "State Medical Exams"], higherStudies: ["MD Homeopathy", "PhD"], industries: ["Healthcare", "Homeopathy"] },
  { name: "BUMS", description: "Unani medicine.", careers: ["Unani Doctor", "Researcher"], exams: ["NEET", "State Medical Exams"], higherStudies: ["MD Unani", "PhD"], industries: ["Healthcare", "Unani"] },
  { name: "BNYS", description: "Naturopathy & Yogic Sciences.", careers: ["Naturopath", "Yoga Therapist", "Researcher"], exams: ["NEET", "State Medical Exams"], higherStudies: ["MD Naturopathy", "PhD"], industries: ["Healthcare", "Wellness"] },
  // Specialized / Professional
  { name: "B.Des.", description: "Design.", careers: ["Designer", "Fashion Designer", "Product Designer"], exams: ["NID", "CEED"], higherStudies: ["M.Des", "Diploma"], industries: ["Design", "Fashion", "Product"] },
  { name: "B.Arch.", description: "Architecture.", careers: ["Architect", "Urban Planner", "Interior Designer"], exams: ["NATA", "GATE"], higherStudies: ["M.Arch", "Diploma"], industries: ["Architecture", "Urban Planning"] },
  { name: "B.Plan.", description: "Planning.", careers: ["Urban Planner", "Town Planner"], exams: ["GATE", "State PSC"], higherStudies: ["M.Plan", "Diploma"], industries: ["Urban Planning", "Government"] },
  { name: "B.Lib.Sc.", description: "Library science.", careers: ["Librarian", "Information Manager"], exams: ["NET", "State PSC"], higherStudies: ["M.Lib.Sc", "Diploma"], industries: ["Libraries", "Education"] },
  { name: "B.J.M.C.", description: "Journalism & Mass Communication.", careers: ["Journalist", "Editor", "Media Manager"], exams: ["NET", "State PSC"], higherStudies: ["M.J.M.C", "Diploma"], industries: ["Media", "Communication"] },
  { name: "BFD", description: "Fashion design.", careers: ["Fashion Designer", "Stylist"], exams: ["NIFT", "State PSC"], higherStudies: ["MFD", "Diploma"], industries: ["Fashion", "Design"] },
  { name: "BHMCT", description: "Hotel Management & Catering Technology.", careers: ["Hotel Manager", "Catering Manager"], exams: ["NCHMCT", "State PSC"], higherStudies: ["MHMCT", "Diploma"], industries: ["Hospitality", "Tourism"] },
  { name: "BTTM", description: "Travel & Tourism Management.", careers: ["Travel Manager", "Tour Operator"], exams: ["State PSC"], higherStudies: ["MTTM", "Diploma"], industries: ["Tourism", "Travel"] },
];

const categories = [
  { name: "Arts & Humanities", icon: "🎨", degrees: ["B.A.", "BFA", "BPA", "BSW", "B.Ed.", "B.El.Ed.", "B.P.Ed."] },
  { name: "Science", icon: "🔬", degrees: ["B.Sc.", "B.Sc. (Hons.)", "B.Sc. Agriculture", "B.Sc. Nursing", "B.Sc. Forestry", "B.Sc. Biotechnology", "B.Sc. Microbiology", "B.Sc. Zoology", "B.Sc. Botany", "B.Sc. Physics", "B.Sc. Chemistry", "B.Sc. Mathematics", "B.Sc. Statistics", "B.Sc. Environmental Science", "B.Sc. Computer Science", "B.Sc. IT", "B.Pharm", "BPT", "BMLT", "BOT"] },
  { name: "Commerce & Management", icon: "💼", degrees: ["B.Com.", "B.Com. (Hons.)", "BBA", "BBM", "BMS", "BHM", "B.Voc."] },
  { name: "Law", icon: "⚖️", degrees: ["LL.B.", "B.A. LL.B.", "BBA LL.B.", "B.Com. LL.B."] },
  { name: "Computer & Technology", icon: "💻", degrees: ["BCA", "B.Tech.", "B.E."] },
  { name: "Medical & Allied Health Sciences", icon: "🩺", degrees: ["MBBS", "BDS", "BAMS", "BHMS", "BUMS", "BNYS", "B.Sc. Nursing", "BPT", "B.Pharm", "BMLT"] },
  { name: "Specialized / Professional", icon: "🏆", degrees: ["B.Des.", "B.Arch.", "B.Plan.", "B.Lib.Sc.", "B.J.M.C.", "BFD", "BHMCT", "BTTM"] },
];

export default function CareerPathsPage() {
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState(() => Object.fromEntries(categories.map(c => [c.name, true])));

  function getDegreesForCategory(cat: { name: string; icon: string; degrees: string[] }) {
    return degrees.filter((deg) =>
      cat.degrees.includes(deg.name) &&
      (deg.name.toLowerCase().includes(search.toLowerCase()) || deg.description.toLowerCase().includes(search.toLowerCase()))
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto py-12 px-2 md:px-8">
        <h2 className="text-4xl font-extrabold text-[#2386ff] mb-8 text-center tracking-tight drop-shadow">Course-to-Career Path Mapping</h2>
        <p className="text-lg text-[#1a3c6b] text-center mb-8">Explore what each degree offers, the career options, government exams, higher studies, and industries you can pursue after graduation.</p>
        <div className="sticky top-0 z-10 bg-[#e3eaff]/80 backdrop-blur-md py-4 mb-6 shadow-sm rounded-xl max-w-2xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search degree or field..."
            className="w-full px-5 py-3 border-2 border-[#2386ff] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white shadow text-gray-900 placeholder-gray-500"
          />
        </div>
        <div className="space-y-8">
          {categories.map((cat) => {
            const catDegrees = getDegreesForCategory(cat);
            if (catDegrees.length === 0) return null;
            return (
              <div key={cat.name} className="bg-white rounded-2xl shadow-lg border border-blue-200">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-2xl font-bold text-blue-700 hover:bg-blue-50 transition-all rounded-t-2xl"
                  onClick={() => setOpenCategories((prev) => ({ ...prev, [cat.name]: !prev[cat.name] }))}
                  aria-expanded={openCategories[cat.name]}
                >
                  <span className="flex items-center gap-3">{cat.icon} {cat.name}</span>
                  <span className={`transform transition-transform ${openCategories[cat.name] ? "rotate-90" : "rotate-0"}`}>▶</span>
                </button>
                <div
                  className={`transition-all duration-300 ${openCategories[cat.name] ? "py-6" : "max-h-0 py-0 overflow-hidden"}`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-6 overflow-visible">
                    {catDegrees.map((deg) => (
                      <div key={deg.name} className="bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-md p-6 border-t-4 border-blue-400 hover:scale-[1.03] hover:shadow-xl transition-all w-full min-h-[320px] flex flex-col">
                        <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                          <span className="inline-block w-7 h-7 bg-blue-200 rounded-full text-center text-lg font-bold mr-2">{deg.name[0]}</span>
                          {deg.name}
                        </h3>
                        <p className="text-gray-700 mb-2 italic">{deg.description}</p>
                        <div className="mb-2">
                          <span className="font-medium text-blue-600">Careers:</span>
                          <ul className="list-disc ml-6 text-gray-800">
                            {deg.careers.map((c) => (
                              <li key={c}>{c}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-2">
                          <span className="font-medium text-blue-600">Govt. Exams:</span>
                          <ul className="list-disc ml-6 text-gray-800">
                            {deg.exams.map((ex) => (
                              <li key={ex}>{ex}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-2">
                          <span className="font-medium text-blue-600">Higher Studies:</span>
                          <ul className="list-disc ml-6 text-gray-800">
                            {deg.higherStudies.map((hs) => (
                              <li key={hs}>{hs}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium text-blue-600">Industries/Sectors:</span>
                          <ul className="list-disc ml-6 text-gray-800">
                            {deg.industries.map((ind) => (
                              <li key={ind}>{ind}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center text-gray-400 mt-12 text-sm">Data is for guidance only. Please verify with official sources.</div>




      </main>

          

{/* Floating Chatbot */}
		<Link
			id="botBtn"
			href="/chatbot"
			className="fixed bottom-6 right-6 bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white rounded-full p-4 shadow-lg text-2xl hover:scale-110 transition-transform duration-200 animate-fade-in"
			aria-label="Open chat"
		>
			💬
		</Link>

				{/* Footer */}
									<footer className="bg-gradient-to-r from-[#f7fdfc] via-[#e3eaff] to-[#c1f2e7] text-[#6b7280] py-8 text-base mt-16 border-t border-[#e0e7ef] animate-fade-in">
										<div className="max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap sm:justify-between items-center gap-6 px-4">
											<div className="flex items-center gap-2 mb-4 sm:mb-0">
												<Image src="/logo-favicon.png" alt="ClaryGuide Logo" width={32} height={32} className="drop-shadow-lg animate-fade-in" />
												<span className="font-bold text-[#2386ff] text-lg animate-slide-in">ClaryGuide</span>
											</div>
											<div className="flex flex-col sm:flex-row gap-4 sm:gap-8 flex-wrap text-lg items-center justify-center w-full sm:w-auto mb-4 sm:mb-0">
												 <Link href="/" className="hover:text-[#2386ff] hover:scale-105 transition-transform duration-200">Home</Link>
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
