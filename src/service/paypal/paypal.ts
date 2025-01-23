import {
  Client,
  Environment,
  OrdersController,
} from "@paypal/paypal-server-sdk";

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.NEXT_PUBLIC_PAYPAL_KEY_ID!,
    oAuthClientSecret: process.env.NEXT_PUBLIC_PAYPAL_KEY_SECRET!,
  },

  environment: Environment.Sandbox,
});

export const ordersController = new OrdersController(client);
