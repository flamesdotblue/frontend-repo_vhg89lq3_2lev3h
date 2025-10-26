import { useState, useEffect } from 'react';
import { X, User, Phone, Lock } from 'lucide-react';

export default function SettingsModal({ open, onClose, user, onUpdate }) {
  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setName(user?.name || '');
    setMobile(user?.mobile || '');
    setPassword('');
  }, [user, open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const payload = { ...user, name: name || user.name, mobile, password: password ? '••••••••' : user.password };
    onUpdate(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h3 className="text-base font-semibold">Settings</h3>
            <p className="text-xs text-slate-500">Update your profile details.</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100"><X size={16} /></button>
        </div>

        <form onSubmit={submit} className="px-5 py-4 space-y-3">
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {user?.role === 'student' && (
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile number"
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button className="w-full py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium">Save changes</button>
          <p className="text-[11px] text-slate-500">Demo only. Changes are not persisted to a server.</p>
        </form>
      </div>
    </div>
  );
}
