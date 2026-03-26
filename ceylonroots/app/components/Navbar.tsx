"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Package,
  MapPin,
  Users,
  BookOpen,
  Info,
  MessageCircle,
  LogOut,
  User,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { useCurrency, Currency } from "../contexts/CurrencyContext";
import { useSession, signOut } from "next-auth/react";
import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const { data: session } = useSession();
  const { logout } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    logout();
    await signOut({ callbackUrl: "/" });
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
    {
      name: "Travel Packages",
      path: "/packages",
      icon: <Package className="h-4 w-4" />,
      dropdown: [
        { name: "All Packages", path: "/packages" },
        { name: "Customize Package", path: "/customize" },
      ],
    },
    {
      name: "Destinations",
      path: "/destination",
      icon: <MapPin className="h-4 w-4" />,
    },
    { name: "Guides", path: "/guides", icon: <Users className="h-4 w-4" /> },
    { name: "Blog", path: "/blog", icon: <BookOpen className="h-4 w-4" /> },
    { name: "About", path: "/about", icon: <Info className="h-4 w-4" /> },
    {
      name: "Contact",
      path: "/contact",
      icon: <MessageCircle className="h-4 w-4" />,
    },
  ];

  const userInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : session?.user?.email
      ? session.user.email.charAt(0).toUpperCase()
      : "U";

  const isAdmin =
    (session?.user as { role?: string })?.role === "admin" ||
    session?.user?.email === "admin@email.com";

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
      aria-label="Main navigation"
    >
      <div className="ceylon-container">
        <div className="flex items-center justify-between">
          {/* Logo with semantic heading */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Ceylon Roots homepage"
          >
            <h1 className="text-2xl font-bold text-ceylon-tea">
              Ceylon<span className="text-ceylon-spice">Roots</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link, index) =>
              link.dropdown ? (
                <div key={index} className="relative group">
                  <button
                    className="flex items-center gap-1.5 text-gray-700 hover:text-ceylon-tea transition-colors text-sm"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="text-ceylon-tea/70">{link.icon}</span>
                    {link.name}
                    <ChevronDown
                      className="ml-0.5 h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100"
                    role="menu"
                  >
                    {link.dropdown.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.path}
                        className={cn(
                          "block px-4 py-2 text-sm hover:bg-gray-100 rounded-md",
                          pathname === item.path
                            ? "text-ceylon-tea bg-gray-50"
                            : "text-gray-700"
                        )}
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={link.path}
                  className={cn(
                    "flex items-center gap-1.5 hover:text-ceylon-tea transition-colors text-sm",
                    pathname === link.path
                      ? "text-ceylon-tea font-semibold"
                      : "text-gray-700"
                  )}
                  aria-current={pathname === link.path ? "page" : undefined}
                >
                  <span
                    className={cn(
                      "transition-colors",
                      pathname === link.path
                        ? "text-ceylon-tea"
                        : "text-ceylon-tea/60"
                    )}
                  >
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* CTA Button & User */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="text-sm border border-gray-200 rounded-md px-2 py-1.5 text-gray-700 bg-white hover:border-ceylon-tea focus:outline-none focus:ring-1 focus:ring-ceylon-tea cursor-pointer"
              aria-label="Select currency"
            >
              <option value="USD">🇺🇸 USD</option>
              <option value="EUR">🇪🇺 EUR</option>
              <option value="GBP">🇬🇧 GBP</option>
              <option value="AUD">🇦🇺 AUD</option>
              <option value="LKR">🇱🇰 LKR</option>
            </select>

            {/* User Avatar or Login */}
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 focus:outline-none"
                  aria-label="User menu"
                  aria-haspopup="true"
                  aria-expanded={isUserDropdownOpen}
                >
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-ceylon-tea to-ceylon-ocean flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white hover:ring-ceylon-tea/30 transition-all duration-200">
                    {userInitial}
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-gray-500 transition-transform duration-200",
                      isUserDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-fade-in"
                    role="menu"
                  >
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {session.user.name ?? "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-ceylon-tea transition-colors"
                      role="menuitem"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 text-ceylon-tea/70" />
                      My Profile
                    </Link>

                    <Link
                      href="/profile/bookings"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-ceylon-tea transition-colors"
                      role="menuitem"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <CalendarDays className="h-4 w-4 text-ceylon-tea/70" />
                      My Bookings
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-ceylon-tea transition-colors"
                        role="menuitem"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <ShieldCheck className="h-4 w-4 text-ceylon-tea/70" />
                        Admin
                      </Link>
                    )}

                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-ceylon-spice hover:bg-red-50 transition-colors"
                        role="menuitem"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white transition-all duration-200"
              >
                Log In
              </Link>
            )}

            {/* Plan Your Trip button with warm gradient */}
            <Button
              asChild
              className="relative overflow-hidden text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-0"
              style={{
                background: "linear-gradient(135deg, #2E8B57 0%, #D4AF37 100%)",
                boxShadow: "0 4px 15px rgba(46, 139, 87, 0.35)",
              }}
              aria-label="Plan your trip with Ceylon Roots"
            >
              <Link href="/packages">Plan Your Trip</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="lg:hidden mt-4 py-4 bg-white rounded-lg shadow-md"
            role="navigation"
            aria-label="Mobile menu"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <div key={index} className="px-4">
                  {link.dropdown ? (
                    <>
                      <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                        <span className="text-ceylon-tea/70">{link.icon}</span>
                        <p>{link.name}</p>
                      </div>
                      <div className="pl-6 flex flex-col space-y-2">
                        {link.dropdown.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.path}
                            className={cn(
                              "hover:text-ceylon-tea text-sm",
                              pathname === item.path
                                ? "text-ceylon-tea font-semibold"
                                : "text-gray-600"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                            aria-current={
                              pathname === item.path ? "page" : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.path}
                      className={cn(
                        "flex items-center gap-2 hover:text-ceylon-tea text-sm",
                        pathname === link.path
                          ? "text-ceylon-tea font-semibold"
                          : "text-gray-700"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={pathname === link.path ? "page" : undefined}
                    >
                      <span
                        className={cn(
                          "transition-colors",
                          pathname === link.path
                            ? "text-ceylon-tea"
                            : "text-ceylon-tea/60"
                        )}
                      >
                        {link.icon}
                      </span>
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile user section */}
              <div className="px-4 border-t border-gray-100 pt-3">
                {session?.user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-ceylon-tea to-ceylon-ocean flex items-center justify-center text-white font-semibold text-sm">
                        {userInitial}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-ceylon-tea py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 text-ceylon-tea/70" />
                      My Profile
                    </Link>
                    <Link
                      href="/profile/bookings"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-ceylon-tea py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CalendarDays className="h-4 w-4 text-ceylon-tea/70" />
                      My Bookings
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-ceylon-tea py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <ShieldCheck className="h-4 w-4 text-ceylon-tea/70" />
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-sm text-ceylon-spice hover:text-red-600 py-1 w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-1.5 w-full text-sm font-semibold px-4 py-2 rounded-lg border border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                )}
              </div>

              <div className="px-4 pt-2">
                <Button
                  asChild
                  className="w-full text-white font-semibold rounded-lg shadow-md border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #2E8B57 0%, #D4AF37 100%)",
                    boxShadow: "0 4px 15px rgba(46, 139, 87, 0.35)",
                  }}
                  aria-label="Plan your trip with Ceylon Roots"
                >
                  <Link href="/packages">Plan Your Trip</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
