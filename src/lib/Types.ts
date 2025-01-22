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
