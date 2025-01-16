export type userdata = {
  image: string | null;
  id: number;
  userid: string;
  email: string;
  name: string | null;
};

export type subscriptiondata = {
  id: number;
  userId: string;
  type: "free" | "pro" | "premium";
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type User = {
  id: string;
  email: string;
  name: string;
  image: string;
};
