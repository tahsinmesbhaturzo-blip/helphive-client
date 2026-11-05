"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function PrivateRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto p-10 space-y-4">
        <div className="skeleton h-10 w-1/2"></div>
        <div className="skeleton h-64 w-full"></div>
      </div>
    );
  }
  if (!session) return null;
  return children;
}