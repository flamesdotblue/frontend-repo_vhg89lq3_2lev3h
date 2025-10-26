import React, { useState } from 'react';
import { CalendarDays, PlusCircle, Trash2, Pencil } from 'lucide-react';

const EventsModal = ({ open, onClose, role, events, setEvents }) => {
  const [form, setForm] = useState({ title: '', details: '', deadline: '' });
  const [editingId, setEditingId] = useState(null);

  if (!open) return null;

  const resetForm = () => {
    setForm({ title: '', details: '', deadline: '' });
    setEditingId(null);
  };

  const addEvent = () => {
    if (!form.title) return;
    const newEvent = { id: crypto.randomUUID(), ...form };
    setEvents([newEvent, ...events]);
    resetForm();
  };

  const startEdit = (evt) => {
    setEditingId(evt.id);
    setForm({ title: evt.title, details: evt.details, deadline: evt.deadline });
  };

  const saveEdit = () => {
    setEvents(events.map((e) => (e.id === editingId ? { ...e, ...form } : e)));
    resetForm();
  };

  const removeEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold">Event Alerts</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {role === 'teacher' && (
            <div className="lg:col-span-1 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Details</label>
                <textarea
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Event details"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                {editingId ? (
                  <button onClick={saveEdit} className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    <Pencil size={18} /> Save
                  </button>
                ) : (
                  <button onClick={addEvent} className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    <PlusCircle size={18} /> Add Event
                  </button>
                )}
                {editingId && (
                  <button onClick={resetForm} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Cancel</button>
                )}
              </div>
            </div>
          )}

          <div className={role === 'teacher' ? 'lg:col-span-2' : 'lg:col-span-3'}>
            {events.length === 0 ? (
              <p className="text-sm text-gray-500">No events yet.</p>
            ) : (
              <ul className="space-y-3">
                {events.map((evt) => (
                  <li key={evt.id} className="rounded-xl border border-gray-200 p-4 bg-white flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{evt.title}</h4>
                      {evt.details && <p className="text-sm text-gray-600 mt-1">{evt.details}</p>}
                      {evt.deadline && <p className="text-xs text-gray-500 mt-1">Deadline: {evt.deadline}</p>}
                    </div>
                    {role === 'teacher' && (
                      <div className="flex items-center gap-2 ml-4">
                        <button onClick={() => startEdit(evt)} className="px-2.5 py-1.5 rounded-md border hover:bg-gray-50 text-gray-700">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => removeEvent(evt.id)} className="px-2.5 py-1.5 rounded-md border hover:bg-red-50 text-red-600 border-red-200">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsModal;
