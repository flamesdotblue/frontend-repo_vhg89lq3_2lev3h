import { Award, TrendingUp, BookOpen } from 'lucide-react';

const SUBJECTS = [
  { name: 'Data Structures', credits: 4, grade: 'A', score: 88 },
  { name: 'Discrete Math', credits: 3, grade: 'B+', score: 78 },
  { name: 'Operating Systems', credits: 4, grade: 'A+', score: 93 },
  { name: 'DBMS', credits: 3, grade: 'A', score: 86 },
  { name: 'Computer Networks', credits: 3, grade: 'A', score: 84 },
];

function computeGPA() {
  const map = { 'A+': 10, A: 9, 'B+': 8, B: 7, C: 6 };
  let pts = 0;
  let cr = 0;
  for (const s of SUBJECTS) {
    pts += (map[s.grade] || 0) * s.credits;
    cr += s.credits;
  }
  return cr ? (pts / cr).toFixed(2) : '0.00';
}

export default function ResultsOverview({ dashboard }) {
  const gpa = computeGPA();
  const best = SUBJECTS.reduce((a, b) => (a.score > b.score ? a : b));

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Results & Performance</h2>
          <p className="text-sm text-slate-600 mt-1">
            {dashboard === 'teacher'
              ? 'Overview of class results and top-performing subjects.'
              : 'Your grades, GPA, and top-performing subjects.'}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard title="Current GPA" value={gpa} icon={TrendingUp} color="bg-indigo-50 text-indigo-700 border-indigo-100" />
        <InfoCard title="Top Subject" value={best.name} icon={Award} color="bg-emerald-50 text-emerald-700 border-emerald-100" />
        <InfoCard title="Credits" value={SUBJECTS.reduce((n, s) => n + s.credits, 0)} icon={BookOpen} color="bg-slate-50 text-slate-700 border-slate-200" />
      </div>

      <div className="mt-5 border border-slate-200 rounded-xl bg-white overflow-hidden">
        <div className="grid grid-cols-4 gap-0 text-xs font-medium text-slate-500 bg-slate-50 px-4 py-2">
          <div>Subject</div>
          <div>Credits</div>
          <div>Grade</div>
          <div>Score</div>
        </div>
        <ul>
          {SUBJECTS.map((s) => (
            <li key={s.name} className="grid grid-cols-4 px-4 py-3 border-t border-slate-100 text-sm">
              <div className="text-slate-800 font-medium">{s.name}</div>
              <div className="text-slate-700">{s.credits}</div>
              <div>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs border bg-white text-slate-700 border-slate-200">
                  {s.grade}
                </span>
              </div>
              <div className="text-slate-900 font-semibold">{s.score}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function InfoCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`border rounded-xl p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg bg-white/70 grid place-items-center border border-white/60">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}
