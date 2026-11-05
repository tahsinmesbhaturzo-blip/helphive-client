"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const image = e.target.photoURL.value.trim();
    const password = e.target.password.value;

    if (!name) return toast.error("Please enter your name");
    if (!email) return toast.error("Please enter your email");
    if (!image.startsWith("http")) return toast.error("Please enter a valid photo URL");
    if (!/[A-Z]/.test(password)) return toast.error("Password must have an uppercase letter");
    if (!/[a-z]/.test(password)) return toast.error("Password must have a lowercase letter");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password, image });
    setLoading(false);

    if (error) return toast.error(error.message || "Registration failed");
    toast.success("Account created successfully!");
    router.push("/");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <form onSubmit={handleRegister} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center">Join HelpHive</h1>
          <input name="name" type="text" placeholder="Full name" className="input input-bordered w-full" />
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" />
          <input name="photoURL" type="text" placeholder="Photo URL" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" />
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
          <p className="text-center">
            Already have an account? <Link href="/login" className="link link-primary">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}