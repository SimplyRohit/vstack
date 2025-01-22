import { allBuy } from "@/lib/Constant";

export default function Pro({
  handlePayment,
  isProcessing,
}: {
  handlePayment: (price: number, tokens: number, description: string) => void;
  isProcessing: boolean;
}) {
  return allBuy.map((item, index) => (
    <div
      key={index}
      className="relative flex flex-1 flex-col justify-center gap-5 rounded-xl border border-[#353434] px-6 pb-10 pt-6 text-sm shadow-xl md:min-h-[25rem] md:max-w-96 md:rounded-none md:border-r-0 md:pb-6 md:first:rounded-bl-xl md:first:rounded-tl-xl md:last:rounded-br-xl md:last:rounded-tr-xl md:last:border-r"
    >
      <div className="relative flex flex-col">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-xl font-semibold">
            {item.tokens} Tokens
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
          <p className="mr-2 mt-2 text-base">{item.description}</p>
        </div>
      </div>
      <div className="relative flex flex-col">
        <button
          disabled={isProcessing}
          onClick={() =>
            handlePayment(item.price, item.tokens, item.description)
          }
          className="w-full rounded-2xl bg-[#10A37F] p-3 hover:bg-[#1A7F64]"
        >
          <div className="flex items-center justify-center">
            {isProcessing ? "Processing..." : "Buy"}
          </div>
        </button>
      </div>
    </div>
  ));
}
