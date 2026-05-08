export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export interface User {
  id: number;
  username: string | null;
  email: string;
  isVerified: boolean;
  avatarKey: string | null;
  role: UserRole;
}
