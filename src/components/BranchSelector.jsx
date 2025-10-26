import { useMemo, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const BRANCHES = [
  { code: 'CSE', name: 'Computer Science & Engineering' },
  { code: 'IT', name: 'Information Technology' },
  { code: 'AIDS', name: 'Artificial Intelligence & Data Science' },
  { code: 'AIML', name: 'Artificial Intelligence & Machine Learning' },
  { code: 'ECE', name: 'Electronics & Communication' },
  { code: 'EEE', name: 'Electrical & Electronics' },
  { code: 'ME', name: 'Mechanical Engineering' },
  { code: 'CE', name: 'Civil Engineering' },
];

const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export default function BranchSelector({ dashboard }) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BRANCHES;
    return BRANCHES.filter(b => b.code.toLowerCase().includes(q) || b.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{dashboard === 'teacher' ? 'Manage Branches & Sections' : 'Browse Branches & Sections'}</h2>
          <p className="text-slate-600 text-sm mt-1">
            Includes CSE, IT, AIDS, AIML, ECE, EEE, Mechanical, and Civil with sections A–G.
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search branch (e.g., CSE, AIML)"
            className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((b) => (
          <div key={b.code} className="border border-slate-200 rounded-xl p-4 bg-white">
            <button
              className="w-full flex items-center justify-between"
              onClick={() => setExpanded(expanded === b.code ? null : b.code)}
              aria-expanded={expanded === b.code}
            >
              <div>
                <h3 className="font-semibold text-slate-900">{b.code}</h3>
                <p className="text-sm text-slate-600">{b.name}</p>
              </div>
              <ChevronDown
                className={`transition-transform ${expanded === b.code ? 'rotate-180' : ''}`}
                size={18}
              />
            </button>

            {expanded === b.code && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {SECTIONS.map((s) => (
                    <button
                      key={s}
                      className="px-3 py-1.5 text-xs rounded-full border border-slate-200 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
                    >
                      {b.code}-{s}
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-xs text-slate-500">
                  {dashboard === 'teacher'
                    ? 'Choose a section to manage timetable, materials, and assessments.'
                    : 'Choose a section to view timetable, notes, and assignments.'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
