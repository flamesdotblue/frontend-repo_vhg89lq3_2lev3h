import { useState } from 'react';
import { X, Search, Award, BookOpen, TrendingUp } from 'lucide-react';

const SUBJECTS = [
  { name: 'Data Structures', credits: 4, grade: 'A', score: 88 },
  { name: 'Discrete Math', credits: 3, grade: 'B+', score: 78 },
  { name: 'Operating Systems', credits: 4, grade: 'A+', score: 93 },
  { name: 'DBMS', credits: 3, grade: 'A', score: 86 },
  { name: 'Computer Networks', credits: 3, grade: 84 >= 90 ? 'A+' : 'A', score: 84 },
];

function computeGPA(list) {
  const map = { 'A+': 10, A: 9, 'B+': 8, B: 7, C: 6 };
  let pts = 0;
  let cr = 0;
  for (const s of list) {
    pts += (map[s.grade] || 0) * s.credits;
    cr += s.credits;
  }
  return cr ? (pts / cr).toFixed(2) : '0.00';
}

export default function ResultsLookupModal({ open, onClose }) {
  const [roll, setRoll] = useState('');
  const [queried, setQueried] = useState(false);

  if (!open) return null;

  const gpa = computeGPA(SUBJECTS);
  const best = SUBJECTS.reduce((a, b) => (a.score > b.score ? a : b));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="text-base font-semibold">Check Results</h3>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100"><X size={16} /></button>
        </div>

        <div className="px-5 py-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={roll}
                onChange={(e) => setRoll(e.target.value.toUpperCase())}
                placeholder="Enter roll number (e.g., 21KH1A05XX)"
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => setQueried(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium"
            >
              Search
            </button>
          </div>

          {!queried ? (
            <p className="text-sm text-slate-600 mt-3">Enter your roll number to view semester-wise results.</p>
          ) : (
            <div className="mt-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <InfoCard title="GPA" value={gpa} icon={TrendingUp} color="bg-indigo-50 text-indigo-700 border-indigo-100" />
                <InfoCard title="Top Subject" value={best.name} icon={Award} color="bg-emerald-50 text-emerald-700 border-emerald-100" />
                <InfoCard title="Credits" value={SUBJECTS.reduce((n, s) => n + s.credits, 0)} icon={BookOpen} color="bg-slate-50 text-slate-700 border-slate-200" />
              </div>

              <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-4 gap-0 text-xs font-medium text-slate-500 bg-slate-50 px-4 py-2">
                  <div>Subject</div>
                  <div>Credits</div>
                  <div>Grade</div>
                  <div>Score</div>
                </div>
                <ul className="bg-white">
                  {SUBJECTS.map((s) => (
                    <li key={s.name} className="grid grid-cols-4 px-4 py-3 border-t border-slate-100 text-sm">
                      <div className="text-slate-800 font-medium">{s.name}</div>
                      <div className="text-slate-700">{s.credits}</div>
                      <div>
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs border bg-white text-slate-700 border-slate-200">{s.grade}</span>
                      </div>
                      <div className="text-slate-900 font-semibold">{s.score}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-slate-500 mt-2">Showing demo data for <span className="font-medium">{roll || '—'}</span>.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`border rounded-xl p-3 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-600">{title}</p>
          <p className="text-lg font-semibold mt-1">{value}</p>
        </div>
        <div className="h-8 w-8 rounded-lg bg-white/70 grid place-items-center border border-white/60">
          <Icon size={16} />
        </div>
      </div>
    </div>
  );
}
