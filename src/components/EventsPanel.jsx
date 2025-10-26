import { useEffect, useMemo, useState } from 'react';
import { CalendarPlus, Loader2 } from 'lucide-react';

export default function EventsPanel({ apiBase, user }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '' });
  const [error, setError] = useState('');

  const canCreate = useMemo(() => user?.role === 'admin' || user?.role === 'teacher', [user]);

  const loadEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiBase}/events`);
      if (!res.ok) throw new Error('Failed to load events');
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : data?.items || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBase]);

  const createEvent = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        title: form.title,
        description: form.description,
        date: form.date,
        location: form.location,
        created_by_role: user?.role,
      };
      const res = await fetch(`${apiBase}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create event');
      setForm({ title: '', description: '', date: '', location: '' });
      loadEvents();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3 rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold">Events</h3>
          <button onClick={loadEvents} className="text-sm text-indigo-700 hover:underline">Refresh</button>
        </div>
        {loading ? (
          <div className="p-6 text-slate-500 flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Loading…</div>
        ) : error ? (
          <div className="p-6 text-red-600 text-sm">{error}</div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {events.length === 0 && <li className="p-6 text-sm text-slate-500">No events yet.</li>}
            {events.map((ev) => (
              <li key={ev._id || ev.id || ev.title + ev.date} className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{ev.title}</div>
                    <div className="text-sm text-slate-600">{ev.description}</div>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <div>{ev.location}</div>
                    <div>{ev.date}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="md:col-span-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-3">
            <CalendarPlus className="h-5 w-5 text-indigo-600"/>
            <h3 className="font-semibold">Create Event</h3>
          </div>
          {!canCreate ? (
            <p className="text-sm text-slate-600">Only teachers and admins can create events.</p>
          ) : (
            <form onSubmit={createEvent} className="grid gap-3">
              <input value={form.title} onChange={(e)=>setForm(v=>({...v,title:e.target.value}))} className="rounded-md border border-slate-300 px-3 py-2" placeholder="Title" required />
              <textarea value={form.description} onChange={(e)=>setForm(v=>({...v,description:e.target.value}))} className="rounded-md border border-slate-300 px-3 py-2" placeholder="Description" rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.date} onChange={(e)=>setForm(v=>({...v,date:e.target.value}))} className="rounded-md border border-slate-300 px-3 py-2" required />
                <input value={form.location} onChange={(e)=>setForm(v=>({...v,location:e.target.value}))} className="rounded-md border border-slate-300 px-3 py-2" placeholder="Location" />
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700">Create</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
