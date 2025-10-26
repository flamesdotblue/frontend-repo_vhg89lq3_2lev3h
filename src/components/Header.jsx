import { GraduationCap, UserCircle2, LogOut } from 'lucide-react';

export default function Header({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center shadow-sm">
            <GraduationCap size={22} />
          </div>
          <div>
            <p className="text-sm text-slate-500 leading-none">KHiT Campus Hub</p>
            <h1 className="text-lg font-semibold text-slate-900">Unified Portal</h1>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900">{user.name || (user.role === 'teacher' ? 'Faculty' : 'Student')}</p>
              <p className="text-xs text-slate-500 capitalize">{user.role}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-indigo-50 grid place-items-center text-indigo-700 border border-indigo-100">
              <UserCircle2 size={18} />
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors border bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
