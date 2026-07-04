"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get("redirect") ?? "/admin";
  const configError = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured. Add environment variables first.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md border border-foreground/10 bg-card/60 p-8 backdrop-blur-xl"
      >
        <p className="text-[10px] tracking-[0.25em] uppercase text-primary">
          CapturedByLulu
        </p>
        <h1 className="mt-2 font-serif text-3xl text-foreground">Admin Login</h1>
        <p className="mt-2 text-sm text-foreground/45">
          Sign in with your admin credentials.
        </p>

        {configError === "supabase_not_configured" && (
          <p className="mt-4 border border-amber-500/30 bg-amber-950/20 px-3 py-2 text-sm text-amber-200/90">
            Supabase environment variables are missing. See docs/SUPABASE.md.
          </p>
        )}
        {configError === "unauthorized" && (
          <p className="mt-4 border border-red-400/30 bg-red-950/20 px-3 py-2 text-sm text-red-200/90">
            Your account is not authorized for admin access.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <p className="border border-red-400/30 bg-red-950/20 px-3 py-2 text-sm text-red-200/90">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[11px] tracking-[0.15em] uppercase text-foreground/45"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-foreground/12 bg-background px-4 py-3 text-sm"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-[11px] tracking-[0.15em] uppercase text-foreground/45"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-foreground/12 bg-background px-4 py-3 text-sm"
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Signing in
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginForm />
    </Suspense>
  );
}
