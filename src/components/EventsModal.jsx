import { useState } from 'react';
import { X, CalendarDays, PlusCircle, Trash2, Pencil } from 'lucide-react';

const initialDemo = [
  { id: 'e1', title: 'Hackathon 2025', details: '24-hour coding sprint in Main Hall', deadline: '2025-11-15' },
  { id: 'e2', title: 'Midterm Submission', details: 'Upload lab reports to portal', deadline: '2025-12-01' },
];

export default function EventsModal({ open, onClose, dashboard }) {
  const [events, setEvents] = useState(initialDemo);
  const [editing, setEditing] = useState(null);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      id: editing?.id || crypto.randomUUID(),
      title: String(form.get('title') || '').trim(),
      details: String(form.get('details') || '').trim(),
      deadline: String(form.get('deadline') || ''),
    };
    if (!payload.title) return;
    if (editing) {
      setEvents((list) => list.map((ev) => (ev.id === editing.id ? payload : ev)));
    } else {
      setEvents((list) => [payload, ...list]);
    }
    setEditing(null);
    e.currentTarget.reset();
  };

  const remove = (id) => setEvents((list) => list.filter((e) => e.id !== id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-semibold">Event Alerts</h3>
            <p className="text-xs text-slate-500">{dashboard === 'teacher' ? 'Create and update events, deadlines, and notices.' : 'See upcoming events and deadlines.'}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100"><X size={16} /></button>
        </div>

        <div className="px-5 py-4">
          {dashboard === 'teacher' && (
            <form onSubmit={submit} className="border border-slate-200 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input name="title" defaultValue={editing?.title} placeholder="Title" className="md:col-span-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input name="details" defaultValue={editing?.details} placeholder="Details" className="md:col-span-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input name="deadline" defaultValue={editing?.deadline} type="date" className="md:col-span-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="mt-3 flex justify-end">
                <button className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm"><PlusCircle size={16}/> {editing ? 'Update' : 'Add'} Event</button>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Demo only. Events are not persisted.</p>
            </form>
          )}

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {events.map((ev) => (
              <div key={ev.id} className="flex items-center justify-between gap-3 px-4 py-3 bg-white">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 grid place-items-center">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{ev.title}</p>
                    <p className="text-sm text-slate-600">{ev.details}</p>
                    <p className="text-xs text-slate-500">Deadline: {ev.deadline || '—'}</p>
                  </div>
                </div>
                {dashboard === 'teacher' && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEditing(ev)} className="px-2 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs inline-flex items-center gap-1"><Pencil size={14}/> Edit</button>
                    <button onClick={() => remove(ev.id)} className="px-2 py-1.5 rounded-md border border-red-200 hover:bg-red-50 text-red-700 text-xs inline-flex items-center gap-1"><Trash2 size={14}/> Delete</button>
                  </div>
                )}
              </div>
            ))}
            {!events.length && (
              <div className="px-4 py-6 text-center text-sm text-slate-500">No events yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
