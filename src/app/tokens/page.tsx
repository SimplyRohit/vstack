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

  const user = useSession().data?.user;
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

  return !user ? (
    <div className="flex min-h-[calc(100vh-95px)] w-full items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  ) : (
    <div className="flex min-h-[calc(100vh-95px)] w-full items-center justify-center">
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
          {allBuy.map((item, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col justify-center gap-5 rounded-xl border border-[#353434] px-6 pb-10 pt-6 text-sm shadow-xl md:min-h-[25rem] md:max-w-96 md:rounded-none md:border-r-0 md:pb-6 md:first:rounded-bl-xl md:first:rounded-tl-xl md:last:rounded-br-xl md:last:rounded-tr-xl md:last:border-r"
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
              <div className="mt-10 flex flex-col">
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
                    shape: "rect",
                    color: "gold",
                    layout: "vertical",
                    label: "pay",
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
