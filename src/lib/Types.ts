export type Message = {
  role: string;
  content: string;
};

export type User = {
  name: string;
  email: string;
  image: string;
  id: string;
};

export type FileStructure = {
  [key: string]: { code: string };
};

export interface OrderData {
  id: string;
  details?: Array<{
    issue: string;
    description: string;
  }>;
  debug_id?: string;
}
export const initialOptions = {
  clientId: `${process.env.NEXT_PUBLIC_PAYPAL_KEY_ID}`,
};
