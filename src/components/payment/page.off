// "use client";
// import payment from "@/actions/payment";
// import axios from "axios";
// import Script from "next/script";
// import { useState } from "react";
// import Free from "@/components/pricing/Free";
// import Pro from "@/components/pricing/Pro";
// import Options from "@/components/pricing/Options";
// import Top from "@/components/pricing/Top";
// import Bottom from "@/components/pricing/Bottom";

// interface RazorpayResponse {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
// }

// export default function Pricing() {
//   const [isProcessing, setProcessing] = useState(false);
//   const handlePayment = async () => {
//     setProcessing(true);
//     try {
//       const response = await axios.post("api/payment/checkout");
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         name: "testing name",
//         description: "testing description",
//         order_id: response?.data.orderId,
//         handler: function (response: RazorpayResponse) {
//           const CheckPayment = async () => {
//             const VerifyData: { status: number } = await payment({
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             });
//             console.log(VerifyData, "verifydata");
//           };
//           CheckPayment();
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="w-screen h-screen items-center justify-center flex">
//       <Script
//         type="text/javascript"
//         src="https://checkout.razorpay.com/v1/checkout.js"
//       />
//       <div className="w-full h-full flex flex-col">
//         <Top />
//         <Options />
//         <div className="flex flex-col justify-center gap-4 px-3 py-3 md:min-h-[30rem] md:flex-row md:gap-0 md:py-0">
//           <Free />
//           <Pro handlePayment={handlePayment} isProcessing={isProcessing} />
//         </div>
//         <Bottom />
//       </div>
//     </div>
//   );
// }
