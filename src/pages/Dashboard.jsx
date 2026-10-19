import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Users, 
  ChevronDown, 
  Vote, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function Homepage() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const candidates = [
    { name: "Vikash Kumar", tower: "F Tower", focus: "Operations & Infrastructure" },
    { name: "Sachin Bhatia", tower: "C2 Tower", focus: "Finance & Audit Governance" },
    { name: "Ankit Gupta", tower: "C1 Tower", focus: "Security & Facility Management" },
    { name: "Krishn Kant Sinha", tower: "A2 Tower", focus: "Resident Welfare & Communications" },
    { name: "Shashikant Verma", tower: "F Tower", focus: "Legal & Administrative Strategy" },
  ];

  const manifestoPoints = [
    {
      title: "1. Financial Transparency & Independent Audit",
      content: "Complete disclosure of income, operational expenses, and vendor contracts. We commit to a fresh, independent audit of historical accounts to clear past disputes and publish quarterly financial updates online."
    },
    {
      title: "2. Lift Maintenance & Safety First",
      content: "Immediate priority overhauling of high-use lifts, full transparency on AMC logs, fixed SLA response times for breakdowns, and zero compromises on resident safety."
    },
    {
      title: "3. Enhanced Security & Estate Maintenance",
      content: "Modernized digital gate access, regular CCTV audits, improved basement lighting, systematic waste management, and dedicated care for society green belts."
    },
    {
      title: "4. Mandir & Community Fund Management",
      content: "Clear separation and dedicated public ledgers for Mandir contributions and community cultural events to ensure complete resident trust."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vote className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
              Team Voice of Livingston
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition">About Us</a>
            <a href="#candidates" className="hover:text-blue-600 transition">Our Panel</a>
            <a href="#manifesto" className="hover:text-blue-600 transition">Manifesto</a>
            <a href="#updates" className="hover:text-blue-600 transition">Election Updates</a>
          </nav>
          <a
            href="https://chat.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Join WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Supertech Livingston AOA Elections
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Together for a Better, Transparent, and Safe Livingston
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-light">
            Fresh Vision • Full Financial Accountability • Community First
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#manifesto"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition"
            >
              Read Our Manifesto
            </a>
            <a
              href="#candidates"
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-6 py-3.5 rounded-lg font-semibold transition"
            >
              Meet Our Panel
            </a>
          </div>
        </div>
      </section>

      {/* Core Value Pillars */}
      <section id="about" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why Choose Team Voice of Livingston?</h2>
          <p className="text-slate-600 mt-2">Built on integrity, transparency, and actionable solutions for all residents.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Financial Transparency</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Complete disclosure of expenses, vendor contracts, and quarterly public updates. Zero hidden transactions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Upkeep & Safety</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Priority repairs for lifts, strict gate access, clean basements, and swift resolution of maintenance issues.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Resident Inclusion</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Open communications, regular open-floor sessions, and fair democratic decision-making for every tower.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Panel Section */}
      <section id="candidates" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Meet Our Panel</h2>
            <p className="text-slate-600 mt-2">Dedicated residents committed to serving Supertech Livingston.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition">
                <div className="w-20 h-20 mx-auto bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-xl font-bold mb-4">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{candidate.name}</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 mb-3">
                  {candidate.tower}
                </span>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Focus Area</p>
                <p className="text-sm text-slate-700 font-medium mt-0.5">{candidate.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Accordion Section */}
      <section id="manifesto" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Our Manifesto & Key Commitments</h2>
          <p className="text-slate-600 mt-2">Clear goals and zero false promises.</p>
        </div>
        <div className="space-y-4">
          {manifestoPoints.map((item, index) => (
            <div key={index} className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                <span>{item.title}</span>
                <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${openAccordion === index ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === index && (
                <div className="p-5 pt-0 text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Election Updates & Guidelines */}
      <section id="updates" className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold">Election Notice & Guidelines</h2>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-100">Voter Eligibility</h4>
                <p className="text-slate-300 text-sm mt-1">
                  Ensure your flat maintenance dues are clear and valid government ID proof along with flat ownership details are available for smooth voting.
                </p>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-4 flex flex-col sm:flex-row justify-between text-sm text-slate-400">
              <span><strong>Status:</strong> Awaiting Official Election Committee Announcement</span>
              <span><strong>Location:</strong> Society Club House</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Team Voice of Livingston (Team Uday). For internal community awareness.</p>
        </div>
      </footer>
    </div>
  );
}