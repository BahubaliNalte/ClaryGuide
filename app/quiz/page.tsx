"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import Image from "next/image";


const quizSections = [
  {
    title: "Career Interest",
    questions: [
      {
        question: "What do you like to do in your free time?",
        options: [
          { text: "Experiment with gadgets/machines", value: "Engineering/Tech" },
          { text: "Help others and focus on their health", value: "Medicine" },
          { text: "Win debates and discussions", value: "Law/Politics" },
          { text: "Paint, write, or make music", value: "Arts/Design" },
        ],
      },
      {
        question: "Which subject do you enjoy the most?",
        options: [
          { text: "Maths/Physics", value: "Engineering/Tech" },
          { text: "Biology", value: "Medicine" },
          { text: "Business/Economics", value: "Law/Politics" },
          { text: "History/Literature", value: "Arts/Design" },
        ],
      },
      {
        question: "What would be your dream project?",
        options: [
          { text: "Building a robot or app", value: "Engineering/Tech" },
          { text: "Organizing a free health camp", value: "Medicine" },
          { text: "Joining a youth parliament", value: "Law/Politics" },
          { text: "Creating a movie or documentary", value: "Arts/Design" },
        ],
      },
      {
        question: "What is your ideal career location?",
        options: [
          { text: "Lab/Workshop", value: "Engineering/Tech" },
          { text: "Hospital/Clinic", value: "Medicine" },
          { text: "Courtroom/Office", value: "Law/Politics" },
          { text: "Studio/Stage", value: "Arts/Design" },
        ],
      },
      {
        question: "Whose achievements inspire you the most?",
        options: [
          { text: "Scientists/Engineers", value: "Engineering/Tech" },
          { text: "Doctors/Nurses", value: "Medicine" },
          { text: "Leaders/Lawyers", value: "Law/Politics" },
          { text: "Artists/Creators", value: "Arts/Design" },
        ],
      },
      {
        question: "What would be your greatest achievement?",
        options: [
          { text: "Getting a patent for an invention", value: "Engineering/Tech" },
          { text: "Saving someone’s life", value: "Medicine" },
          { text: "Winning a major case", value: "Law/Politics" },
          { text: "Creating an award-winning design", value: "Arts/Design" },
        ],
      },
      {
        question: "Which TV show or movie genre do you prefer?",
        options: [
          { text: "Sci-fi or tech thrillers", value: "Engineering/Tech" },
          { text: "Medical dramas", value: "Medicine" },
          { text: "Legal or political thrillers", value: "Law/Politics" },
          { text: "Art or creative documentaries", value: "Arts/Design" },
        ],
      },
      {
        question: "If you had to participate in a competition, which one would you choose?",
        options: [
          { text: "Coding hackathon", value: "Engineering/Tech" },
          { text: "Biology Olympiad", value: "Medicine" },
          { text: "Debate championship", value: "Law/Politics" },
          { text: "Art/Drama festival", value: "Arts/Design" },
        ],
      },
      {
        question: "What would be your dream contribution to society?",
        options: [
          { text: "Making life easier through technology", value: "Engineering/Tech" },
          { text: "Saving lives through health and medicine", value: "Medicine" },
          { text: "Delivering justice through law", value: "Law/Politics" },
          { text: "Inspiring people through art", value: "Arts/Design" },
        ],
      },
    ],
  },
  {
    title: "Career Personality",
    questions: [
      {
        question: "What is your strongest trait?",
        options: [
          { text: "Logical thinking", value: "Engineering/Tech" },
          { text: "Empathy", value: "Medicine" },
          { text: "Persuasiveness", value: "Law/Politics" },
          { text: "Creativity", value: "Arts/Design" },
        ],
      },
      {
        question: "What role do you usually take in group work?",
        options: [
          { text: "Problem solver", value: "Engineering/Tech" },
          { text: "Caretaker", value: "Medicine" },
          { text: "Leader", value: "Law/Politics" },
          { text: "Idea generator", value: "Arts/Design" },
        ],
      },
      {
        question: "How do you make decisions?",
        options: [
          { text: "Based on data and logic", value: "Engineering/Tech" },
          { text: "Considering emotions and needs", value: "Medicine" },
          { text: "Thinking about influence and power", value: "Law/Politics" },
          { text: "Following instinct and imagination", value: "Arts/Design" },
        ],
      },
      {
        question: "What type of challenges do you enjoy the most?",
        options: [
          { text: "Puzzles and technical problems", value: "Engineering/Tech" },
          { text: "Solving real human problems", value: "Medicine" },
          { text: "Negotiations and conflicts", value: "Law/Politics" },
          { text: "Abstract creative challenges", value: "Arts/Design" },
        ],
      },
      {
        question: "How would you describe your communication style?",
        options: [
          { text: "Direct and factual", value: "Engineering/Tech" },
          { text: "Warm and supportive", value: "Medicine" },
          { text: "Confident and authoritative", value: "Law/Politics" },
          { text: "Expressive and visual", value: "Arts/Design" },
        ],
      },
      {
        question: "How would you describe your leadership style?",
        options: [
          { text: "Analytical and planning-based", value: "Engineering/Tech" },
          { text: "Supportive and mentoring", value: "Medicine" },
          { text: "Charismatic and bold", value: "Law/Politics" },
          { text: "Visionary and experimental", value: "Arts/Design" },
        ],
      },
      {
        question: "If you had to learn a new skill, what would you choose?",
        options: [
          { text: "Coding/Robotics", value: "Engineering/Tech" },
          { text: "First Aid/CPR", value: "Medicine" },
          { text: "Public Speaking", value: "Law/Politics" },
          { text: "Filmmaking/Designing", value: "Arts/Design" },
        ],
      },
      {
        question: "What kind of people do you work best with?",
        options: [
          { text: "Detail-oriented and organized", value: "Engineering/Tech" },
          { text: "Caring and helpful", value: "Medicine" },
          { text: "Ambitious and competitive", value: "Law/Politics" },
          { text: "Fun and imaginative", value: "Arts/Design" },
        ],
      },
      {
        question: "What would be your idea of a 'perfect job'?",
        options: [
          { text: "Solving complex technical problems", value: "Engineering/Tech" },
          { text: "Helping and serving people", value: "Medicine" },
          { text: "Gaining power and recognition", value: "Law/Politics" },
          { text: "Creating art and ideas", value: "Arts/Design" },
        ],
      },
    ],
  },
  {
    title: "Career Motivator",
    questions: [
      {
        question: "What motivates you the most to work?",
        options: [
          { text: "Innovation and invention", value: "Engineering/Tech" },
          { text: "Helping others", value: "Medicine" },
          { text: "Fame and recognition", value: "Law/Politics" },
          { text: "Creativity and expression", value: "Arts/Design" },
        ],
      },
      {
        question: "What would be your biggest reward?",
        options: [
          { text: "A patent or invention", value: "Engineering/Tech" },
          { text: "Someone’s 'thank you'", value: "Medicine" },
          { text: "Public recognition or award", value: "Law/Politics" },
          { text: "Showcasing your art", value: "Arts/Design" },
        ],
      },
      {
        question: "If salary and stability were the same, what would you choose?",
        options: [
          { text: "Research lab", value: "Engineering/Tech" },
          { text: "NGO or hospital", value: "Medicine" },
          { text: "Parliament or corporate job", value: "Law/Politics" },
          { text: "Creative startup", value: "Arts/Design" },
        ],
      },
      {
        question: "Which environment pushes you to perform your best?",
        options: [
          { text: "Competitive and innovative", value: "Engineering/Tech" },
          { text: "Service-oriented", value: "Medicine" },
          { text: "Influential and power-driven", value: "Law/Politics" },
          { text: "Artistic and free", value: "Arts/Design" },
        ],
      },
      {
        question: "How do you measure success?",
        options: [
          { text: "Changing society through innovation", value: "Engineering/Tech" },
          { text: "Improving and saving lives", value: "Medicine" },
          { text: "Impact on the public", value: "Law/Politics" },
          { text: "Creating culture and inspiration", value: "Arts/Design" },
        ],
      },
      {
        question: "What is your biggest dream?",
        options: [
          { text: "Becoming a scientist/engineer", value: "Engineering/Tech" },
          { text: "Becoming a doctor/nurse", value: "Medicine" },
          { text: "Becoming a leader/business tycoon", value: "Law/Politics" },
          { text: "Becoming a famous artist/creator", value: "Arts/Design" },
        ],
      },
      {
        question: "What is your greatest fear?",
        options: [
          { text: "Being stuck without growth", value: "Engineering/Tech" },
          { text: "Not being able to help others", value: "Medicine" },
          { text: "Losing power", value: "Law/Politics" },
          { text: "Losing the chance to express creativity", value: "Arts/Design" },
        ],
      },
      {
        question: "Why would you leave a job?",
        options: [
          { text: "Lack of growth or innovation", value: "Engineering/Tech" },
          { text: "No impact on humanity", value: "Medicine" },
          { text: "Lack of authority", value: "Law/Politics" },
          { text: "Lack of creativity", value: "Arts/Design" },
        ],
      },
      {
        question: "What drives your motivation the most?",
        options: [
          { text: "Technology", value: "Engineering/Tech" },
          { text: "Humanity", value: "Medicine" },
          { text: "Leadership", value: "Law/Politics" },
          { text: "Creativity", value: "Arts/Design" },
        ],
      },
    ],
  },
  {
    title: "Learning Style",
    questions: [
      {
        question: "How do you prefer to learn?",
        options: [
          { text: "Practical labs and experiments", value: "Engineering/Tech" },
          { text: "Real-life observation", value: "Medicine" },
          { text: "Case studies and examples", value: "Law/Politics" },
          { text: "Visuals and creative tasks", value: "Arts/Design" },
        ],
      },
      {
        question: "How do you prepare for exams?",
        options: [
          { text: "Solving problems", value: "Engineering/Tech" },
          { text: "Making notes and diagrams", value: "Medicine" },
          { text: "Discussing concepts", value: "Law/Politics" },
          { text: "Using mind-maps and visual aids", value: "Arts/Design" },
        ],
      },
      {
        question: "What is the best classroom environment for you?",
        options: [
          { text: "Lab-based learning", value: "Engineering/Tech" },
          { text: "Interactive and supportive", value: "Medicine" },
          { text: "Debate and discussion heavy", value: "Law/Politics" },
          { text: "Creative and flexible", value: "Arts/Design" },
        ],
      },
      {
        question: "How do you learn fastest?",
        options: [
          { text: "Trial and error", value: "Engineering/Tech" },
          { text: "Observation and practice", value: "Medicine" },
          { text: "Discussions and explanations", value: "Law/Politics" },
          { text: "Visualization and imagination", value: "Arts/Design" },
        ],
      },
      {
        question: "Which activity do you enjoy the most?",
        options: [
          { text: "Coding challenges", value: "Engineering/Tech" },
          { text: "Biology experiments", value: "Medicine" },
          { text: "Business role-plays", value: "Law/Politics" },
          { text: "Theatre or drama workshops", value: "Arts/Design" },
        ],
      },
      {
        question: "What do you focus on the most while learning?",
        options: [
          { text: "Technical details", value: "Engineering/Tech" },
          { text: "Practical human needs", value: "Medicine" },
          { text: "Logical arguments", value: "Law/Politics" },
          { text: "Creative flow", value: "Arts/Design" },
        ],
      },
      {
        question: "What quality do you value most in a teacher?",
        options: [
          { text: "Clear and detailed explanations", value: "Engineering/Tech" },
          { text: "Caring and supportive nature", value: "Medicine" },
          { text: "Engaging and confident style", value: "Law/Politics" },
          { text: "Creative and experimental methods", value: "Arts/Design" },
        ],
      },
      {
        question: "How do you apply your knowledge?",
        options: [
          { text: "In projects and experiments", value: "Engineering/Tech" },
          { text: "In real-world service", value: "Medicine" },
          { text: "In discussions and decision-making", value: "Law/Politics" },
          { text: "In art and creative expression", value: "Arts/Design" },
        ],
      },
      {
        question: "What is your preferred learning method?",
        options: [
          { text: "Individual research", value: "Engineering/Tech" },
          { text: "Group study and helping others", value: "Medicine" },
          { text: "Debates and teamwork", value: "Law/Politics" },
          { text: "Creative freedom", value: "Arts/Design" },
        ],
      },
    ],
  },
  {
    title: "Scenarios",
    questions: [
      {
        question: "If you had to handle a disaster situation, what would you do?",
        options: [
          { text: "Design a technical solution", value: "Engineering/Tech" },
          { text: "Help injured people", value: "Medicine" },
          { text: "Coordinate with authorities", value: "Law/Politics" },
          { text: "Create awareness materials", value: "Arts/Design" },
        ],
      },
      {
        question: "If you join a startup, which role would you take?",
        options: [
          { text: "Tech developer", value: "Engineering/Tech" },
          { text: "Health advisor", value: "Medicine" },
          { text: "Business strategist", value: "Law/Politics" },
          { text: "Creative director", value: "Arts/Design" },
        ],
      },
      {
        question: "As a team leader, what would be your first priority?",
        options: [
          { text: "Technical clarity", value: "Engineering/Tech" },
          { text: "Team support and care", value: "Medicine" },
          { text: "Clear communication and influence", value: "Law/Politics" },
          { text: "Creative freedom", value: "Arts/Design" },
        ],
      },
      {
        question: "If you have to choose an internship, which one would you pick?",
        options: [
          { text: "R&D lab internship", value: "Engineering/Tech" },
          { text: "Hospital or NGO internship", value: "Medicine" },
          { text: "Corporate/law internship", value: "Law/Politics" },
          { text: "Media/design internship", value: "Arts/Design" },
        ],
      },
      {
        question: "For what achievement would you most likely receive an award?",
        options: [
          { text: "Invention or discovery", value: "Engineering/Tech" },
          { text: "Social service", value: "Medicine" },
          { text: "Leadership or influence", value: "Law/Politics" },
          { text: "Creative innovation", value: "Arts/Design" },
        ],
      },
      {
        question: "What would be your dream contribution to society?",
        options: [
          { text: "Simplifying life through technology", value: "Engineering/Tech" },
          { text: "Improving health and care", value: "Medicine" },
          { text: "Delivering justice and fairness", value: "Law/Politics" },
          { text: "Enriching culture and creativity", value: "Arts/Design" },
        ],
      },
      {
        question: "On a mission, what role would you take?",
        options: [
          { text: "Technical problem solver", value: "Engineering/Tech" },
          { text: "Human welfare in charge", value: "Medicine" },
          { text: "Strategy and leadership", value: "Law/Politics" },
          { text: "Media and communication", value: "Arts/Design" },
        ],
      },
      {
        question: "If you wrote a book about your life, what would the title be?",
        options: [
          { text: "'Innovator’s Journey'", value: "Engineering/Tech" },
          { text: "'Healer’s Touch'", value: "Medicine" },
          { text: "'Leader’s Path'", value: "Law/Politics" },
          { text: "'Creator’s Vision'", value: "Arts/Design" },
        ],
      },
      {
        question: "What is your biggest dream?",
        options: [
          { text: "Becoming a scientist/engineer", value: "Engineering/Tech" },
          { text: "Becoming a doctor/healer", value: "Medicine" },
          { text: "Becoming a politician/business leader", value: "Law/Politics" },
          { text: "Becoming an artist/filmmaker", value: "Arts/Design" },
        ],
      },
    ],
  },
];



