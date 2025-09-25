"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

const questions = [
  {
    question: "Which activity do you enjoy most?",
    options: [
      { text: "Solving math problems", value: "Science" },
      { text: "Reading literature or writing", value: "Arts" },
      { text: "Managing money or business", value: "Commerce" },
      { text: "Learning practical skills", value: "Vocational" },
    ],
  },
  {
    question: "Which subject do you find easiest?",
    options: [
      { text: "Biology, Physics, Chemistry", value: "Science" },
      { text: "History, Languages, Social Studies", value: "Arts" },
      { text: "Economics, Accountancy", value: "Commerce" },
      { text: "Technical drawing, IT, crafts", value: "Vocational" },
    ],
  },
  {
    question: "What is your preferred way of learning?",
    options: [
      { text: "Experiments and research", value: "Science" },
      { text: "Discussion and creativity", value: "Arts" },
      { text: "Case studies and analysis", value: "Commerce" },
      { text: "Hands-on practice", value: "Vocational" },
    ],
  },
  {
    question: "Which career appeals to you most?",
    options: [
      { text: "Engineer, Doctor, Scientist", value: "Science" },
      { text: "Artist, Teacher, Journalist", value: "Arts" },
      { text: "Accountant, Banker, Entrepreneur", value: "Commerce" },
      { text: "Technician, IT Specialist, Designer", value: "Vocational" },
    ],
  },
  {
    question: "How do you prefer to solve problems?",
    options: [
      { text: "Analyze data and run experiments", value: "Science" },
      { text: "Think creatively and express ideas", value: "Arts" },
      { text: "Use logic and financial reasoning", value: "Commerce" },
      { text: "Apply practical solutions", value: "Vocational" },
    ],
  },
  {
    question: "Which personality trait describes you best?",
    options: [
      { text: "Curious and analytical", value: "Science" },
      { text: "Imaginative and expressive", value: "Arts" },
      { text: "Organized and business-minded", value: "Commerce" },
      { text: "Practical and hands-on", value: "Vocational" },
    ],
  },
  {
    question: "What motivates you most in studies?",
    options: [
      { text: "Discovering new things", value: "Science" },
      { text: "Creating and sharing knowledge", value: "Arts" },
      { text: "Achieving financial success", value: "Commerce" },
      { text: "Learning useful skills", value: "Vocational" },
    ],
  },
  {
    question: "Which extracurricular activity do you prefer?",
    options: [
      { text: "Science club, Olympiads", value: "Science" },
      { text: "Drama, debate, art", value: "Arts" },
      { text: "Business competitions", value: "Commerce" },
      { text: "Robotics, IT club, crafts", value: "Vocational" },
    ],
  },
];

const streamDescriptions: Record<string, string> = {
  Science: "Best for students interested in research, technology, medicine, and engineering.",
  Arts: "Ideal for creative, communicative, and analytical minds interested in humanities, languages, and social sciences.",
  Commerce: "Great for those interested in business, finance, economics, and entrepreneurship.",
  Vocational: "Perfect for practical learners who want skill-based careers in IT, design, or technical fields.",
};

export default function QuizPage() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (qIdx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  // Calculate recommended stream
  const getRecommendation = () => {
    const tally: Record<string, number> = {};
    answers.forEach((ans) => {
      tally[ans] = (tally[ans] || 0) + 1;
    });
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0][0] : "";
  };

  const recommendedStream = getRecommendation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-[#2386ff] mb-6 text-center">Aptitude & Interest Quiz</h2>
        {!showResult ? (
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {questions.map((q, idx) => (
              <div key={idx} className="bg-white/80 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-[#1a3c6b] mb-4">{q.question}</h3>
                <div className="flex flex-col gap-3">
                  {q.options.map((opt, oIdx) => (
                    <label key={oIdx} className="flex items-center gap-2 text-lg text-[#1a3c6b]">
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={opt.value}
                        checked={answers[idx] === opt.value}
                        onChange={() => handleOption(idx, opt.value)}
                        required
                      />
                      {opt.text}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200">See My Recommendation</button>
          </form>
        ) : (
          <div className="bg-white/80 rounded-2xl shadow-lg p-8 mt-8 text-center">
            <h3 className="text-2xl font-bold text-[#2386ff] mb-4">Recommended Stream</h3>
            <div className="text-xl text-[#1a3c6b] mb-2">{recommendedStream}</div>
            <div className="text-[#1a3c6b] mb-4">{streamDescriptions[recommendedStream]}</div>
            <h4 className="text-lg font-semibold text-[#2386ff] mb-2">Career Path Details:</h4>
            <ul className="text-left text-[#1a3c6b] list-disc ml-6">
              {recommendedStream === "Science" && (
                <>
                  <li><strong>Popular Degrees:</strong> B.Sc., B.Tech, MBBS, B.Pharm, BCA</li>
                  <li><strong>Careers:</strong> Engineer, Doctor, Scientist, Pharmacist, IT Professional, Researcher</li>
                  <li><strong>Government Exams:</strong> NEET, JEE, UPSC, GATE, SSC, State PSC</li>
                  <li><strong>Higher Studies:</strong> M.Sc., M.Tech, MD, PhD, MCA</li>
                  <li><strong>Industries:</strong> Healthcare, Technology, Research, Education, Government</li>
                </>
              )}
              {recommendedStream === "Arts" && (
                <>
                  <li><strong>Popular Degrees:</strong> B.A., BFA, B.Ed, LLB, BJMC</li>
                  <li><strong>Careers:</strong> Teacher, Journalist, Civil Services, Writer, Lawyer, Social Worker</li>
                  <li><strong>Government Exams:</strong> UPSC, NET, SSC, State PSC, TET</li>
                  <li><strong>Higher Studies:</strong> M.A., MFA, M.Ed, PhD, LLM</li>
                  <li><strong>Industries:</strong> Media, Education, Government, Law, NGOs</li>
                </>
              )}
              {recommendedStream === "Commerce" && (
                <>
                  <li><strong>Popular Degrees:</strong> B.Com, BBA, CA, CS, CFA</li>
                  <li><strong>Careers:</strong> Accountant, Banker, Entrepreneur, CA, Financial Analyst, Business Manager</li>
                  <li><strong>Government Exams:</strong> CA, IBPS, SSC, RBI, State PSC</li>
                  <li><strong>Higher Studies:</strong> M.Com, MBA, CFA, MFC</li>
                  <li><strong>Industries:</strong> Banking, Finance, Business, Government, Startups</li>
                </>
              )}
              {recommendedStream === "Vocational" && (
                <>
                  <li><strong>Popular Degrees:</strong> Diploma, B.Voc, ITI, Certification Courses</li>
                  <li><strong>Careers:</strong> Technician, IT Specialist, Designer, Skilled Trades, Digital Marketer</li>
                  <li><strong>Government Exams:</strong> ITI, Polytechnic, Skill India, SSC</li>
                  <li><strong>Higher Studies:</strong> Advanced Diplomas, B.Voc, Specialized Certifications</li>
                  <li><strong>Industries:</strong> IT, Design, Manufacturing, Services, Freelancing</li>
                </>
              )}
            </ul>
            <button onClick={() => setShowResult(false)} className="mt-6 bg-[#2386ff] text-white px-4 py-2 rounded-2xl">Retake Quiz</button>
          </div>
        )}
      </main>
    </div>
  );
}
