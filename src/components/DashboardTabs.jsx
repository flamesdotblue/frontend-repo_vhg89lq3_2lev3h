import { BookOpen, ClipboardList, Calendar, Settings } from 'lucide-react';

export default function DashboardTabs({ dashboard }) {
  const studentCards = [
    { title: 'Courses', desc: 'View enrolled courses and materials.', icon: BookOpen, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
    { title: 'Assignments', desc: 'Track upcoming and submitted work.', icon: ClipboardList, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { title: 'Schedule', desc: 'Timetable, exams, and events.', icon: Calendar, color: 'bg-amber-50 text-amber-700 border-amber-100' },
    { title: 'Settings', desc: 'Profile, preferences, and security.', icon: Settings, color: 'bg-slate-50 text-slate-700 border-slate-200' },
  ];

  const teacherCards = [
    { title: 'Classes', desc: 'Manage classes and resources.', icon: BookOpen, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
    { title: 'Assessments', desc: 'Create, review, and grade.', icon: ClipboardList, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { title: 'Calendar', desc: 'Schedule lectures and exams.', icon: Calendar, color: 'bg-amber-50 text-amber-700 border-amber-100' },
    { title: 'Settings', desc: 'Account and portal settings.', icon: Settings, color: 'bg-slate-50 text-slate-700 border-slate-200' },
  ];

  const cards = dashboard === 'teacher' ? teacherCards : studentCards;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ title, desc, icon: Icon, color }) => (
          <div key={title} className={`border rounded-xl p-4 ${color} hover:shadow-sm transition-shadow`}>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-white/70 grid place-items-center border border-white/60">
                <Icon size={18} />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-slate-600 mt-1">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
