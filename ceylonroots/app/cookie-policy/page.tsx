'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Separator } from "../components/ui/separator";

const CookiePolicy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                <div className="ceylon-container py-12">
                    <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <div className="prose max-w-none">
                            <p className="text-gray-600 mb-6">Last Updated: April 16, 2025</p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
                                <p className="mb-4">
                                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to the website owners.
                                </p>
                                <p className="mb-4">
                                    They help us understand how visitors interact with our website, remember your preferences, and show you relevant content, making your browsing experience better.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>

                                <h3 className="text-xl font-medium mb-3">Essential Cookies</h3>
                                <p className="mb-4">
                                    These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas access, and remembering your preferences. The website cannot function properly without these cookies.
                                </p>

                                <h3 className="text-xl font-medium mb-3">Analytical/Performance Cookies</h3>
                                <p className="mb-4">
                                    These cookies allow us to recognize and count the number of visitors and see how visitors move around our website. This helps us improve the way our website works, for example, by ensuring that users find what they are looking for easily.
                                </p>

                                <h3 className="text-xl font-medium mb-3">Functionality Cookies</h3>
                                <p className="mb-4">
                                    These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                                </p>

                                <h3 className="text-xl font-medium mb-3">Targeting/Advertising Cookies</h3>
                                <p className="mb-4">
                                    These cookies record your visit to our website, the pages you have visited, and the links you have followed. We may use this information to make our website and the advertising displayed on it more relevant to your interests.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
                                <p className="mb-4">
                                    In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and deliver advertisements on and through the website. These may include:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li>Google Analytics: To analyze how users use our website</li>
                                    <li>Google Ads and Facebook Pixel: To deliver tailored advertising</li>
                                    <li>Payment processors: To process transactions securely</li>
                                    <li>Social media platforms: To enable sharing and interaction features</li>
                                </ul>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
                                <p className="mb-4">
                                    Most web browsers allow you to control cookies through their settings preferences. Here&apos;s how you can manage cookies in different browsers:
                                </p>
                                <ul className="list-disc pl-6 mb-4 space-y-2">
                                    <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                                    <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
                                </ul>
                                <p className="mb-4">
                                    You can also visit <a
                                        href="https://www.aboutcookies.org"
                                        className="text-ceylon-tea hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        www.aboutcookies.org
                                    </a> for more information about cookies and how to manage them.
                                </p>
                                <p className="mb-4">
                                    Please note that restricting cookies may impact your experience on our website, as some features may not function properly.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">5. Cookie Consent</h2>
                                <p className="mb-4">
                                    When you first visit our website, you will be shown a cookie banner asking for your consent to place cookies on your device. You can choose to accept all cookies, only essential cookies, or customize your preferences.
                                </p>
                                <p className="mb-4">
                                    You can change your cookie preferences at any time by clicking on the &quot;Cookie Settings&quot; link in the footer of our website.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">6. Changes to Our Cookie Policy</h2>
                                <p className="mb-4">
                                    We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. We encourage you to review this page periodically to stay informed about our use of cookies.
                                </p>
                            </section>

                            <Separator className="my-6" />

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                                <p className="mb-4">
                                    If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy;