import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, CalendarDays } from 'lucide-react';

// Demo attendance data for recent classes
const SAMPLE = [
  { date: '2025-01-10', subject: 'Data Structures', status: 'Present' },
  { date: '2025-01-11', subject: 'Discrete Math', status: 'Absent' },
  { date: '2025-01-12', subject: 'Operating Systems', status: 'Present' },
  { date: '2025-01-13', subject: 'DBMS', status: 'Present' },
  { date: '2025-01-14', subject: 'Computer Networks', status: 'Present' },
];

export default function AttendanceTracker({ dashboard }) {
  const [range, setRange] = useState('week');

  const stats = useMemo(() => {
    const total = SAMPLE.length;
    const present = SAMPLE.filter((r) => r.status === 'Present').length;
    const absent = total - present;
    const percent = total ? Math.round((present / total) * 100) : 0;
    return { total, present, absent, percent };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Attendance Tracker</h2>
          <p className="text-sm text-slate-600 mt-1">
            {dashboard === 'teacher'
              ? 'Monitor class attendance trends and recent sessions.'
              : 'Stay on top of your attendance and recent sessions.'}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
          {['week', 'month', 'semester'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs rounded-md capitalize ${
                range === r ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Overall" value={`${stats.percent}%`} icon={CalendarDays} color="bg-indigo-50 text-indigo-700 border-indigo-100" />
        <StatCard label="Present" value={stats.present} icon={CheckCircle2} color="bg-emerald-50 text-emerald-700 border-emerald-100" />
        <StatCard label="Absent" value={stats.absent} icon={XCircle} color="bg-rose-50 text-rose-700 border-rose-100" />
        <StatCard label="Sessions" value={stats.total} icon={CalendarDays} color="bg-slate-50 text-slate-700 border-slate-200" />
      </div>

      <div className="mt-5 border border-slate-200 rounded-xl bg-white overflow-hidden">
        <div className="grid grid-cols-3 gap-0 text-xs font-medium text-slate-500 bg-slate-50 px-4 py-2">
          <div>Date</div>
          <div>Subject</div>
          <div>Status</div>
        </div>
        <ul>
          {SAMPLE.map((row) => (
            <li key={`${row.date}-${row.subject}`} className="grid grid-cols-3 px-4 py-3 border-t border-slate-100 text-sm">
              <div className="text-slate-700">{row.date}</div>
              <div className="text-slate-800 font-medium">{row.subject}</div>
              <div>
                {row.status === 'Present' ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md text-xs">
                    <CheckCircle2 size={14} /> Present
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-rose-700 bg-rose-50 border border-rose-100 px-2 py-1 rounded-md text-xs">
                    <XCircle size={14} /> Absent
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className={`border rounded-xl p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-600">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg bg-white/70 grid place-items-center border border-white/60">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}
