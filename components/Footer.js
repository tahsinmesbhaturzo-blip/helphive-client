import Link from "next/link";
import { FaXTwitter, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold text-primary">🐝 HelpHive</h2>
          <p className="mt-3">
            A community platform where neighbours organise and join social service
            events like clothes drives, plantation days and clean-up campaigns.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="link link-hover">Home</Link></li>
            <li><Link href="/events" className="link link-hover">Upcoming Events</Link></li>
            <li><Link href="/create-event" className="link link-hover">Create Event</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact</h3>
          <p>Mirpur 10, Dhaka, Bangladesh</p>
          <p>hello@helphive.com</p>
          <div className="flex gap-4 mt-4 text-2xl">
            <a href="https://x.com" target="_blank" aria-label="X"><FaXTwitter /></a>
            <a href="https://facebook.com" target="_blank" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://github.com" target="_blank" aria-label="GitHub"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="text-center py-4 border-t border-neutral-content/20">
        © 2026 HelpHive. All rights reserved.
      </div>
    </footer>
  );
}