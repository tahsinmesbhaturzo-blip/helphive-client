"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email) return toast.error("Please enter your email");
    if (!password) return toast.error("Please enter your password");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "Invalid email or password");
    toast.success("Welcome back! Login successful");
    router.push("/");
  };

  const handleGithub = async () => {
    await authClient.signIn.social({ provider: "github", callbackURL: "/" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <form onSubmit={handleLogin} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center">Login to HelpHive</h1>
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" />
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="divider">OR</div>
          <button type="button" onClick={handleGithub} className="btn btn-outline">
            <FaGithub /> Continue with GitHub
          </button>
          <p className="text-center">
            New here? <Link href="/register" className="link link-primary">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}