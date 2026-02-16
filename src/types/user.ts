export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: number;
  username?: string;
  email: string;
  avatarURL?: string;
  role: UserRoles;
}
