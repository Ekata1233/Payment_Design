'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

export default function PaymentConfirmation() {
    const [orderId, setOrderId] = useState<string | null>(null);
    const [amount, setAmount] = useState<string | null>(null);
    const [createdAt, setCreatedAt] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setOrderId(params.get("order_id"));
        setAmount(params.get("amount"));
        setCreatedAt(params.get("createdAt"));
    }, []);

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
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
                    Order Id : {orderId}
                </p>

                {/* Amount & method */}
                <p className="text-gray-700">
                    Amount paid{" "}
                    <span className="text-blue-500 font-medium">
                        ₹{amount}
                    </span>
                </p>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Payment Date:</span>
                    <span className="text-sm text-gray-800 text-right">
                        {formatDate(createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}
