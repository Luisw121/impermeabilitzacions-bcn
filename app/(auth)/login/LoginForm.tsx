"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { loginSchema, LoginFormData } from "@/lib/validations";
import { Loader2, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await signIn("resend", {
        email: data.email,
        callbackUrl: "/dashboard",
      });
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
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
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              "form-input pl-10",
              errors.email && "border-red-300 focus:ring-red-400"
            )}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-cta w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
            Enviant enllaç...
          </>
        ) : (
          <>
            Rebre Enllaç d&apos;Accés
            <ArrowRight className="w-4 h-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
