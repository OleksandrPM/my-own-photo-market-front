import type { UserResponseDto } from "../user/user-response.dto";

export interface AuthResponseDto {
  user: UserResponseDto;
  accessToken: string;
  avatarUrl: string | null;
}
