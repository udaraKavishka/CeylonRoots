'use client';

import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
// import { Separator } from "../components/ui/separator";
import Link from 'next/link';

const faqs = [
    {
        question: "What's the best time to visit Sri Lanka?",
        answer: "Sri Lanka has a complex climate affected by two monsoons. The southwest experiences rain from May to September, while the northeast monsoon affects that region from October to January. For beach holidays, the south and west coasts are best from December to March, while the east coast is ideal from April to September. For cultural sites and wildlife, the dry season (December to March) is generally recommended."
    },
    {
        question: "Do I need a visa to visit Sri Lanka?",
        answer: "Most visitors to Sri Lanka require an Electronic Travel Authorization (ETA) before arrival. This can be obtained online through the official Sri Lanka ETA website. Some nationalities may be eligible for visa on arrival, but pre-arranging your ETA is recommended for a smoother entry process."
    },
    {
        question: "Is Sri Lanka safe for tourists?",
        answer: "Sri Lanka is generally considered safe for tourists. As with any destination, normal precautions should be taken regarding personal belongings and awareness of your surroundings. It's always advisable to check your government's travel advisory before visiting and to obtain comprehensive travel insurance."
    },
    {
        question: "What currency is used in Sri Lanka?",
        answer: "The Sri Lankan Rupee (LKR) is the official currency. Major hotels and some restaurants accept credit cards, but it's advisable to carry cash, especially in rural areas. ATMs are widely available in cities and tourist areas."
    },
    {
        question: "How can I get around in Sri Lanka?",
        answer: "Sri Lanka offers various transportation options. For convenience, many tourists hire a car with a driver through tour companies like CeylonRoots. Public transport includes trains (a scenic way to travel through the hill country), buses, and tuk-tuks for short distances. Domestic flights are available between major cities."
    },
    {
        question: "What should I pack for a trip to Sri Lanka?",
        answer: "Light, breathable clothing is recommended for Sri Lanka's tropical climate. Include modest attire for visiting temples (shoulders and knees should be covered), swimwear for beaches, sturdy walking shoes, insect repellent, sunscreen, and a hat. A light rain jacket is useful during monsoon seasons. For hill country visits, pack a light sweater as evenings can be cool."
    },
    {
        question: "What vaccinations do I need for Sri Lanka?",
        answer: "Consult your healthcare provider at least 6-8 weeks before your trip. Generally, routine vaccinations should be up to date, and some travelers may need hepatitis A, typhoid, and Japanese encephalitis vaccines depending on their itinerary. Malaria prophylaxis is not typically required for most tourist areas, but insect precautions are still advisable."
    },
    {
        question: "What is the food like in Sri Lanka?",
        answer: "Sri Lankan cuisine is known for its complex flavors and spices. Rice and curry is the staple dish, typically consisting of rice with several curry dishes, sambols, and pickles. Seafood is excellent along the coast. The food can be quite spicy, but restaurants catering to tourists often offer milder options. Don't miss trying hoppers, kottu roti, and fresh tropical fruits."
    },
    {
        question: "Can I drink tap water in Sri Lanka?",
        answer: "It's recommended to drink bottled or filtered water in Sri Lanka. Bottled water is widely available, but to reduce plastic waste, consider bringing a refillable water bottle with a built-in filter or using water purification tablets."
    },
    {
        question: "What are the must-see attractions in Sri Lanka?",
        answer: "Top attractions include the ancient cities of Anuradhapura and Polonnaruwa, the rock fortress of Sigiriya, the Temple of the Sacred Tooth Relic in Kandy, tea plantations in Nuwara Eliya, wildlife safaris in Yala National Park, whale watching in Mirissa, and the colonial architecture of Galle Fort. The itinerary can be customized based on your interests and the duration of your stay."
    }
];

// FAQ categories
const categories = [
    "Planning Your Trip",
    "Accommodation",
    "Transportation",
    "Food & Health",
    "Activities & Attractions",
    "Local Customs & Etiquette"
];

const FAQ = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-ceylon-ocean text-white py-16">
                    <div className="ceylon-container">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
                        <p className="text-lg max-w-3xl">
                            Find answers to common questions about traveling in Sri Lanka.
                            If you don&apos;t see the answer you&apos;re looking for, feel free to contact us directly.
                        </p>
                    </div>
                </section>

                {/* FAQ Categories */}
                <section className="py-10 bg-gray-50">
                    <div className="ceylon-container">
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    href={`#category-${index}`}
                                    className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-ceylon-tea hover:text-white transition-colors duration-200"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="py-16">
                    <div className="ceylon-container">
                        <div className="max-w-3xl mx-auto">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left font-medium text-lg">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-10 bg-gray-50">
                    <div className="ceylon-container text-center">
                        <h2 className="text-2xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
                        <p className="mb-6">Our travel specialists are here to help with any specific questions you may have.</p>
                        <Link
                            href="/contact"
                            className="inline-block px-6 py-3 bg-ceylon-tea text-white rounded-md hover:bg-ceylon-tea/90 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default FAQ;