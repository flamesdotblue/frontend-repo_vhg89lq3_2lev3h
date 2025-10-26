import { GraduationCap, Users } from 'lucide-react';

export default function Header({ dashboard, onSwitch }) {
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

        <nav className="flex items-center gap-2">
          <button
            onClick={() => onSwitch('student')}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors border ${
              dashboard === 'student'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            aria-pressed={dashboard === 'student'}
          >
            <Users size={16} /> Student
          </button>
          <button
            onClick={() => onSwitch('teacher')}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors border ${
              dashboard === 'teacher'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            aria-pressed={dashboard === 'teacher'}
          >
            <GraduationCap size={16} /> Teacher
          </button>
        </nav>
      </div>
    </header>
  );
}
