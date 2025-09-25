// 'use client';

// import { useState, useEffect } from 'react';
// import { CheckCircle,  Copy,  Loader } from 'lucide-react';

// // Define types for the API response
// interface User {
//   _id: string;
//   fullName: string;
//   email: string;
//   mobileNumber: string;
// }

// interface Service {
//   _id: string;
//   serviceName: string;
//   price: number;
//   discountedPrice: number;
//   franchiseDetails: {
//     commission: string;
//   };
// }

// interface PaymentData {
//   _id: string;
//   user: User;
//   service: Service;
//   subtotal: number;
//   totalAmount: number;
//   paidAmount: number;
//   paymentStatus: string;
//   orderStatus: string;
//   paymentMethod: string[];
//   cashfreeMethod: string;
//   bookingId: string;
//   createdAt: string;
//   updatedAt: string;
//   serviceDiscount: number;
//   platformFee: number;
//   assurityfee: number;
//   listingPrice: number;
//   serviceDiscountPrice: number;
//   priceAfterDiscount: number;
//   platformFeePrice: number;
//   assurityChargesPrice: number;
// }

// interface ApiResponse {
//   success: boolean;
//   data: PaymentData;
// }

// export default function PaymentConfirmation() {
//   const [isCopied, setIsCopied] = useState(false);
//   const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPaymentData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('https://api.fetchtrue.com/api/checkout/details/68cd384c366c9b2962744274');

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data: ApiResponse = await response.json();

//         if (data.success) {
//           setPaymentData(data.data);
//         } else {
//           throw new Error('Failed to fetch payment data');
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//         console.error('Error fetching payment data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentData();
//   }, []);

//   const copyToClipboard = () => {
//     if (paymentData) {
//       navigator.clipboard.writeText(paymentData.bookingId);
//       setIsCopied(true);
//       setTimeout(() => setIsCopied(false), 2000);
//     }
//   };



//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
//           <Loader className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
//           <p className="text-gray-600">Loading payment details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !paymentData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
//           <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
//           <p className="text-gray-600 mb-6">{error || 'Failed to load payment details'}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
//         {/* Header */}
//         <div className="bg-green-500 p-6 text-center">
//             <h1 className="text-2xl font-bold text-white">Booking Confirmation</h1>
//           <div className="flex justify-center mb-4">
//             <div className="bg-white p-2 rounded-full">
//               <CheckCircle className="h-12 w-12 text-green-500" />
//             </div>
//           </div>

//           <p className="text-green-100 mt-2">Payment Successful</p>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <div className="space-y-6">




//             {/* Transaction Details */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600 font-medium">Booking ID:</span>
//                 <div className="flex items-center">
//                   <span className="font-mono text-gray-800">{paymentData.bookingId}</span>
//                   <button 
//                     onClick={copyToClipboard}
//                     className="ml-2 p-1 text-gray-500 hover:text-blue-500 transition-colors"
//                     aria-label="Copy booking ID"
//                   >
//                     <Copy size={16} />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600 font-medium">Subtotal:</span>
//                 <span className="font-medium text-gray-800">{formatCurrency(paymentData.subtotal)}</span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600 font-medium">Service Discount:</span>
//                 <span className="font-medium text-green-600">-{formatCurrency(paymentData.serviceDiscountPrice)}</span>
//               </div>


//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-2 border-green-100">
//                 <span className="text-gray-600 font-medium">Total Amount:</span>
//                 <span className="text-xl font-bold text-green-600">{formatCurrency(paymentData.totalAmount)}</span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-2 border-blue-100">
//                 <span className="text-gray-600 font-medium">Paid Amount:</span>
//                 <span className="text-xl font-bold text-blue-600">{formatCurrency(paymentData.paidAmount)}</span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600 font-medium">Payment Method:</span>
//                 <span className="font-medium text-gray-800 capitalize">{paymentData.cashfreeMethod || paymentData.paymentMethod.join(', ')}</span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600 font-medium">Payment Status:</span>
//                 <span className="font-medium text-green-600 capitalize">{paymentData.paymentStatus}</span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600 font-medium">Order Status:</span>
//                 <span className="font-medium text-green-600 capitalize">{paymentData.orderStatus}</span>
//               </div>

//               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                 <span className="text-gray-600 font-medium">Booking Date:</span>
//                 <span className="text-sm text-gray-800 text-right">
//                   {formatDate(paymentData.createdAt)}
//                 </span>
//               </div>
//             </div>

//             {/* Copy confirmation message */}
//             {isCopied && (
//               <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center">
//                 Booking ID copied to clipboard!
//               </div>
//             )}


//           </div>
//         </div>


//       </div>
//     </div>
//   );
// }


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

    // useEffect(() => {
    //     const fetchPaymentData = async () => {
    //         const response = await fetch(
    //             'https://api.fetchtrue.com/api/checkout/details/68cd384c366c9b2962744274'
    //         );
    //         const data: ApiResponse = await response.json();
    //         if (data.success) setPaymentData(data.data);
    //     };
    //     fetchPaymentData();
    // }, []);

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
                    Ticket Payment Successful
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                    Transaction Number : {paymentData.bookingId}
                </p>

                <p className="text-gray-700">
                    Price{' '}
                    <span className="text-blue-500 font-medium">
                        ₹{paymentData.service.price}
                    </span>
                </p>

                {/* Amount & method */}
                <p className="text-gray-700">
                    Amount paid{' '}
                    <span className="text-blue-500 font-medium">
                        ₹{paymentData.paidAmount}
                    </span>
                </p>

                <p className="text-gray-700">
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
                </p>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Booking Date:</span>
                    <span className="text-sm text-gray-800 text-right">
                        {formatDate(paymentData.createdAt)}
                    </span>
                </div>

            </div>
        </div>
    );
}
