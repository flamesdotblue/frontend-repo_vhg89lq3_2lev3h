import { useEffect, useMemo, useState } from 'react';
import { Calendar, CheckCircle, Home, LogOut, Settings, User } from 'lucide-react';
import LoginPanel from './components/LoginPanel.jsx';
import EventsPanel from './components/EventsPanel.jsx';
import AttendancePanel from './components/AttendancePanel.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'events', label: 'Events', icon: Calendar },
  { key: 'attendance', label: 'Attendance', icon: CheckCircle },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [backendReachable, setBackendReachable] = useState(null);

  const apiBase = useMemo(() => {
    const env = import.meta.env.VITE_BACKEND_URL;
    if (env && typeof env === 'string' && env.trim().length > 0) return env.replace(/\/$/, '');
    try {
      const url = new URL(window.location.href);
      return `${url.protocol}//${url.hostname}:8000`;
    } catch (_) {
      return 'http://localhost:8000';
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`${apiBase}/test`).then(res => {
      if (!cancelled) setBackendReachable(res.ok);
    }).catch(() => {
      if (!cancelled) setBackendReachable(false);
    });
    return () => { cancelled = true; };
  }, [apiBase]);

  const onLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white grid place-items-center font-semibold">CP</div>
            <div>
              <div className="font-semibold">Campus Portal</div>
              <div className="text-xs text-slate-500">FastAPI + MongoDB backend</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {backendReachable === false && (
              <span className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 border border-red-200">Backend unreachable</span>
            )}
            {backendReachable === true && (
              <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">API online</span>
            )}
            {user ? (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium">{user?.name || 'User'} • {user?.role}</span>
                <button onClick={onLogout} className="ml-2 inline-flex items-center gap-1 px-2.5 py-1.5 text-sm rounded-md border border-slate-200 hover:bg-slate-50">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-2">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`${active ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'} inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 text-sm whitespace-nowrap`}
                >
                  <Icon className="h-4 w-4" /> {t.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {!user ? (
          <LoginPanel apiBase={apiBase} onLogin={setUser} />
        ) : (
          <div className="space-y-6">
            {activeTab === 'dashboard' && (
              <section className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold mb-2">Welcome back{user?.name ? `, ${user.name}` : ''}!</h2>
                <p className="text-slate-600">Use the tabs above to manage events, mark attendance, or update your profile settings. Your actions are persisted via the API.</p>
              </section>
            )}

            {activeTab === 'events' && (
              <EventsPanel apiBase={apiBase} user={user} />
            )}

            {activeTab === 'attendance' && (
              <AttendancePanel apiBase={apiBase} user={user} />
            )}

            {activeTab === 'settings' && (
              <SettingsPanel apiBase={apiBase} user={user} onUserUpdate={setUser} />
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500">
          Built with React + Tailwind, backed by FastAPI + MongoDB.
        </div>
      </footer>
    </div>
  );
}
