import { allBuy } from "@/lib/Constant";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function Pro() {
  const handleCreateOrder = async (item: {
    tokens: number;
    price: string;
    description: string;
  }) => {
    try {
      const response = await axios.post("/api/payment/checkout", {
        item,
      });

      if (
        !response.data.result.id &&
        response.data.result.status !== "CREATED"
      ) {
        throw new Error("Failed to create order.");
      }

      return response.data.result.id;
    } catch (error) {
      console.error(error);
      alert("Error creating order. Please try again.");
    }
  };

  const handleApprove = async (orderId: string) => {
    console.log(orderId);
    try {
      const response = await axios.post(`/api/payment/approve`, {
        orderId,
      });

      console.log(response.data);
      // if (data.error) throw new Error(data.error);

      // alert(`Transaction successful! Order ID: ${data.orderId}`);
    } catch (error) {
      console.error(error);
      alert("Error capturing payment. Please contact support.");
    }
  };

  return allBuy.map((item, index) => (
    <div key={index} className="flex flex-col rounded-lg border p-4 shadow-lg">
      <h2>{item.tokens} Tokens</h2>
      <p>${item.price} USD</p>
      <p>{item.description}</p>
      <PayPalButtons
        style={{
          shape: "pill",
          layout: "vertical",
          color: "silver",
          label: "buynow",
        }}
        createOrder={() => handleCreateOrder(item)}
        onApprove={(data) => handleApprove(data.orderID)}
      />
    </div>
  ));
}
