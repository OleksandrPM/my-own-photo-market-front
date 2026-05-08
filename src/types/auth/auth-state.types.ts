import { User } from "../user/user.types";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  avatarUrl: string | null;
  isLoading: boolean;
  error: string | null;
}
