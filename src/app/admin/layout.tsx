"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#1A1A18] text-[#DCD8D0] font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#1A1A18] text-[#DCD8D0] flex flex-col md:flex-row font-sans">
      {/* Sidebar (Desktop) / Header (Mobile) */}
      <aside className="w-full md:w-64 bg-[#252525] border-b md:border-b-0 md:border-r border-[#363832] flex flex-col">
        <div className="p-6 border-b border-[#363832]">
          <h1 className="font-serif text-2xl tracking-widest text-[#C9A84C]">K A A J</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#A9A499] mt-1">Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto">
          <Link href="/admin" className={`px-4 py-3 rounded-sm text-xs uppercase tracking-widest transition-colors ${pathname === '/admin' ? 'bg-[#363832] text-[#DCD8D0]' : 'text-[#A9A499] hover:text-[#DCD8D0] hover:bg-[#363832]/50'}`}>
            Dashboard
          </Link>
          <Link href="/" target="_blank" className="px-4 py-3 rounded-sm text-xs uppercase tracking-widest text-[#A9A499] hover:text-[#DCD8D0] hover:bg-[#363832]/50 transition-colors">
            View Store ↗
          </Link>
        </nav>

        <div className="p-4 border-t border-[#363832] hidden md:block">
          <button onClick={handleLogout} className="w-full px-4 py-3 rounded-sm text-xs uppercase tracking-widest text-[#A9A499] hover:text-[#DCD8D0] hover:bg-[#363832]/50 transition-colors text-left flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
