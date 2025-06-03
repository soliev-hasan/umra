export interface Tour {
  id: string;
  title: string;
  type: "umra" | "hajj";
  duration: string;
  price: number;
  date: string;
  description: string;
  imageUrl: string;
}

export interface AboutContent {
  mission: string;
  experience: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface TourFormData {
  title: string;
  type: "umra" | "hajj";
  duration: string;
  price: number;
  date: string;
  description: string;
  image: File | null;
}
