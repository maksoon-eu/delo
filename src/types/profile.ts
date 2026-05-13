export type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  workTerms: string | null;
  emailVerified: Date | null;
  createdAt: Date;
};

export type UploadProfileImageResult = {
  error?: string;
  image?: string;
};
