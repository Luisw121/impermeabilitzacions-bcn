"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, LoginFormData } from "@/lib/validations";
import { Loader2, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      if (!res.ok) throw new Error();
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Error d'accés. Torna-ho a intentar.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
          Correu electrònic
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Mail className="w-4 h-4 text-slate-400" aria-hidden />
          </div>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="el.teu@correu.cat"
            aria-required="true"
            className={cn(
              "form-input pl-10",
              errors.email && "border-red-300 focus:ring-red-400"
            )}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-600" role="alert">{errors.email.message}</p>
        )}
      </div>

      {error && (
        <p className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-cta w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <><Loader2 className="w-4 h-4 animate-spin" aria-hidden />Accedint...</>
        ) : (
          <>Accedir al Dashboard<ArrowRight className="w-4 h-4" aria-hidden /></>
        )}
      </button>

      <p className="text-center text-xs text-slate-400 mt-3">
        Demo — qualsevol email funciona
      </p>
    </form>
  );
}
