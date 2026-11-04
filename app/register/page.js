"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signUp, signIn } from "@/lib/auth-client";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Enter a valid email"),
  image: z.string().trim().url("Photo URL must be a valid URL"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const res = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        image: values.image,
      });
      if (res?.error) throw new Error(res.error.message || "Registration failed");
      toast.success("Account created — welcome to CIVORA");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    await signIn.social({ provider: "google", callbackURL: "/" });
  }

  return (
    <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-2">
      <div className="civora-card rounded-3xl bg-white p-8 dark:bg-[#111d42]">
        <h1 className="font-display text-3xl font-bold">Join CIVORA</h1>
        <p className="mt-1 text-sm text-slate-500">Create impact in your neighborhood.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <input {...register("name")} placeholder="Full name" className="w-full rounded-2xl border px-4 py-2.5 text-sm outline-none focus:border-[#3569E8]" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <input {...register("email")} placeholder="Email" className="w-full rounded-2xl border px-4 py-2.5 text-sm outline-none focus:border-[#3569E8]" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <input {...register("image")} placeholder="Photo URL" className="w-full rounded-2xl border px-4 py-2.5 text-sm outline-none focus:border-[#3569E8]" />
            {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>}
          </div>
          <div>
            <input {...register("password")} type="password" placeholder="Password (6+ chars, upper & lower case)" className="w-full rounded-2xl border px-4 py-2.5 text-sm outline-none focus:border-[#3569E8]" />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <button disabled={loading} className="w-full rounded-full bg-[#3569E8] py-2.5 font-display font-semibold text-white hover:bg-[#254fc0] disabled:opacity-60">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
        <button onClick={google} className="mt-3 w-full rounded-full border py-2.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/10">
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm text-slate-500">
          Have an account? <Link href="/login" className="font-semibold text-[#3569E8]">Login</Link>
        </p>
      </div>
      <div className="hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&q=80" alt="Volunteers" className="h-[480px] w-full rounded-[2.5rem] object-cover" />
      </div>
    </div>
  );
}
