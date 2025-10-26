import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, Percent } from 'lucide-react';

const StudentView = ({ attendanceMap, onClose }) => {
  const [roll, setRoll] = useState('');
  const [result, setResult] = useState(null);

  const lookup = (e) => {
    e.preventDefault();
    const rec = attendanceMap[roll?.trim()?.toUpperCase()] || null;
    setResult(rec);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={lookup} className="flex gap-2">
        <input
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your Roll Number"
        />
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Check</button>
      </form>

      {result ? (
        <div className="rounded-xl border p-4 bg-green-50 border-green-200">
          <p className="text-sm text-gray-700"><span className="font-semibold">Roll:</span> {roll.toUpperCase()}</p>
          <p className="text-sm text-gray-700"><span className="font-semibold">Attendance %:</span> {result.percentage ?? Math.round((result.presentDays/(result.presentDays+result.absentDays||1))*100)}</p>
          <p className="text-sm text-gray-700"><span className="font-semibold">Present:</span> {result.presentDays}</p>
          <p className="text-sm text-gray-700"><span className="font-semibold">Absent:</span> {result.absentDays}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Enter your roll number to view attendance. If not found, ask your teacher to update it.</p>
      )}

      <div className="flex justify-end">
        <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Close</button>
      </div>
    </div>
  );
};

const TeacherView = ({ attendanceMap, setAttendanceMap }) => {
  const [entries, setEntries] = useState([]);
  const [roll, setRoll] = useState('');
  const [mark, setMark] = useState('present');

  const addEntry = () => {
    if (!roll) return;
    setEntries([...entries, { roll: roll.trim().toUpperCase(), mark }]);
    setRoll('');
    setMark('present');
  };

  const saveMarks = () => {
    const next = { ...attendanceMap };
    entries.forEach(({ roll, mark }) => {
      if (!next[roll]) next[roll] = { presentDays: 0, absentDays: 0 };
      if (mark === 'present') next[roll].presentDays += 1;
      else next[roll].absentDays += 1;
      delete next[roll].percentage; // clear manual percentage when daily marks recorded
    });
    setAttendanceMap(next);
    setEntries([]);
  };

  // Percentage uploader
  const [percRoll, setPercRoll] = useState('');
  const [perc, setPerc] = useState('');
  const [totalDays, setTotalDays] = useState('');

  const setPercentage = () => {
    const r = percRoll.trim().toUpperCase();
    const p = Math.max(0, Math.min(100, Number(perc)));
    const t = Math.max(0, Number(totalDays));
    if (!r || isNaN(p) || isNaN(t)) return;
    const presentDays = Math.round((p / 100) * t);
    const absentDays = Math.max(0, t - presentDays);
    setAttendanceMap({
      ...attendanceMap,
      [r]: { presentDays, absentDays, percentage: p },
    });
    setPercRoll('');
    setPerc('');
    setTotalDays('');
  };

  const currentPreview = useMemo(() => Object.entries(attendanceMap).slice(0, 10), [attendanceMap]);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Mark Daily Attendance</h4>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            placeholder="Roll Number"
            className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
          <button onClick={addEntry} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add</button>
          <button onClick={saveMarks} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Save Marks</button>
        </div>
        {entries.length > 0 && (
          <ul className="mt-3 text-sm text-gray-700 space-y-1">
            {entries.map((e, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {e.mark === 'present' ? <CheckCircle2 className="text-green-600" size={16} /> : <XCircle className="text-red-600" size={16} />}
                <span className="font-medium">{e.roll}</span>
                <span className="text-gray-500">marked {e.mark}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold mb-2">Set Percentage for a Student</h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input
            value={percRoll}
            onChange={(e) => setPercRoll(e.target.value)}
            placeholder="Roll Number"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            value={perc}
            onChange={(e) => setPerc(e.target.value)}
            placeholder="Percentage"
            type="number"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            value={totalDays}
            onChange={(e) => setTotalDays(e.target.value)}
            placeholder="Total Days"
            type="number"
            className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button onClick={setPercentage} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-2">
            <Percent size={16} /> Set
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">This will overwrite counts based on the provided percentage and total days.</p>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold mb-2">Recent Records</h4>
        {currentPreview.length === 0 ? (
          <p className="text-sm text-gray-500">No records yet.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentPreview.map(([r, v]) => (
              <li key={r} className="rounded-lg border p-3 text-sm">
                <p className="font-semibold">{r}</p>
                <p className="text-gray-700">Present: {v.presentDays} • Absent: {v.absentDays} • %: {v.percentage ?? Math.round((v.presentDays/(v.presentDays+v.absentDays||1))*100)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const AttendanceModal = ({ open, onClose, role, attendanceMap, setAttendanceMap }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold">Track Attendance</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="p-5">
          {role === 'teacher' ? (
            <TeacherView attendanceMap={attendanceMap} setAttendanceMap={setAttendanceMap} />
          ) : (
            <StudentView attendanceMap={attendanceMap} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
