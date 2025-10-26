import React from 'react';
import { UserCircle2, LogOut } from 'lucide-react';

const Header = ({ user, onLogout }) => {
  const logoUrl = import.meta.env.VITE_LOGO_URL ||
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';

  return (
    <header className="w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="KHIT Campus Logo" className="h-10 w-10 object-contain" />
          <div className="flex flex-col">
            <span className="text-xl font-semibold tracking-tight text-gray-900">KHIT Campus</span>
            <span className="text-xs text-gray-500">Welcome back{user?.name ? `, ${user.name}` : ''}</span>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
              <UserCircle2 size={18} />
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-gray-500 capitalize">({user.role})</span>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
