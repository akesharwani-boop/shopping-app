import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
        {children}
      </div>
    </div>
  );
}