"use client";
import Pro from "@/components//Pro";
import {
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import Bottom from "@/components/Bottom";
import { initialOptions, OrderData } from "@/lib/Types";

export default function Pricing() {
  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
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

                    <button className="cursor-not-allowed text-sm">
                      Business
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 px-3 py-3 md:min-h-[30rem] md:flex-row md:gap-0 md:py-0">
              <Pro />
            </div>
            <Bottom />
          </div>
        </div>
      </PayPalScriptProvider>
    </>
  );
}
