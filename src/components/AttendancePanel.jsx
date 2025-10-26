import { useEffect, useState } from 'react';
import { CheckCircle2, ListChecks } from 'lucide-react';

export default function AttendancePanel({ apiBase, user }) {
  const [recent, setRecent] = useState([]);
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState({ roll: '', status: 'present' });
  const [override, setOverride] = useState({ roll: '', manual_percentage: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canMark = user?.role === 'teacher' || user?.role === 'admin';

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [r1, r2] = await Promise.all([
        fetch(`${apiBase}/attendance/recent`),
        fetch(`${apiBase}/attendance/summary`),
      ]);
      if (r1.ok) {
        const a = await r1.json();
        setRecent(Array.isArray(a) ? a : a?.items || []);
      }
      if (r2.ok) setSummary(await r2.json());
    } catch (e) {
      setError(e.message || 'Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBase]);

  const markAttendance = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { roll: form.roll, status: form.status, marked_by_role: user?.role };
      const res = await fetch(`${apiBase}/attendance/mark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to mark attendance');
      setForm({ roll: '', status: 'present' });
      loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const setManual = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { roll: override.roll, manual_percentage: Number(override.manual_percentage) };
      const res = await fetch(`${apiBase}/attendance/manual-percentage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to set manual percentage');
      setOverride({ roll: '', manual_percentage: '' });
      loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3 rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold">Recent Attendance</h3>
          <button onClick={loadAll} className="text-sm text-indigo-700 hover:underline">Refresh</button>
        </div>
        {loading ? (
          <div className="p-6 text-slate-500">Loading…</div>
        ) : error ? (
          <div className="p-6 text-red-600 text-sm">{error}</div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {recent.length === 0 && <li className="p-6 text-sm text-slate-500">No records found.</li>}
            {recent.map((r, idx) => (
              <li key={r._id || idx} className="p-5 flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.roll} • {r.status}</div>
                  <div className="text-sm text-slate-600">{r.attendance_date} {r.marked_by_role ? `• by ${r.marked_by_role}` : ''}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="md:col-span-2 space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-indigo-600"/>
            <h3 className="font-semibold">Mark Attendance</h3>
          </div>
          {!canMark ? (
            <p className="text-sm text-slate-600">Only teachers and admins can mark attendance.</p>
          ) : (
            <form onSubmit={markAttendance} className="grid gap-3">
              <input value={form.roll} onChange={(e)=>setForm(v=>({...v, roll:e.target.value}))} className="rounded-md border border-slate-300 px-3 py-2" placeholder="Roll (e.g., 22CS001)" required />
              <select value={form.status} onChange={(e)=>setForm(v=>({...v, status:e.target.value}))} className="rounded-md border border-slate-300 px-3 py-2">
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700">Mark</button>
            </form>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <ListChecks className="h-5 w-5 text-indigo-600"/>
            <h3 className="font-semibold">Manual Percentage</h3>
          </div>
          <form onSubmit={setManual} className="grid gap-3">
            <input value={override.roll} onChange={(e)=>setOverride(v=>({...v, roll:e.target.value}))} className="rounded-md border border-slate-300 px-3 py-2" placeholder="Roll" required />
            <input type="number" min="0" max="100" step="0.1" value={override.manual_percentage} onChange={(e)=>setOverride(v=>({...v, manual_percentage:e.target.value}))} className="rounded-md border border-slate-300 px-3 py-2" placeholder="Percentage" required />
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700">Update</button>
          </form>
          {summary && (
            <div className="mt-4 text-sm text-slate-600">
              <div className="font-medium mb-1">Summary</div>
              <pre className="text-xs whitespace-pre-wrap bg-slate-50 p-2 rounded border border-slate-200">{JSON.stringify(summary, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
