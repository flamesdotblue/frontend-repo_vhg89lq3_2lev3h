import { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

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

export default function TimetableWizard({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [branch, setBranch] = useState(null);
  const [section, setSection] = useState(null);

  if (!open) return null;

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="text-base font-semibold">Timetable Management</h3>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100"><X size={16} /></button>
        </div>

        <div className="px-5 py-4">
          {step === 1 && (
            <div>
              <p className="text-sm text-slate-600 mb-3">Choose a branch to proceed.</p>
              <div className="grid grid-cols-2 gap-3">
                {BRANCHES.map((b) => (
                  <button
                    key={b.code}
                    onClick={() => setBranch(b)}
                    className={`border rounded-lg p-3 text-left hover:border-indigo-400 ${
                      branch?.code === b.code ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200'
                    }`}
                  >
                    <p className="font-semibold">{b.code}</p>
                    <p className="text-xs text-slate-600">{b.name}</p>
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button disabled className="px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-400">
                  <ChevronLeft className="inline mr-1" size={14} /> Back
                </button>
                <button
                  onClick={next}
                  disabled={!branch}
                  className={`px-3 py-2 text-sm rounded-lg ${branch ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                >
                  Next <ChevronRight className="inline ml-1" size={14} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-sm text-slate-600 mb-3">Select a section for {branch?.code}.</p>
              <div className="flex flex-wrap gap-2">
                {SECTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSection(s)}
                    className={`px-3 py-1.5 text-sm rounded-full border ${
                      section === s ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex justify-between gap-2 mt-4">
                <button onClick={prev} className="px-3 py-2 text-sm rounded-lg border border-slate-200">
                  <ChevronLeft className="inline mr-1" size={14} /> Back
                </button>
                <button
                  onClick={next}
                  disabled={!section}
                  className={`px-3 py-2 text-sm rounded-lg ${section ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                >
                  Next <ChevronRight className="inline ml-1" size={14} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <p className="text-sm text-slate-600">Showing timetable for</p>
              <h4 className="text-xl font-semibold mt-1">{branch?.code}-{section}</h4>
              <div className="mt-4 border border-dashed border-slate-300 rounded-xl p-6">
                <p className="text-slate-500 text-sm">Timetable preview will appear here in the next update.</p>
              </div>
              <div className="flex justify-center mt-4 gap-2">
                <button onClick={() => { setStep(1); setBranch(null); setSection(null); }} className="px-3 py-2 text-sm rounded-lg border border-slate-200">Choose another</button>
                <button onClick={onClose} className="px-3 py-2 text-sm rounded-lg bg-indigo-600 text-white">Done</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
