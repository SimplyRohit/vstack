"use client";
import { payment, updateTokens } from "@/actions/payment";
import axios from "axios";
import Script from "next/script";
import { useState } from "react";
import Pro from "@/components//Pro";

import Bottom from "@/components/Bottom";
import { signIn, useSession } from "next-auth/react";
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function Pricing() {
  const user = useSession()?.data?.user;

  const [isProcessing, setProcessing] = useState(false);
  const handlePayment = async (
    price: number,
    tokens: number,
    description: string,
  ) => {
    if (!user) {
      signIn();
      return;
    }
    setProcessing(true);

    try {
      const response = await axios.post("api/payment/checkout", {
        price,
      });
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name: user?.name,
        description: description,
        order_id: response?.data.orderId,

        handler: function (response: RazorpayResponse) {
          const CheckPayment = async () => {
            const VerifyData = await payment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            if (VerifyData.status === 200) {
              const { OrderId, PaymentId, Signature } = VerifyData;
              if (OrderId || PaymentId || Signature) {
                await updateTokens({
                  tokens,
                  OrderId,
                  PaymentId,
                  Signature,
                });
              }
            }
          };
          CheckPayment();
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-95px)] w-full items-center justify-center">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="flex h-full w-full flex-col">
        <div className="flex w-full items-center justify-center px-6 py-4 md:pb-10 md:pt-[4.5rem]">
          <span className="mb-1 mt-1 text-2xl font-semibold md:mb-0 md:mt-0 md:text-3xl">
            Buy tokens
          </span>
        </div>
        <div className="mb-3 flex justify-center md:mb-6">
          <div className="w-[fit-content]">
            <div className="cursor-pointer select-none rounded-full border border-solid p-0.5 outline-none">
              <div className="relative grid grid-cols-2">
                <div className="relative z-10 rounded-full bg-slate-400 px-3 py-1.5 text-center text-sm font-semibold">
                  <button className="">Personal</button>
                  <div className=""></div>
                </div>

                <button className="cursor-not-allowed text-sm">Business</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 px-3 py-3 md:min-h-[30rem] md:flex-row md:gap-0 md:py-0">
          <Pro handlePayment={handlePayment} isProcessing={isProcessing} />
        </div>
        <Bottom />
      </div>
    </div>
  );
}
