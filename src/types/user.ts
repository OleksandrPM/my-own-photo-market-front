export enum UserRoles {
  Admin = "admin",
  User = "user",
}

export interface User {
  id: string | null;
  name?: string | null;
  email: string | null;
  avatarURL?: string | null;
  role: UserRoles | null;
}
