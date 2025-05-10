'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from "../components/ui/separator";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                <div className="ceylon-container py-12">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <div className="prose max-w-none">
                            <p className="text-gray-600 mb-6">Last Updated: April 16, 2025</p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                                <p className="mb-4">
                                    CeylonRoots Travel (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                                <h3 className="text-xl font-medium mb-3">Personal Data</h3>
                                <p className="mb-4">
                                    We may collect personal identification information, including but not limited to:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Name, email address, phone number</li>
                                    <li>Billing address and payment details</li>
                                    <li>Travel preferences and passport information</li>
                                    <li>Any other information you provide when booking a tour or contacting us</li>
                                </ul>

                                <h3 className="text-xl font-medium mb-3">Usage Data</h3>
                                <p className="mb-4">
                                    We may also collect information about how you access and use our website:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>IP address and browser type</li>
                                    <li>Pages visited and time spent on those pages</li>
                                    <li>Referring website or source</li>
                                    <li>Device information</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                                <p className="mb-4">We use your personal data for these purposes:</p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>To provide and maintain our services</li>
                                    <li>To process and complete your bookings</li>
                                    <li>To contact you regarding your inquiry or booking</li>
                                    <li>To send you updates about your trip</li>
                                    <li>To improve our website and services</li>
                                    <li>To send promotional materials with your consent</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
                                <p className="mb-4">
                                    We may share your information with:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Service providers (hotels, transport, guides) to fulfill your booking</li>
                                    <li>Payment processors to complete transactions</li>
                                    <li>Analytics providers to improve our services</li>
                                    <li>Legal authorities when required by law</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                                <p className="mb-4">
                                    Depending on your location, you may have the following rights:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Access your personal data</li>
                                    <li>Correct inaccurate information</li>
                                    <li>Delete your personal data</li>
                                    <li>Object to processing of your data</li>
                                    <li>Data portability</li>
                                    <li>Withdraw consent</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">6. Security</h2>
                                <p className="mb-4">
                                    We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
                                <p className="mb-4">
                                    We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                                <p className="mb-4">
                                    If you have any questions about this privacy policy, please contact us at:
                                </p>
                                <div className="bg-gray-50 p-4 rounded">
                                    <p>Email: privacy@ceylonroots.com</p>
                                    <p>Phone: +94 11 234 5678</p>
                                    <p>Address: 42 Temple Road, Colombo 00300, Sri Lanka</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;