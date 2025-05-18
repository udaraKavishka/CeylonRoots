
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { useToast } from '../../hooks/useToast';
import { Camera, Upload } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    caption: z.string().min(5, {
        message: 'Caption must be at least 5 characters.',
    }),
    location: z.string().min(2, {
        message: 'Location must be at least 2 characters.',
    }),
    description: z.string().optional(),
    media: z.any().refine((files) => files?.length >= 1, "Please upload an image or video"),
});

type FormValues = z.infer<typeof formSchema>;

const SubmitPhotoForm = () => {
    const { toast } = useToast();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            caption: '',
            location: '',
            description: '',
        },
    });

    const onSubmit = (data: FormValues) => {
        // In a real application, we would upload the file and data to a server here
        console.log('Form submitted:', data);

        toast({
            title: "Photo submitted successfully!",
            description: "Thank you for sharing your travel memories with us.",
        });

        form.reset();
    };

    return (
        <div className="py-4">
            <div className="flex items-center space-x-4 mb-6">
                <Camera className="h-8 w-8 text-ceylon-spice" />
                <div>
                    <h2 className="text-2xl font-semibold">Share Your Travel Memories</h2>
                    <p className="text-gray-500">Submit your best photos and videos from Sri Lanka</p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="your@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="caption"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Caption</FormLabel>
                                <FormControl>
                                    <Input placeholder="Give your photo a title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Where was this taken?" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us the story behind this photo"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field: { onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel>Upload Photo/Video</FormLabel>
                                <FormControl>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                        <Input
                                            type="file"
                                            id="media"
                                            accept="image/*,video/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                onChange(files);
                                            }}
                                            {...field}
                                        />
                                        <label htmlFor="media" className="cursor-pointer flex flex-col items-center">
                                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                            <span className="text-sm font-medium text-gray-600">
                                                Click to upload or drag and drop
                                            </span>
                                            <span className="text-xs text-gray-500 mt-1">
                                                JPG, PNG, or MP4 (max. 10MB)
                                            </span>
                                        </label>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Your photo will be reviewed before being added to our gallery.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full bg-ceylon-spice hover:bg-ceylon-spice/90">
                        Submit Photo
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SubmitPhotoForm;
