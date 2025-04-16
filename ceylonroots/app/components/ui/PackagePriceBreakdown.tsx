import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Check, X } from 'lucide-react';

interface PackagePriceBreakdownProps {
    basePrice: number;
    priceIncludes: string[];
    priceExcludes: string[];
}

const PackagePriceBreakdown: React.FC<PackagePriceBreakdownProps> = ({
    basePrice,
    priceIncludes,
    priceExcludes
}) => {
    // Calculate other prices
    const taxes = Math.round(basePrice * 0.12); // 12% tax
    const serviceFee = Math.round(basePrice * 0.08); // 8% service fee
    const totalPrice = basePrice + taxes + serviceFee;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Price Breakdown</h3>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Tour Cost Per Person</CardTitle>
                    <CardDescription>Based on double occupancy</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Base Price</TableCell>
                                <TableCell className="text-right">${basePrice.toLocaleString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Taxes (12%)</TableCell>
                                <TableCell className="text-right">${taxes.toLocaleString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Service Fee (8%)</TableCell>
                                <TableCell className="text-right">${serviceFee.toLocaleString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-lg">Total</TableCell>
                                <TableCell className="text-right font-bold text-lg">${totalPrice.toLocaleString()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        Price Includes
                    </h4>
                    <ul className="space-y-2">
                        {priceIncludes.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                                <span className="text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                        <X className="h-5 w-5 mr-2 text-red-500" />
                        Price Excludes
                    </h4>
                    <ul className="space-y-2">
                        {priceExcludes.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <X className="h-4 w-4 mr-2 text-red-500 mt-1" />
                                <span className="text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                    * Prices are subject to change based on season, group size, and availability.
                    Contact us for current pricing and special offers.
                </p>
            </div>
        </div>
    );
};

export default PackagePriceBreakdown;