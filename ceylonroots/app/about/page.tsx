'use client';

import { Award, Users, Calendar, Briefcase, Star, Clock } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent } from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { teamMembers, milestones, partners } from '../data/aboutData';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Banner */}
            <div className="relative pt-20 h-64 md:h-80 bg-gradient-to-r from-ceylon-tea to-ceylon-ocean">
                <div className="ceylon-container h-full flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About CeylonRoots</h1>
                    <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                        We&#39;re passionate about sharing the authentic beauty and culture of Sri Lanka with travelers from around the world.
                    </p>
                </div>
                <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* Main Content */}
            <main className="flex-grow py-12">
                <div className="ceylon-container">

                    {/* Our Story Section */}
                    <section className="mb-20" aria-labelledby="our-story">
                        <h2 id="our-story" className="sr-only">Our Story</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="text-3xl font-bold text-ceylon-stone mb-6">Our Story</div>
                                <p className="text-gray-700 mb-4">
                                    Founded in 2010, CeylonRoots began with a simple mission: to showcase the real Sri Lanka beyond the typical tourist trail...
                                </p>
                                <p className="text-gray-700 mb-4">
                                    What started as a small family operation has grown into a respected travel company with a team of passionate local experts. Despite our growth, we&#39;ve never lost sight of our core values: authenticity, sustainability, and creating meaningful connections between travelers and local communities.
                                </p>
                                <p className="text-gray-700">
                                    Today, we&#39;re proud to have helped thousands of travelers from over 50 countries experience the magic of Sri Lanka. Whether it&#39;s a family adventure, a honeymoon retreat, or a solo exploration, we craft journeys that reflect the true essence of our island paradise.
                                </p>
                            </div>

                            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                                <Image
                                    src="/images/about/history.jpg"
                                    alt="CeylonRoots Team History"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                    <div className="p-6 text-white">
                                        <h3 className="text-xl font-semibold">Our founding team in 2010</h3>
                                        <p className="text-sm text-white/80">Where our journey began</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mission & Vision Section */}
                    <section className="mb-20" aria-labelledby="mission-vision">
                        <h2 id="mission-vision" className="sr-only">Mission and Vision</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Mission Card */}
                            <Card className="border-ceylon-tea/20 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="bg-ceylon-tea/10 p-3 rounded-full mr-4">
                                            <Star className="h-8 w-8 text-ceylon-tea" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-ceylon-stone">Our Mission</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        To create immersive travel experiences that showcase Sri Lanka&#39;s natural beauty...
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Vision Card */}
                            <Card className="border-ceylon-ocean/20 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="bg-ceylon-ocean/10 p-3 rounded-full mr-4">
                                            <Briefcase className="h-8 w-8 text-ceylon-ocean" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-ceylon-stone">Our Vision</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        To be recognized as the leading sustainable tourism provider in Sri Lanka...
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Core Values Section */}
                    <section className="mb-20" aria-labelledby="core-values">
                        <h2 id="core-values" className="text-3xl font-bold text-ceylon-stone text-center mb-12">
                            Our Core Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                    <h3 className="font-semibold text-xl mb-3 text-ceylon-tea">Authenticity</h3>
                                    <p className="text-gray-700">
                                        We showcase the real Sri Lanka with experiences that go beyond tourist clichés to reveal the heart of our culture.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                    <h3 className="font-semibold text-xl mb-3 text-ceylon-tea">Sustainability</h3>
                                    <p className="text-gray-700">
                                        We&#39;re committed to environmentally responsible practices and supporting conservation efforts across the island.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                    <h3 className="font-semibold text-xl mb-3 text-ceylon-tea">Community</h3>
                                    <p className="text-gray-700">
                                        We believe tourism should benefit local people through fair employment and community-based initiatives.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                    <h3 className="font-semibold text-xl mb-3 text-ceylon-tea">Excellence</h3>
                                    <p className="text-gray-700">
                                        We strive for the highest standards in every aspect of our service, from planning to execution.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Timeline Section */}
                    <section className="mb-20" aria-labelledby="our-journey">
                        <h2 id="our-journey" className="text-3xl font-bold text-ceylon-stone text-center mb-2">
                            Our Journey
                        </h2>
                        <div className="relative">
                            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-ceylon-sand"></div>
                            <div className="flex flex-col space-y-8">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
                                        <div className={`order-1 md:order-${index % 2 === 0 ? '1' : '2'} md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                                                <span className="inline-block px-3 py-1 text-xs font-medium bg-ceylon-sand/80 text-ceylon-stone rounded-full mb-2">
                                                    {milestone.year}
                                                </span>
                                                <h3 className="text-xl font-semibold mb-2 text-ceylon-stone">{milestone.title}</h3>
                                                <p className="text-gray-600">{milestone.description}</p>
                                            </div>
                                        </div>

                                        {/* Timeline Dot */}
                                        <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                            <div className="bg-ceylon-tea rounded-full h-6 w-6 border-4 border-white shadow"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Team Section */}
                    <section className="mb-20" aria-labelledby="our-team">
                        <h2 id="our-team" className="text-3xl font-bold text-ceylon-stone text-center mb-2">
                            Meet Our Team
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 shadow-sm">
                                    <Avatar className="h-24 w-24 mb-4">
                                        <AvatarImage
                                            src={member.image}
                                            alt={`Portrait of ${member.name}`}
                                        />
                                        <AvatarFallback>{member.initials}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                    <p className="text-ceylon-tea mb-3">{member.role}</p>
                                    <p className="text-gray-600">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Partners Section */}
                    <section className="mb-12" aria-labelledby="our-partners">
                        <h2 id="our-partners" className="text-3xl font-bold text-ceylon-stone text-center mb-2">
                            Our Partners & Certifications
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {partners.map((partner) => (
                                <div key={partner.name} className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 bg-white">
                                    <Image
                                        src={partner.logo}
                                        alt={`${partner.name} logo`}
                                        width={120}
                                        height={80}
                                        className="h-20 object-contain mb-3 opacity-80 hover:opacity-100"
                                    />
                                    <p className="text-sm text-gray-600 text-center">{partner.name}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Why Choose Us Section */}
                    <section aria-labelledby="why-choose-us">
                        <Alert className="bg-ceylon-sand/30 border-ceylon-tea/20">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-4">
                                <Award className="h-12 w-12 text-ceylon-tea shrink-0" aria-hidden="true" />
                                <div>
                                    <AlertTitle className="text-xl font-semibold mb-2">Why Choose CeylonRoots?</AlertTitle>
                                    <AlertDescription>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start">
                                                <Users className="h-5 w-5 text-ceylon-tea mr-2 mt-0.5" />
                                                <span><strong>Local Expertise:</strong> Our team includes Sri Lankan natives with insider knowledge.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <Clock className="h-5 w-5 text-ceylon-tea mr-2 mt-0.5" />
                                                <span><strong>24/7 Support:</strong> You&#39;ll have assistance available throughout your journey.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <Calendar className="h-5 w-5 text-ceylon-tea mr-2 mt-0.5" />
                                                <span><strong>Tailored Experiences:</strong> Every itinerary is custom-designed to match your interests.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <Star className="h-5 w-5 text-ceylon-tea mr-2 mt-0.5" />
                                                <span><strong>Exceptional Value:</strong> Quality experiences at fair prices with no hidden costs.</span>
                                            </li>
                                        </ul>
                                    </AlertDescription>
                                </div>
                            </div>
                        </Alert>
                    </section>
                </div>
            </main >

            <Footer />
        </div >
    );
}