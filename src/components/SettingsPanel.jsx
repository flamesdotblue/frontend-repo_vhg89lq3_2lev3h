import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPanel({ apiBase, user, onUserUpdate }) {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', roll: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      roll: user?.roll || '',
    });
  }, [user]);

  const save = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');
    try {
      if (!user?.id && !user?._id) {
        setError('User id missing from session. Please re-login.');
        return;
      }
      const id = user.id || user._id;
      const res = await fetch(`${apiBase}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: user.role }),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const updated = await res.json();
      onUserUpdate({ ...user, ...updated });
      setStatus('Saved');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 max-w-2xl">
      <h3 className="font-semibold mb-4">Profile Settings</h3>
      {status && <div className="mb-3 text-sm text-emerald-700">{status}</div>}
      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
      <form onSubmit={save} className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input value={form.name} onChange={(e)=>setForm(v=>({...v, name:e.target.value}))} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e)=>setForm(v=>({...v, email:e.target.value}))} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Mobile</label>
            <input value={form.mobile} onChange={(e)=>setForm(v=>({...v, mobile:e.target.value}))} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Roll</label>
            <input value={form.roll} onChange={(e)=>setForm(v=>({...v, roll:e.target.value}))} className="w-full rounded-md border border-slate-300 px-3 py-2" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700">
            <Save className="h-4 w-4"/> Save changes
          </button>
          <div className="text-sm text-slate-500">Role: <span className="font-medium">{user?.role}</span></div>
        </div>
      </form>
    </section>
  );
}
