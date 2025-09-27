"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, User, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showDetails) return;
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowDetails(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDetails]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    if (!user) {
      router.push("/auth");
    } else {
      setShowDetails((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowDetails(false);
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/chatbot", label: "ClaryBot" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-8 py-6 bg-transparent animate-fade-in relative">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-favicon.png" alt="ClaryGuide Logo" width={48} height={48} className="rounded-xl drop-shadow-lg animate-fade-in" />
          <div>
        <span className="font-bold text-2xl text-[#2386ff] tracking-tight animate-slide-in">
          ClaryGuide
        </span>
        <p className="text-sm text-[#6b7280] animate-fade-in">Clarity Today, Career Tomorrow</p>
          </div>
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-base md:text-lg font-medium">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={
                isActive
                  ? "text-[#2386ff] font-bold border-b-2 border-[#2386ff] pb-1"
                  : "text-[#1a3c6b] hover:text-[#2386ff] pb-1"
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>
      {/* Mobile Drawer Nav (for active link highlight) */}
      <nav id="mobileDrawerNav" className="md:hidden hidden">
        <div className="flex flex-col gap-6 text-lg font-medium items-center w-full pt-8">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={
                  isActive
                    ? "text-[#2386ff] font-bold border-b-2 border-[#2386ff] pb-1"
                    : "text-[#1a3c6b] hover:text-[#2386ff] pb-1"
                }
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
      <button className="md:hidden text-3xl text-[#2386ff] ml-auto" onClick={() => {
        const drawer = document.getElementById('mobileDrawer');
        const drawerNav = document.getElementById('mobileDrawerNav');
        if (drawer) drawer.classList.toggle('hidden');
        if (drawerNav) drawerNav.classList.toggle('hidden');
      }} aria-label="Open menu">☰</button>
      <div className="ml-4 flex items-center relative">
        <button onClick={handleProfileClick} className="focus:outline-none">
          <Image src={user?.photoURL || "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/person-circle.svg"} alt="Profile" width={40} height={40} className="hover:scale-110 transition-transform duration-200 rounded-full" />
        </button>
        {showDetails && user && (
          <div ref={cardRef} className="absolute top-12 right-0 bg-white rounded-xl shadow-lg p-4 z-50 min-w-[220px] animate-fade-in">
            <div className="flex flex-col items-center gap-2">
              <Image src={user.photoURL || "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/person-circle.svg"} alt="Profile" width={48} height={48} className="rounded-full" />
              <span className="font-bold text-[#2386ff]">{user.displayName || user.email}</span>
              <span className="text-[#6b7280] text-sm">{user.email}</span>
              <button onClick={() => router.push('/profile')} className="mt-3 bg-gradient-to-r from-[#00bfae] to-[#2386ff] text-white font-bold px-4 py-2 rounded-xl shadow hover:scale-105 transition-transform duration-200">Update Profile</button>
              <button onClick={handleLogout} className="mt-2 bg-gradient-to-r from-[#2386ff] to-[#00bfae] text-white font-bold px-4 py-2 rounded-xl shadow hover:scale-105 transition-transform duration-200">Log Out</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
