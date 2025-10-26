export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} KHiT Campus Hub. All rights reserved.</p>
        <div className="text-xs text-slate-500">
          Built for students and teachers — streamlined dashboards and branch sections A–G.
        </div>
      </div>
    </footer>
  );
}
