
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Degree = {
  name: string;
  description: string;
  careers: string[];
  exams: string[];
  higherStudies: string[];
  industries: string[];
};


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

function getCategory(degreeName: string): string {
  const cat = categories.find((c) => c.degrees.includes(degreeName));
  return cat ? cat.name : "Unknown";
}

function getComparisonSummary(degreeA: Degree, degreeB: Degree) {
  const diff: string[] = [];
  const same: string[] = [];

  // Compare descriptions
  if (degreeA.description === degreeB.description) {
    same.push("Both degrees have a similar academic focus.");
  } else {
    diff.push("Descriptions are different.");
  }

  // Compare careers
  const careersA = new Set(degreeA.careers);
  const careersB = new Set(degreeB.careers);
  const sharedCareers = degreeA.careers.filter(c => careersB.has(c));
  const uniqueA = degreeA.careers.filter(c => !careersB.has(c));
  const uniqueB = degreeB.careers.filter(c => !careersA.has(c));
  if (sharedCareers.length > 0) {
    same.push(`Both offer careers as: ${sharedCareers.join(", ")}`);
  }
  if (uniqueA.length > 0) diff.push(`${degreeA.name} offers unique careers: ${uniqueA.join(", ")}`);
  if (uniqueB.length > 0) diff.push(`${degreeB.name} offers unique careers: ${uniqueB.join(", ")}`);

  // Compare industries
  const industriesA = new Set(degreeA.industries);
  const industriesB = new Set(degreeB.industries);
  const sharedIndustries = degreeA.industries.filter(i => industriesB.has(i));
  const uniqueIndA = degreeA.industries.filter(i => !industriesB.has(i));
  const uniqueIndB = degreeB.industries.filter(i => !industriesA.has(i));
  if (sharedIndustries.length > 0) {
    same.push(`Both are relevant in: ${sharedIndustries.join(", ")}`);
  }
  if (uniqueIndA.length > 0) diff.push(`${degreeA.name} is relevant in: ${uniqueIndA.join(", ")}`);
  if (uniqueIndB.length > 0) diff.push(`${degreeB.name} is relevant in: ${uniqueIndB.join(", ")}`);

  // Compare higher studies
  const hsB = new Set(degreeB.higherStudies);
  const sharedHS = degreeA.higherStudies.filter(h => hsB.has(h));
  if (sharedHS.length > 0) {
    same.push(`Both allow higher studies in: ${sharedHS.join(", ")}`);
  }
  if (degreeA.higherStudies.join() !== degreeB.higherStudies.join()) diff.push("Higher studies options differ.");

  // Compare exams
  const examsB = new Set(degreeB.exams);
  const sharedExams = degreeA.exams.filter(e => examsB.has(e));
  if (sharedExams.length > 0) {
    same.push(`Both require/accept exams: ${sharedExams.join(", ")}`);
  }
  if (degreeA.exams.join() !== degreeB.exams.join()) diff.push("Exams required are different.");

  // Insights
  const insights: string[] = [];
  if (uniqueA.length > uniqueB.length) {
    insights.push(`${degreeA.name} has a wider variety of career options.`);
  } else if (uniqueB.length > uniqueA.length) {
    insights.push(`${degreeB.name} has a wider variety of career options.`);
  }
  if (uniqueIndA.length > uniqueIndB.length) {
    insights.push(`${degreeA.name} is applicable in more industries.`);
  } else if (uniqueIndB.length > uniqueIndA.length) {
    insights.push(`${degreeB.name} is applicable in more industries.`);
  }
  if (degreeA.higherStudies.length > degreeB.higherStudies.length) {
    insights.push(`${degreeA.name} offers more higher study options.`);
  } else if (degreeB.higherStudies.length > degreeA.higherStudies.length) {
    insights.push(`${degreeB.name} offers more higher study options.`);
  }
  if (degreeA.exams.length > degreeB.exams.length) {
    insights.push(`${degreeA.name} has more competitive exams, which may mean more opportunities but also more competition.`);
  } else if (degreeB.exams.length > degreeA.exams.length) {
    insights.push(`${degreeB.name} has more competitive exams, which may mean more opportunities but also more competition.`);
  }

  // Recommendation
  let best = degreeA.name;
  let reason = "Offers broader career and industry options.";
  if (
    uniqueB.length + uniqueIndB.length > uniqueA.length + uniqueIndA.length
  ) {
    best = degreeB.name;
    reason = `${degreeB.name} is recommended for its wider career and industry scope.`;
  } else if (
    uniqueA.length + uniqueIndA.length === uniqueB.length + uniqueIndB.length
  ) {
    best = "Both are equally versatile.";
    reason = "Both degrees offer similar career and industry opportunities. Choose based on your interest.";
  }

  return { same, diff, insights, best, reason };
}

