export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  createdAt: Date;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  country: string;
}