"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const links = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/events">Upcoming Events</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">☰</div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link href="/" className="text-2xl font-bold text-primary">🐝 HelpHive</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />
        {isPending ? (
          <div className="skeleton h-10 w-10 rounded-full"></div>
        ) : !user ? (
          <Link href="/login" className="btn btn-primary">Login</Link>
        ) : (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="tooltip tooltip-bottom" data-tip={user.name}>
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                    <img
                      src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                      alt={user.name}
                    />
                  </div>
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow">
                <li><Link href="/create-event">Create Event</Link></li>
                <li><Link href="/manage-events">Manage Events</Link></li>
                <li><Link href="/joined-events">Joined Events</Link></li>
                <li><Link href="/profile">My Profile</Link></li>
              </ul>
            </div>
            <button onClick={handleLogout} className="btn btn-outline btn-primary">Logout</button>
          </>
        )}
      </div>
    </div>
  );
}