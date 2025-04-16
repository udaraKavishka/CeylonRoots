'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-ceylon-ocean text-white">
            <div className="ceylon-container">
                {/* Newsletter Section */}
                <div className="py-12 border-b border-white/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Subscribe to Our Newsletter</h2>
                            <p className="text-white/80">
                                Get travel inspiration, exclusive offers, and insider tips directly to your inbox
                            </p>
                        </div>
                        <div>
                            <form className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-ceylon-gold"
                                    aria-label="Email address for newsletter subscription"
                                />
                                <Button
                                    type="submit"
                                    className="bg-ceylon-gold hover:bg-ceylon-gold/90 text-ceylon-ocean"
                                    aria-label="Subscribe to newsletter"
                                >
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">CeylonRoots</h3>
                        <p className="text-white/80 mb-6">
                            Crafting authentic Sri Lankan travel experiences that connect you with the island&#39;s heart and soul.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ceylon-gold transition-colors" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ceylon-gold transition-colors" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ceylon-gold transition-colors" aria-label="Twitter">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ceylon-gold transition-colors" aria-label="YouTube">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <nav aria-label="Quick links">
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/about" className="text-white/80 hover:text-white transition-colors" aria-label="About us">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/packages" className="text-white/80 hover:text-white transition-colors" aria-label="Travel packages">
                                        Travel Packages
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/customize" className="text-white/80 hover:text-white transition-colors" aria-label="Customize tour">
                                        Customize Your Tour
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="text-white/80 hover:text-white transition-colors" aria-label="Travel blog">
                                        Travel Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-white/80 hover:text-white transition-colors" aria-label="FAQs">
                                        FAQs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-white/80 hover:text-white transition-colors" aria-label="Contact us">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Popular Destinations */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Top Destinations</h4>
                        <nav aria-label="Popular destinations">
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/destinations/colombo" className="text-white/80 hover:text-white transition-colors" aria-label="Colombo">
                                        Colombo
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/destinations/kandy" className="text-white/80 hover:text-white transition-colors" aria-label="Kandy">
                                        Kandy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/destinations/sigiriya" className="text-white/80 hover:text-white transition-colors" aria-label="Sigiriya">
                                        Sigiriya
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/destinations/ella" className="text-white/80 hover:text-white transition-colors" aria-label="Ella">
                                        Ella
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/destinations/galle" className="text-white/80 hover:text-white transition-colors" aria-label="Galle">
                                        Galle
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/destinations/yala" className="text-white/80 hover:text-white transition-colors" aria-label="Yala National Park">
                                        Yala National Park
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                        <address className="not-italic">
                            <ul className="space-y-4">
                                <li className="flex">
                                    <MapPin className="h-5 w-5 mr-3 flex-shrink-0 mt-1" aria-hidden="true" />
                                    <span className="text-white/80">
                                        42 Temple Road, Colombo 00300, Sri Lanka
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <Phone className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                                    <a href="tel:+94112345678" className="text-white/80 hover:text-white transition-colors" aria-label="Call us">
                                        +94 11 234 5678
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <Mail className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
                                    <a href="mailto:info@ceylonroots.com" className="text-white/80 hover:text-white transition-colors" aria-label="Email us">
                                        info@ceylonroots.com
                                    </a>
                                </li>
                            </ul>
                        </address>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="py-6 border-t border-white/20 text-center md:text-left">
                    <div className="md:flex md:justify-between items-center">
                        <p className="text-white/80 text-sm">
                            &copy; {currentYear} CeylonRoots Travel. All rights reserved.
                        </p>
                        <nav className="mt-4 md:mt-0" aria-label="Legal links">
                            <ul className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2 text-sm text-white/80">
                                <li>
                                    <Link href="/privacy" className="hover:text-white transition-colors" aria-label="Privacy policy">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="hover:text-white transition-colors" aria-label="Terms of service">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cookie-policy" className="hover:text-white transition-colors" aria-label="Cookie policy">
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;