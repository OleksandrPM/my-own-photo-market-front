export type UserRole = "admin" | "user";

export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  avatarURL: string | null;
  role: UserRole | null;
}
