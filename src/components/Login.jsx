import { useState } from 'react';
import { Mail, Lock, User, GraduationCap } from 'lucide-react';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    // Demo authentication: accepts any email/password
    onLogin({ role, email, name: name || (role === 'teacher' ? 'Faculty' : 'Student') });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center shadow-sm">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 leading-none">KHiT Campus Hub</p>
              <h1 className="text-lg font-semibold text-slate-900">Sign in to continue</h1>
            </div>
          </div>

          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 text-xs mb-4">
            <button
              className={`px-3 py-1.5 rounded-md ${role === 'student' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
              onClick={() => setRole('student')}
            >Student</button>
            <button
              className={`px-3 py-1.5 rounded-md ${role === 'teacher' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
              onClick={() => setRole('teacher')}
            >Teacher</button>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button className="w-full py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium">Sign in</button>
          </form>

          <p className="text-xs text-slate-500 mt-3">Demo login accepts any credentials. In a future update, this will verify against the backend.</p>
        </div>
      </div>
    </div>
  );
}
