import { BookOpen, Calendar, Settings, GraduationCap, FileSearch, UploadCloud } from 'lucide-react';

export default function DashboardTabs({ dashboard, onOpenResults, onOpenTimetable }) {
  const studentCards = [
    { key: 'courses', title: 'Courses', desc: 'View enrolled courses and materials.', icon: BookOpen, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
    { key: 'results', title: 'Results', desc: 'Check results by entering roll number.', icon: FileSearch, color: 'bg-emerald-50 text-emerald-700 border-emerald-100', onClick: onOpenResults },
    { key: 'timetable', title: 'Timetable', desc: 'View timetable by branch and section.', icon: Calendar, color: 'bg-amber-50 text-amber-700 border-amber-100', onClick: onOpenTimetable },
    { key: 'settings', title: 'Settings', desc: 'Profile, preferences, and security.', icon: Settings, color: 'bg-slate-50 text-slate-700 border-slate-200' },
  ];

  const teacherCards = [
    { key: 'classes', title: 'Classes', desc: 'Manage classes and resources.', icon: GraduationCap, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
    { key: 'timetable', title: 'Timetable Management', desc: 'Upload or update timetables.', icon: UploadCloud, color: 'bg-amber-50 text-amber-700 border-amber-100', onClick: onOpenTimetable },
    { key: 'results', title: 'Results', desc: 'Enter or look up student results.', icon: FileSearch, color: 'bg-emerald-50 text-emerald-700 border-emerald-100', onClick: onOpenResults },
    { key: 'settings', title: 'Settings', desc: 'Account and portal settings.', icon: Settings, color: 'bg-slate-50 text-slate-700 border-slate-200' },
  ];

  const cards = dashboard === 'teacher' ? teacherCards : studentCards;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ key, title, desc, icon: Icon, color, onClick }) => (
          <button
            key={key}
            onClick={onClick}
            className={`text-left border rounded-xl p-4 ${color} hover:shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-white/70 grid place-items-center border border-white/60">
                <Icon size={18} />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-slate-600 mt-1">{desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
