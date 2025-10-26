import { useState } from 'react';
import { Rocket } from 'lucide-react';

export default function LoginPanel({ apiBase, onLogin }) {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [roll, setRoll] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiBase}/auth/demo-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, name: name || undefined, email: email || undefined, mobile: mobile || undefined, roll: roll || undefined }),
      });
      if (!res.ok) throw new Error(`Login failed (${res.status})`);
      const data = await res.json();
      onLogin(data);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white grid place-items-center"><Rocket className="h-5 w-5" /></div>
          <div>
            <h2 className="text-lg font-semibold">Demo Login</h2>
            <p className="text-sm text-slate-600">Choose a role and optionally provide profile details.</p>
          </div>
        </div>

        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Roll</label>
              <input value={roll} onChange={(e) => setRoll(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="22CS001" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="jane@college.edu" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Mobile</label>
              <input value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="9876543210" />
            </div>
          </div>

          <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  );
}