const domainDescriptions: Record<string, string> = {
  "Engineering/Tech": "You are suited for technical, engineering, and technology careers. Consider B.Tech, BCA, B.Sc, and related degrees.",
  "Medicine": "You are suited for medical and healthcare careers. Consider MBBS, BDS, B.Pharm, Nursing, and related degrees.",
  "Law/Politics": "You are suited for law, politics, and business careers. Consider LLB, BBA, BA (Political Science), and related degrees.",
  "Arts/Design": "You are suited for creative, arts, and design careers. Consider BFA, BA (Fine Arts), BJMC, and related degrees.",
};

export default function QuizPage() {
  // Flat list of all questions for answer tracking
  const allQuestions = quizSections.flatMap((section) => section.questions);
  const [answers, setAnswers] = useState<string[]>(Array(allQuestions.length).fill(""));
  const [showResult, setShowResult] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Calculate global question index for a section/question
  const getGlobalIdx = (sectionIdx: number, questionIdx: number) => quizSections.slice(0, sectionIdx).reduce((acc, sec) => acc + sec.questions.length, 0) + questionIdx;

  // Check if all questions in current section are answered
  const isSectionComplete = () => {
    const startIdx = quizSections.slice(0, currentSection).reduce((acc, sec) => acc + sec.questions.length, 0);
    const endIdx = startIdx + quizSections[currentSection].questions.length;
    return answers.slice(startIdx, endIdx).every((ans) => ans);
  };

  const handleOption = (qIdx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleNextSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSection < quizSections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowResult(true);
    }
  };

  // Calculate recommended domain
  const getRecommendation = () => {
    const tally: Record<string, number> = {};
    answers.forEach((ans) => {
      tally[ans] = (tally[ans] || 0) + 1;
    });
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0][0] : "";
  };
  const recommendedDomain = getRecommendation();

  const [showInstructions, setShowInstructions] = useState(true);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fcfd] via-[#e3eaff] to-[#c1f2e7] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-[#2386ff] mb-6 text-center">Career Guidance Quiz</h2>
        {showInstructions ? (
          <div className="max-w-2xl mx-auto bg-white/80 rounded-2xl shadow-2xl p-8 mb-8 backdrop-blur-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-[#2386ff] mb-4 text-center">Quiz Instructions!</h3>
            <ul className="list-decimal list-inside text-[#1a3c6b] text-lg space-y-3 mb-6">
              <li><strong>Be Honest</strong> – Answer based on your true interests, skills, and preferences—not what you think is “right.”</li>
              <li><strong>No Right or Wrong Answers</strong> – This quiz is about discovering your strengths and potential paths, not testing your knowledge.</li>
              <li><strong>Stay Consistent</strong> – Try not to overthink; go with your first instinct.</li>
              <li><strong>Complete All Questions</strong> – Skipping questions may affect your results.</li>
              <li><strong>Confidential & Personalised</strong> – Your answers are private and used only to suggest career directions tailored to you.</li>
              <li><strong>Results = Guidance, Not Final Decision</strong> – The quiz will suggest career paths, but the final choice is yours.</li>
              <li>👉 Take your time, enjoy the process, and see what careers align with your personality and skills.</li>
            </ul>
            <div className="flex justify-center">
              <button
                className="bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-8 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200"
                onClick={() => setShowInstructions(false)}
              >
                Begin Quiz
              </button>
            </div>
          </div>
        ) : (
          !showResult ? (
            <form className="flex flex-col gap-8" onSubmit={handleNextSection}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#00bfae] mb-4">{quizSections[currentSection].title} <span className="text-base font-normal text-[#2386ff]">({quizSections[currentSection].questions.length} Qs)</span></h3>
                {quizSections[currentSection].questions.map((q, qIdx) => {
                  const globalIdx = getGlobalIdx(currentSection, qIdx);
                  return (
                    <div key={globalIdx} className="bg-white/80 rounded-2xl shadow-lg p-6 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold text-[#14304a] drop-shadow-sm">Q{globalIdx + 1}. {q.question}</span>
                        <span className="text-xs text-[#2386ff]">Section {currentSection + 1} of {quizSections.length}</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        {q.options.map((opt, oIdx) => (
                          <label key={oIdx} className={`flex items-center gap-2 text-base rounded-lg px-2 py-2 cursor-pointer border border-[#c1f2e7] ${answers[globalIdx] === opt.value ? "bg-[#e3eaff] font-bold text-[#14304a]" : "bg-white text-[#14304a] hover:bg-[#f6fcfd]"}`}>
                            <input
                              type="radio"
                              name={`q${globalIdx}`}
                              value={opt.value}
                              checked={answers[globalIdx] === opt.value}
                              onChange={() => handleOption(globalIdx, opt.value)}
                              required
                              className="accent-[#2386ff] w-4 h-4"
                            />
                            <span className="font-semibold text-[#14304a]">{opt.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mb-4">
                {(() => {
                  // Show cumulative progress for the current section
                  const total = quizSections.slice(0, currentSection + 1).reduce((acc, sec) => acc + sec.questions.length, 0);
                  const answered = answers.slice(0, total).filter(a => a).length;
                  return (
                    <span className="text-[#2386ff] font-semibold">Progress: {answered} / {total} answered</span>
                  );
                })()}
                <button type="submit" disabled={!isSectionComplete()} className={`bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-6 py-3 rounded-2xl shadow-lg text-lg hover:scale-105 transition-transform duration-200 ${!isSectionComplete() ? "opacity-50 cursor-not-allowed" : ""}`}>{currentSection < quizSections.length - 1 ? "Next Section" : "See My Career Recommendation"}</button>
              </div>
            </form>
          ) : (
            <div className="bg-white/80 rounded-2xl shadow-lg p-8 mt-8 text-center">
              <h3 className="text-2xl font-bold text-[#2386ff] mb-4">Recommended Career Domain</h3>
              <div className="text-xl text-[#1a3c6b] mb-2">{recommendedDomain}</div>
              <div className="text-[#1a3c6b] mb-4">{domainDescriptions[recommendedDomain]}</div>
              <h4 className="text-lg font-semibold text-[#2386ff] mb-2">Degree & Career Suggestions:</h4>
              <ul className="text-left text-[#1a3c6b] list-disc ml-6">
                {recommendedDomain === "Engineering/Tech" && (
                  <>
                    <li><strong>Popular Degrees:</strong> B.Tech, BCA, B.Sc (CS/IT), Diploma in Engineering</li>
                    <li><strong>Careers:</strong> Engineer, Software Developer, Data Scientist, Robotics, Researcher</li>
                    <li><strong>Exams:</strong> JEE, GATE, State CET, SSC, UPSC (Engineering Services)</li>
                    <li><strong>Industries:</strong> Technology, IT, Manufacturing, Research, Government</li>
                  </>
                )}
                {recommendedDomain === "Medicine" && (
                  <>
                    <li><strong>Popular Degrees:</strong> MBBS, BDS, B.Pharm, Nursing, B.Sc (Biology)</li>
                    <li><strong>Careers:</strong> Doctor, Nurse, Pharmacist, Medical Researcher, Therapist</li>
                    <li><strong>Exams:</strong> NEET, AIIMS, State CET, Nursing Entrance</li>
                    <li><strong>Industries:</strong> Healthcare, Hospitals, Pharma, Research, Government</li>
                  </>
                )}
                {recommendedDomain === "Law/Politics" && (
                  <>
                    <li><strong>Popular Degrees:</strong> LLB, BBA, BA (Political Science), B.Com</li>
                    <li><strong>Careers:</strong> Lawyer, Politician, Business Leader, Civil Services, Manager</li>
                    <li><strong>Exams:</strong> CLAT, UPSC, State PSC, CAT, SSC</li>
                    <li><strong>Industries:</strong> Law, Government, Business, Politics, NGOs</li>
                  </>
                )}
                {recommendedDomain === "Arts/Design" && (
                  <>
                    <li><strong>Popular Degrees:</strong> BFA, BA (Fine Arts), BJMC, B.Ed, BA (Literature)</li>
                    <li><strong>Careers:</strong> Artist, Designer, Writer, Teacher, Journalist, Filmmaker</li>
                    <li><strong>Exams:</strong> NID, NIFT, NET, TET, UPSC (Arts subjects)</li>
                    <li><strong>Industries:</strong> Media, Education, Design, Arts, Entertainment</li>
                  </>
                )}
              </ul>
              <button onClick={() => { setShowResult(false); setCurrentSection(0); setAnswers(Array(allQuestions.length).fill("")); setShowInstructions(true); }} className="mt-6 bg-[#2386ff] text-white px-4 py-2 rounded-2xl">Retake Quiz</button>
            </div>
          )
        )}
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
