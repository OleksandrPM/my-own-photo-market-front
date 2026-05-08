import { UserRole } from "./user.types";

export interface UserResponseDto {
  id: string;
  email: string;
  isVerified: boolean;
  username: string | null;
  role: Exclude<UserRole, UserRole.GUEST>;
  avatarKey: string | null;
  createdAt: Date;
  updatedAt: Date;
}
