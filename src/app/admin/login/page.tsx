"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A18] px-4">
      <div className="w-full max-w-sm p-8 bg-[#252525] border border-[#363832] shadow-2xl rounded-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl tracking-widest text-[#C9A84C] mb-2">K A A J</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#A9A499]">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#A9A499] mb-2">
              Master Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-[#1A1A18] border border-[#363832] rounded-sm px-4 text-[#DCD8D0] focus:outline-none focus:border-[#C9A84C] transition-colors"
              required
            />
          </div>

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#C9A84C] text-[#1A1A18] text-xs font-bold uppercase tracking-widest hover:bg-[#DCD8D0] transition-colors rounded-sm disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