function DegreeComparison() {
  const [selected, setSelected] = useState<string[]>(["B.A.", "B.Sc."]);
  const [showComparison, setShowComparison] = useState(false);

  // Only allow two degrees to be selected
  const degreeData = selected.slice(0, 2).map((name) => degrees.find((d) => d.name === name));

  let comparisonSummary = null;
  if (showComparison && degreeData[0] && degreeData[1]) {
    const summary = getComparisonSummary(degreeData[0], degreeData[1]);
    comparisonSummary = (
      <div style={{
        marginTop: "2.5rem",
        background: "#e3f2fd",
        borderRadius: 16,
        padding: "2rem 1.5rem",
        maxWidth: 700,
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        color: "#222"
      }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1976d2", marginBottom: 12 }}>Comparison Summary</h3>
        {summary.same.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <b>Similarities:</b>
            <ul style={{ marginBottom: 0 }}>
              {summary.same.map((s, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {summary.diff.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <b>Differences:</b>
            <ul style={{ marginBottom: 0 }}>
              {summary.diff.map((d, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{d}</li>
              ))}
            </ul>
          </div>
        )}
        {summary.insights.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <b>Insights:</b>
            <ul style={{ marginBottom: 0 }}>
              {summary.insights.map((ins, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{ins}</li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ fontWeight: 600, color: "#388e3c", fontSize: "1.1rem" }}>
          Best Degree: {summary.best}
        </div>
        <div style={{ marginTop: 6 }}>{summary.reason}</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #e0ecff 0%, #f7faff 100%)",
      color: "#222",
      padding: "2rem",
      fontFamily: "Segoe UI, Arial, sans-serif",
      overflowX: "hidden"
    }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: 700, marginBottom: "2rem", letterSpacing: 1, color: "#1976d2" }}>Degree Comparison Tool</h1>
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginBottom: "2.5rem" }}>
        {[0, 1].map((idx) => (
          <select
            key={idx}
            value={selected[idx]}
            onChange={(e) => {
              const newSelected = [...selected];
              newSelected[idx] = e.target.value;
              setSelected(newSelected);
              setShowComparison(false);
            }}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1.15rem",
              borderRadius: 8,
              border: "2px solid #90caf9",
              background: "#fff",
              color: "#222",
              fontWeight: 500,
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              outline: "none",
              cursor: "pointer",
              minWidth: 180,
              transition: "border-color 0.2s"
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#1976d2'}
            onBlur={e => e.currentTarget.style.borderColor = '#90caf9'}
          >
            {degrees.map((deg) => (
              <option key={deg.name} value={deg.name} style={{
                background: "#fff",
                color: "#222",
                fontSize: "1.08rem",
                padding: "0.5rem 1rem"
              }}>
                {deg.name}
              </option>
            ))}
          </select>
        ))}
      </div>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <button
          onClick={() => setShowComparison(true)}
          style={{
            padding: "0.8rem 2.2rem",
            fontSize: "1.15rem",
            borderRadius: 8,
            border: "none",
            background: "#1976d2",
            color: "#fff",
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            cursor: "pointer",
            letterSpacing: 1,
            transition: "background 0.2s"
          }}
        >Compare</button>
      </div>
      <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center" }}>
        {degreeData.map((deg, idx) => (
          deg ? (
            <div
              key={deg.name}
              style={{
                border: "1px solid #e3eafc",
                borderRadius: 16,
                padding: "2rem 1.5rem",
                width: 340,
                background: "#fff",
                boxShadow: "0 6px 32px rgba(0,0,0,0.10)",
                color: "#222",
                transition: "transform 0.2s",
                fontSize: "1.08rem"
              }}
            >
              <h2 style={{ marginBottom: 12, fontSize: "1.5rem", fontWeight: 600, color: "#1976d2", letterSpacing: 1 }}>{deg.name}</h2>
              <div style={{ marginBottom: 10 }}><span style={{ fontWeight: 600, color: "#0097a7" }}>Category:</span> {getCategory(deg.name)}</div>
              <div style={{ marginBottom: 10 }}><span style={{ fontWeight: 600, color: "#0097a7" }}>Description:</span> {deg.description}</div>
              <div style={{ marginBottom: 10 }}><span style={{ fontWeight: 600, color: "#0097a7" }}>Careers:</span> {deg.careers.join(", ")}</div>
              <div style={{ marginBottom: 10 }}><span style={{ fontWeight: 600, color: "#0097a7" }}>Exams:</span> {deg.exams.join(", ")}</div>
              <div style={{ marginBottom: 10 }}><span style={{ fontWeight: 600, color: "#0097a7" }}>Higher Studies:</span> {deg.higherStudies.join(", ")}</div>
              <div style={{ marginBottom: 10 }}><span style={{ fontWeight: 600, color: "#0097a7" }}>Industries:</span> {deg.industries.join(", ")}</div>
            </div>
          ) : (
            <div
              key={idx}
              style={{
                border: "1px solid #a00",
                borderRadius: 16,
                padding: "2rem 1.5rem",
                width: 340,
                background: "#ffeaea",
                color: "#a00",
                boxShadow: "0 6px 32px rgba(0,0,0,0.10)"
              }}
            >
              <h2 style={{ marginBottom: 12, fontSize: "1.5rem", fontWeight: 600, color: "#ff4d4d" }}>Degree Not Found</h2>
              <div>This degree is not available in the data.</div>
            </div>
          )
        ))}
      </div>
      {comparisonSummary}

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

export default DegreeComparison;
