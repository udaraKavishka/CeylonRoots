"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        {
            name: "Travel Packages",
            path: "/packages",
            dropdown: [
                { name: "All Packages", path: "/packages" },
                { name: "Customize Package", path: "/customize" },
            ],
        },
        { name: "Destinations", path: "/destination" },
        { name: "Blog", path: "/blog" },
        { name: "Gallery", path: "/gallery" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

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
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link, index) =>
                            link.dropdown ? (
                                <div key={index} className="relative group">
                                    <button
                                        className="flex items-center text-gray-700 hover:text-ceylon-tea transition-colors"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {link.name}
                                        <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                                    </button>
                                    <div
                                        className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                                        role="menu"
                                    >
                                        {link.dropdown.map((item, idx) => (
                                            <Link
                                                key={idx}
                                                href={item.path}
                                                className={cn(
                                                    "block px-4 py-2 text-sm hover:bg-gray-100",
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
                                        "hover:text-ceylon-tea transition-colors",
                                        pathname === link.path
                                            ? "text-ceylon-tea font-semibold"
                                            : "text-gray-700"
                                    )}
                                    aria-current={pathname === link.path ? "page" : undefined}
                                >
                                    {link.name}
                                </Link>
                            )
                        )}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Button
                            asChild
                            className="ceylon-button-primary"
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
                                            <p className="text-gray-700 font-medium mb-2">
                                                {link.name}
                                            </p>
                                            <div className="pl-4 flex flex-col space-y-2">
                                                {link.dropdown.map((item, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={item.path}
                                                        className={cn(
                                                            "hover:text-ceylon-tea",
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
                                                "hover:text-ceylon-tea",
                                                pathname === link.path
                                                    ? "text-ceylon-tea font-semibold"
                                                    : "text-gray-700"
                                            )}
                                            onClick={() => setIsMenuOpen(false)}
                                            aria-current={pathname === link.path ? "page" : undefined}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="px-4 pt-2">
                                <Button
                                    asChild
                                    className="ceylon-button-primary w-full"
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
