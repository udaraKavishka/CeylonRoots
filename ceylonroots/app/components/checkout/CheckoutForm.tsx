import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';

// Define validation schema
const formSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    zipCode: z.string().optional(),
    travelerCount: z.string().min(1, "Number of travelers is required"),
    specialRequests: z.string().optional(),
    paymentMethod: z.string().min(1, "Payment method is required"),
    termsAccepted: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions",
    }),
    newsletterOptIn: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
    onSubmit: (data: FormValues) => void;
    isProcessing?: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isProcessing = false }) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            travelerCount: "1",
            paymentMethod: "credit-card",
            termsAccepted: false,
            newsletterOptIn: false,
        }
    });

    const handleFormSubmit = (data: FormValues) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name*</Label>
                        <Input
                            id="firstName"
                            {...register("firstName")}
                            placeholder="John"
                            className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-500">{errors.firstName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name*</Label>
                        <Input
                            id="lastName"
                            {...register("lastName")}
                            placeholder="Doe"
                            className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && (
                            <p className="text-sm text-red-500">{errors.lastName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email*</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="john.doe@example.com"
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number*</Label>
                        <Input
                            id="phone"
                            {...register("phone")}
                            placeholder="+1234567890"
                            className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500">{errors.phone.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="address">Address*</Label>
                        <Input
                            id="address"
                            {...register("address")}
                            placeholder="123 Main St"
                            className={errors.address ? "border-red-500" : ""}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500">{errors.address.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City*</Label>
                            <Input
                                id="city"
                                {...register("city")}
                                placeholder="New York"
                                className={errors.city ? "border-red-500" : ""}
                            />
                            {errors.city && (
                                <p className="text-sm text-red-500">{errors.city.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="country">Country*</Label>
                            <Input
                                id="country"
                                {...register("country")}
                                placeholder="United States"
                                className={errors.country ? "border-red-500" : ""}
                            />
                            {errors.country && (
                                <p className="text-sm text-red-500">{errors.country.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="zipCode">Zip/Postal Code</Label>
                            <Input
                                id="zipCode"
                                {...register("zipCode")}
                                placeholder="10001"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-lg font-medium mb-4">Trip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="travelerCount">Number of Travelers*</Label>
                        <Select
                            defaultValue="1"
                            onValueChange={(value) => setValue("travelerCount", value)}
                        >
                            <SelectTrigger
                                id="travelerCount"
                                className={errors.travelerCount ? "border-red-500" : ""}
                            >
                                <SelectValue placeholder="Select number of travelers" />
                            </SelectTrigger>
                            <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                        {num} {num === 1 ? 'Traveler' : 'Travelers'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.travelerCount && (
                            <p className="text-sm text-red-500">{errors.travelerCount.message}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2 mt-4">
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                        id="specialRequests"
                        {...register("specialRequests")}
                        placeholder="Any dietary requirements, accessibility needs, or other special requests..."
                        className="h-24"
                    />
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="credit-card"
                            value="credit-card"
                            {...register("paymentMethod")}
                            className="h-4 w-4 text-ceylon-tea focus:ring-ceylon-tea"
                            defaultChecked
                        />
                        <Label htmlFor="credit-card" className="cursor-pointer">Credit Card</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="paypal"
                            value="paypal"
                            {...register("paymentMethod")}
                            className="h-4 w-4 text-ceylon-tea focus:ring-ceylon-tea"
                        />
                        <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="bank-transfer"
                            value="bank-transfer"
                            {...register("paymentMethod")}
                            className="h-4 w-4 text-ceylon-tea focus:ring-ceylon-tea"
                        />
                        <Label htmlFor="bank-transfer" className="cursor-pointer">Bank Transfer</Label>
                    </div>

                    {errors.paymentMethod && (
                        <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>
                    )}
                </div>

                {/* The actual payment form details would be displayed based on selected method */}
            </div>

            <Separator />

            <div className="space-y-4">
                <div className="flex items-start space-x-2">
                    <Checkbox
                        id="termsAccepted"
                        onCheckedChange={(checked) => setValue("termsAccepted", checked as boolean)}
                        className={errors.termsAccepted ? "border-red-500" : ""}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label
                            htmlFor="termsAccepted"
                            className="text-sm cursor-pointer font-normal"
                        >
                            I agree to the <a href="/terms" className="text-ceylon-tea underline" target="_blank">Terms of Service</a> and <a href="/privacy" className="text-ceylon-tea underline" target="_blank">Privacy Policy</a>*
                        </Label>
                        {errors.termsAccepted && (
                            <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-start space-x-2">
                    <Checkbox
                        id="newsletterOptIn"
                        onCheckedChange={(checked) => setValue("newsletterOptIn", checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label
                            htmlFor="newsletterOptIn"
                            className="text-sm cursor-pointer font-normal"
                        >
                            Subscribe to our newsletter for travel tips and exclusive offers
                        </Label>
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-ceylon-tea hover:bg-ceylon-tea/90 text-white"
                disabled={isProcessing}
            >
                {isProcessing ? "Processing..." : "Complete Booking"}
            </Button>
        </form>
    );
};

export default CheckoutForm;
