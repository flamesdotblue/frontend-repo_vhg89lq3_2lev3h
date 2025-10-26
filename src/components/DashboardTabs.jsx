import React from 'react';
import { Bell, FileSearch, Calendar, Settings as SettingsIcon, CheckCircle } from 'lucide-react';

const Card = ({ icon: Icon, title, desc, onClick }) => (
  <button
    onClick={onClick}
    className="group rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-5 text-left shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  </button>
);

const DashboardTabs = ({ role, onOpenEvents, onOpenResults, onOpenTimetable, onOpenSettings, onOpenAttendance }) => {
  const common = [
    {
      icon: Bell,
      title: 'Event Alerts',
      desc: role === 'teacher' ? 'Create and manage campus events' : 'View upcoming events and deadlines',
      onClick: onOpenEvents,
    },
    {
      icon: FileSearch,
      title: 'Results',
      desc: role === 'teacher' ? 'Enter and publish results' : 'Check your results',
      onClick: onOpenResults,
    },
    {
      icon: Calendar,
      title: 'Timetable',
      desc: role === 'teacher' ? 'Upload and update timetable' : 'Preview your timetable',
      onClick: onOpenTimetable,
    },
    {
      icon: SettingsIcon,
      title: 'Settings',
      desc: 'Manage your profile',
      onClick: onOpenSettings,
    },
    {
      icon: CheckCircle,
      title: 'Track Attendance',
      desc: role === 'teacher' ? 'Mark daily attendance and set percentages' : 'Check your attendance status',
      onClick: onOpenAttendance,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {common.map((c) => (
        <Card key={c.title} {...c} />
      ))}
    </div>
  );
};

export default DashboardTabs;
