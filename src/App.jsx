import { useState } from 'react';
import Header from './components/Header';
import DashboardTabs from './components/DashboardTabs';
import ResultsLookupModal from './components/ResultsLookupModal';
import TimetableWizard from './components/TimetableWizard';

export default function App() {
  const [dashboard, setDashboard] = useState('student'); // 'student' | 'teacher'
  const [resultsOpen, setResultsOpen] = useState(false);
  const [timetableOpen, setTimetableOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 font-inter">
      <Header dashboard={dashboard} onSwitch={setDashboard} />

      <main>
        <Hero dashboard={dashboard} />
        <DashboardTabs
          dashboard={dashboard}
          onOpenResults={() => setResultsOpen(true)}
          onOpenTimetable={() => setTimetableOpen(true)}
        />
      </main>

      <ResultsLookupModal dashboard={dashboard} open={resultsOpen} onClose={() => setResultsOpen(false)} />
      <TimetableWizard dashboard={dashboard} open={timetableOpen} onClose={() => setTimetableOpen(false)} />
    </div>
  );
}

function Hero({ dashboard }) {
  return (
    <section className="relative">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="size-[720px] bg-indigo-200/40 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/4" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 size-56 rounded-full bg-indigo-100" aria-hidden />
          <div className="absolute -right-24 top-20 size-24 rounded-full bg-emerald-100" aria-hidden />

          <div className="relative z-10">
            <p className="text-xs tracking-wider uppercase text-indigo-700 font-semibold">{dashboard === 'teacher' ? 'Teacher Dashboard' : 'Student Dashboard'}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">
              {dashboard === 'teacher'
                ? 'Manage classes, upload timetables, and enter results.'
                : 'Check results and view timetables effortlessly.'}
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl">
              {dashboard === 'teacher'
                ? 'Use Timetable Management to upload files after choosing branch and section. Enter or look up results from the Results panel.'
                : 'Use Results to look up by roll number and Timetable to browse by branch and section.'}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm">
              {dashboard === 'teacher' ? 'Timetable & Results tools' : 'Results & Timetable access'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
