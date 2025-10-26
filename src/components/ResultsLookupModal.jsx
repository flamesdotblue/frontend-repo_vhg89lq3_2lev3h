import { useMemo, useState } from 'react';
import { X, Search, Award, BookOpen, TrendingUp, PlusCircle } from 'lucide-react';

const DEMO_SUBJECTS = [
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

export default function ResultsLookupModal({ open, onClose, dashboard }) {
  const [roll, setRoll] = useState('');
  const [queried, setQueried] = useState(false);
  const [entries, setEntries] = useState([]);
  const [mode, setMode] = useState('lookup'); // 'lookup' | 'enter' (teachers only)

  const list = useMemo(() => (queried || mode === 'enter' ? DEMO_SUBJECTS : []), [queried, mode]);
  const gpa = computeGPA(list);
  const best = list.length ? list.reduce((a, b) => (a.score > b.score ? a : b)) : null;

  if (!open) return null;

  const addEntry = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newItem = {
      name: form.get('subject'),
      credits: Number(form.get('credits')) || 0,
      grade: String(form.get('grade') || ''),
      score: Number(form.get('score')) || 0,
    };
    if (!newItem.name) return;
    setEntries((prev) => [...prev, newItem]);
    e.currentTarget.reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-semibold">{dashboard === 'teacher' && mode === 'enter' ? 'Enter Results' : 'Check Results'}</h3>
            {dashboard === 'teacher' && (
              <div className="mt-1 inline-flex rounded-lg border border-slate-200 p-0.5 text-xs">
                <button
                  className={`px-2 py-1 rounded-md ${mode === 'lookup' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                  onClick={() => setMode('lookup')}
                >Lookup</button>
                <button
                  className={`px-2 py-1 rounded-md ${mode === 'enter' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                  onClick={() => setMode('enter')}
                >Enter</button>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100"><X size={16} /></button>
        </div>

        <div className="px-5 py-4">
          {mode === 'lookup' && (
            <div>
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
                <p className="text-sm text-slate-600 mt-3">Enter a roll number to view semester-wise results.</p>
              ) : (
                <ResultsBlock subjects={list} gpa={gpa} best={best} roll={roll} />
              )}
            </div>
          )}

          {mode === 'enter' && dashboard === 'teacher' && (
            <div>
              <p className="text-sm text-slate-600">Add subjects and marks for a student. This is a demo; data is not saved to a server.</p>
              <form onSubmit={addEntry} className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-2">
                <input name="subject" placeholder="Subject" className="md:col-span-2 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input name="credits" type="number" min="0" placeholder="Credits" className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input name="grade" placeholder="Grade" className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <div className="flex gap-2">
                  <input name="score" type="number" min="0" max="100" placeholder="Score" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <button className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm"><PlusCircle size={16}/> Add</button>
                </div>
              </form>

              <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-4 gap-0 text-xs font-medium text-slate-500 bg-slate-50 px-4 py-2">
                  <div>Subject</div>
                  <div>Credits</div>
                  <div>Grade</div>
                  <div>Score</div>
                </div>
                <ul className="bg-white">
                  {(entries.length ? entries : DEMO_SUBJECTS).map((s) => (
                    <li key={`${s.name}-${s.score}`} className="grid grid-cols-4 px-4 py-3 border-t border-slate-100 text-sm">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                <InfoCard title="GPA" value={computeGPA(entries.length ? entries : DEMO_SUBJECTS)} icon={TrendingUp} color="bg-indigo-50 text-indigo-700 border-indigo-100" />
                <InfoCard title="Top Subject" value={(entries.length ? entries : DEMO_SUBJECTS).reduce((a,b)=> (a.score>b.score?a:b)).name} icon={Award} color="bg-emerald-50 text-emerald-700 border-emerald-100" />
                <InfoCard title="Credits" value={(entries.length ? entries : DEMO_SUBJECTS).reduce((n, s) => n + s.credits, 0)} icon={BookOpen} color="bg-slate-50 text-slate-700 border-slate-200" />
              </div>

              <p className="text-xs text-slate-500 mt-2">Demo only. Use the backend integration to persist these results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultsBlock({ subjects, gpa, best, roll }) {
  if (!subjects.length) return null;
  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <InfoCard title="GPA" value={gpa} icon={TrendingUp} color="bg-indigo-50 text-indigo-700 border-indigo-100" />
        {best && <InfoCard title="Top Subject" value={best.name} icon={Award} color="bg-emerald-50 text-emerald-700 border-emerald-100" />}
        <InfoCard title="Credits" value={subjects.reduce((n, s) => n + s.credits, 0)} icon={BookOpen} color="bg-slate-50 text-slate-700 border-slate-200" />
      </div>

      <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-4 gap-0 text-xs font-medium text-slate-500 bg-slate-50 px-4 py-2">
          <div>Subject</div>
          <div>Credits</div>
          <div>Grade</div>
          <div>Score</div>
        </div>
        <ul className="bg-white">
          {subjects.map((s) => (
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
