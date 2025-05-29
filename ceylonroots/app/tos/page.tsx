'use client';

import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import { Separator } from "../components/ui/separator";

const TermsOfService = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                <div className="ceylon-container py-12">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <div className="prose max-w-none">
                            <p className="text-gray-600 mb-6">Last Updated: April 16, 2025</p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                                <p className="mb-4">
                                    By accessing or using CeylonRoots Travel&apos;s website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
                                <p className="mb-4">
                                    Our services are intended for personal and non-commercial use. You may use our website to:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Browse travel packages and information</li>
                                    <li>Make inquiries and bookings</li>
                                    <li>Submit reviews and content as permitted</li>
                                    <li>Contact our customer service team</li>
                                </ul>
                                <p className="mb-4">
                                    You agree not to:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Use our services for any unlawful purpose</li>
                                    <li>Attempt to gain unauthorized access to any part of our systems</li>
                                    <li>Use scraping, data mining, or automated tools to gather data</li>
                                    <li>Interfere with the proper working of our website</li>
                                    <li>Bypass measures used to prevent or restrict access</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">3. Booking and Payments</h2>
                                <p className="mb-4">
                                    When making a booking through our website:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>You agree to provide accurate and complete information</li>
                                    <li>You must be at least 18 years old to make a booking</li>
                                    <li>Payment terms, including deposits and final payments, will be specified during the booking process</li>
                                    <li>All prices are subject to availability and confirmation at the time of booking</li>
                                    <li>Additional fees such as tourist taxes or resort fees may apply and are your responsibility</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">4. Cancellations and Refunds</h2>
                                <p className="mb-4">
                                    Our cancellation and refund policy is as follows:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Cancellations more than 60 days before the trip: 90% refund</li>
                                    <li>Cancellations 30-60 days before the trip: 50% refund</li>
                                    <li>Cancellations less than 30 days before the trip: No refund</li>
                                    <li>We strongly recommend purchasing travel insurance to protect against unforeseen circumstances</li>
                                </ul>
                                <p className="mb-4">
                                    In case of extraordinary circumstances (natural disasters, political unrest), we may offer rescheduling or credit for future travel.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
                                <p className="mb-4">
                                    The content on our website, including text, graphics, logos, images, and software, is the property of CeylonRoots Travel and is protected by copyright and other intellectual property laws. You may not:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Reproduce, distribute, or display our content without permission</li>
                                    <li>Modify or create derivative works from our content</li>
                                    <li>Use our trademarks or service marks without written permission</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">6. User Content</h2>
                                <p className="mb-4">
                                    When you submit content to our website (reviews, photos, comments):
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>You retain ownership of your content</li>
                                    <li>You grant us a non-exclusive, royalty-free license to use, modify, and display that content</li>
                                    <li>You affirm that your content does not violate any laws or infringe on others&apos; rights</li>
                                    <li>We reserve the right to remove content that violates our policies</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                                <p className="mb-4">
                                    To the fullest extent permitted by law:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>We provide our services &quot;as is&quot; without warranties of any kind</li>
                                    <li>We are not liable for any indirect, incidental, or consequential damages</li>
                                    <li>Our liability for any claims arising from these terms is limited to the amount you paid for the specific service in question</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
                                <p className="mb-4">
                                    These Terms of Service shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Colombo, Sri Lanka.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
                                <p className="mb-4">
                                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes indicates your acceptance of the new terms.
                                </p>
                                <p className="mt-8">
                                    If you have any questions about these Terms of Service, please contact us at legal@ceylonroots.com.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsOfService;