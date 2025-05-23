'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, MessageCircle, Send, Smartphone } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { toast } from "sonner";
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
        toast.success("Message sent successfully! We'll get back to you soon.");
        form.reset();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Hero Banner */}
            <div className="relative pt-20 h-64 md:h-80 bg-gradient-to-r from-ceylon-ocean to-ceylon-tea">
                <div className="ceylon-container h-full flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                        Have questions or ready to plan your Sri Lankan adventure? We&#39;re here to help you every step of the way.
                    </p>
                </div>
                <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* Main Content */}
            <main className="flex-grow py-12">
                <div className="ceylon-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Form Section */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-ceylon-stone">Send Us a Message</h2>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Your Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+1 234 567 8900" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Subject</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Travel Inquiry" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Message</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us about your travel plans or questions..."
                                                        className="h-32"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="ceylon-button-primary w-full md:w-auto">
                                        <Send className="mr-2 h-4 w-4" /> Send Message
                                    </Button>
                                </form>
                            </Form>
                        </div>

                        {/* Contact Information and Map */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-ceylon-stone">Get in Touch</h2>

                            {/* Quick Contact Methods */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <a
                                    href="tel:+94112345678"
                                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="bg-ceylon-tea/10 p-3 rounded-full mr-4">
                                        <Phone className="h-6 w-6 text-ceylon-tea" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Call Us</p>
                                        <p className="font-medium">+94 11 234 5678</p>
                                    </div>
                                </a>

                                <a
                                    href="https://wa.me/94112345678"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <Smartphone className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">WhatsApp</p>
                                        <p className="font-medium">+94 11 234 5678</p>
                                    </div>
                                </a>

                                <a
                                    href="mailto:info@ceylonroots.com"
                                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="bg-ceylon-gold/10 p-3 rounded-full mr-4">
                                        <Mail className="h-6 w-6 text-ceylon-gold" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email Us</p>
                                        <p className="font-medium">info@ceylonroots.com</p>
                                    </div>
                                </a>

                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toast.info("Live chat feature coming soon!");
                                    }}
                                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                                        <MessageCircle className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Live Chat</p>
                                        <p className="font-medium">Start a conversation</p>
                                    </div>
                                </a>
                            </div>

                            {/* Office Address */}
                            <div className="flex items-start mb-8">
                                <div className="bg-ceylon-stone/10 p-3 rounded-full mr-4 mt-1">
                                    <MapPin className="h-6 w-6 text-ceylon-stone" />
                                </div>
                                <div>
                                    <h3 className="font-medium mb-1">Our Office</h3>
                                    <p className="text-gray-600 mb-2">
                                        42 Temple Road, Colombo 00300,<br />
                                        Sri Lanka
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Office Hours:</span> Monday to Friday, 9:00 AM - 6:00 PM
                                    </p>
                                </div>
                            </div>

                            {/* Google Map */}
                            <div className="border rounded-lg overflow-hidden h-80">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7976760372993!2d79.86074937499341!3d6.910161893101055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259251b57a431%3A0x8f44e66989e1ad80!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1681814999232!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="CeylonRoots Office Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default Contact;