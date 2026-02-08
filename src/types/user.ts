export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: string | null;
  username?: string | null;
  email: string | null;
  avatarURL?: string | null;
  role: UserRoles | null;
}
