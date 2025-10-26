import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import DashboardTabs from './components/DashboardTabs.jsx';
import EventsModal from './components/EventsModal.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import AttendanceModal from './components/AttendanceModal.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  // Modals
  const [eventsOpen, setEventsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [timetableOpen, setTimetableOpen] = useState(false);

  // Demo data stores
  const [events, setEvents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({}); // { ROLL: {presentDays, absentDays, percentage?} }

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => {
    setUser(null);
    setEvents([]);
    setAttendanceMap({});
  };

  const welcome = useMemo(() => {
    if (!user) return '';
    return user.role === 'teacher' ? 'Teacher Dashboard' : 'Student Dashboard';
  }, [user]);

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{welcome}</h2>
          <p className="text-sm text-gray-500">Quick actions tailored to your role</p>
        </div>

        <DashboardTabs
          role={user.role}
          onOpenEvents={() => setEventsOpen(true)}
          onOpenResults={() => setResultsOpen(true)}
          onOpenTimetable={() => setTimetableOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenAttendance={() => setAttendanceOpen(true)}
        />

        {resultsOpen && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Results (Demo)</h3>
            <p className="text-sm text-gray-500">This is a demo placeholder. Integrate backend to persist results.</p>
            <div className="mt-3">
              <button onClick={() => setResultsOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Close</button>
            </div>
          </div>
        )}

        {timetableOpen && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Timetable (Demo)</h3>
            <p className="text-sm text-gray-500">Upload/preview timetables will be wired to the backend later.</p>
            <div className="mt-3">
              <button onClick={() => setTimetableOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">Close</button>
            </div>
          </div>
        )}
      </main>

      <EventsModal open={eventsOpen} onClose={() => setEventsOpen(false)} role={user.role} events={events} setEvents={setEvents} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} user={user} onSave={setUser} />
      <AttendanceModal
        open={attendanceOpen}
        onClose={() => setAttendanceOpen(false)}
        role={user.role}
        attendanceMap={attendanceMap}
        setAttendanceMap={setAttendanceMap}
      />
    </div>
  );
};

export default App;
