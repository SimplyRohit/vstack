"use client";
import { updateTokens } from "@/actions/payment";
import Bottom from "@/components/Bottom";
import { allBuy } from "@/lib/Constant";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Loader } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Pricing() {
  const notify = () => toast("payment failed");
  const Session = useSession();
  const user = Session.data?.user;

  // on payment success update tokens
  const onPaymentSuccess = async ({
    orderId,
    paymentId,
    payerId,
    tokens,
  }: {
    orderId: string;
    paymentId: string;
    payerId: string;
    tokens: number;
  }) => {
    if (!user) {
      return signIn();
    }
    await updateTokens({
      tokens,
      orderId,
      paymentId,
      payerId,
    });
  };

  return Session.status === "loading" ? (
    <div className="flex min-h-[calc(100vh-95px)] w-full items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  ) : (
    <div className="flex min-h-[calc(100vh-95px)] w-full items-center justify-center">
      <div className="flex h-full w-full flex-col">
        <div className="flex w-full items-center justify-center px-6 py-4">
          <span className="mb-1 mt-1 text-2xl font-semibold">Buy tokens</span>
        </div>
        <div className="mb-3 flex justify-center">
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
        <div className="flex flex-col justify-center gap-4 px-3 py-3 lg:flex-row">
          {allBuy.map((item, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col justify-center gap-5 rounded-xl border border-[#353434] px-6 pb-10 pt-6 text-sm shadow-xl"
            >
              <div className="flex flex-col">
                <div className="flex flex-col gap-1">
                  <p className="flex items-center gap-2 text-xl font-semibold">
                    But Tokens
                  </p>
                  <div className="ml-4 mt-2 flex items-baseline gap-1.5">
                    <div className="relative">
                      <p className="absolute -left-4 -top-0 text-2xl">$</p>
                      <div className="flex items-baseline gap-1.5">
                        <p className="text-5xl">{item.price}</p>
                        <div className="flex flex-col items-start justify-center">
                          <p className="absolute mb-6 text-xs">USD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mr-2 mt-2 min-h-[100px] text-base">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <PayPalButtons
                  disabled={!user}
                  onCancel={() => notify()}
                  onApprove={(data) =>
                    onPaymentSuccess({
                      orderId: data.orderID,
                      paymentId: data.paymentID!,
                      payerId: data.payerID!,
                      tokens: item.tokens,
                    })
                  }
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          description: item.description,

                          amount: {
                            // @ts-ignore
                            value: item.price,
                            currency_code: "USD",
                          },
                        },
                      ],
                    });
                  }}
                  style={{
                    shape: "pill",
                    color: "black",
                    layout: "vertical",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <Bottom />
      </div>
    </div>
  );
}
