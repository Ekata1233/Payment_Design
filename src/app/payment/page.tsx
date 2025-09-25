
'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import axios from 'axios';

interface User {
    _id: string;
    fullName: string;
    email: string;
    mobileNumber: string;
}

interface Service {
    _id: string;
    serviceName: string;
    price: number;
}

interface PaymentData {
    _id: string;
    user: User;
    service: Service;
    subtotal: number;
    totalAmount: number;
    paidAmount: number;
    paymentStatus: string;
    paymentMethod: string[];
    cashfreeMethod: string;
    bookingId: string;
    createdAt: string;
}

interface ApiResponse {
    success: boolean;
    data: PaymentData;
}

export default function PaymentConfirmation() {
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await axios.get<ApiResponse>(
                    'https://api.fetchtrue.com/api/checkout/details/68cd384c366c9b2962744274'
                );
                if (response.data.success) {
                    setPaymentData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        fetchPaymentData();
    }, []);

    if (!paymentData) {
        return (
            <div className="flex items-center justify-center  bg-gray-50">
                Loading...
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    return (
        <div className="flex items-center justify-center  px-4">
            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 text-center">
                {/* Header */}
                <h2 className="text-lg font-semibold text-teal-600 mb-4">
                    Booking Confirmation
                </h2>

                {/* Success icon */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-green-100">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-500">
                        <Check className="w-8 h-8 text-white" strokeWidth={3} />
                    </div>
                </div>

                {/* Payment status */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Package Payment Successful
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                    Transaction Number : {paymentData.bookingId}
                </p>

                {/* <p className="text-gray-700">
                    Price{' '}
                    <span className="text-blue-500 font-medium">
                        ₹{paymentData.service.price}
                    </span>
                </p> */}

                {/* Amount & method */}
                <p className="text-gray-700">
                    Amount paid{' '}
                    <span className="text-blue-500 font-medium">
                        ₹{paymentData.paidAmount}
                    </span>
                </p>

                {/* <p className="text-gray-700">
                    Total Amount{' '}
                    <span className="text-blue-500 font-medium">
                        ₹{paymentData.totalAmount}
                    </span>
                </p>
                <p className="text-gray-700 mt-1">
                    Payed by{' '}
                    <span className="text-blue-500 font-medium">
                        {paymentData.cashfreeMethod ||
                            paymentData.paymentMethod.join(', ')}
                    </span>
                </p> */}

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Payment Date:</span>
                    <span className="text-sm text-gray-800 text-right">
                        {formatDate(paymentData.createdAt)}
                    </span>
                </div>

            </div>
        </div>
    );
}
