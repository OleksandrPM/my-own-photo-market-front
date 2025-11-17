import { RootState } from "lib/redux/store";
import { AuthState } from "types/authState";
import { User } from "types/user";

export const getAuth = (state: RootState): AuthState => state.auth;

export const getUser = (state: RootState): AuthState["user"] => state.auth.user;

export const getUserId = (state: RootState): User["id"] => state.auth.user.id;

export const getUserName = (state: RootState): User["name"] =>
  state.auth.user.name;

export const getUserEmail = (state: RootState): User["email"] =>
  state.auth.user.email;

export const getUserAvatarURL = (state: RootState): User["avatarURL"] =>
  state.auth.user.avatarURL;

export const getUserRole = (state: RootState): User["role"] =>
  state.auth.user.role;

export const getAccessToken = (state: RootState): AuthState["accessToken"] =>
  state.auth.accessToken;

export const getIsLoggedIn = (state: RootState): AuthState["isLoggedIn"] =>
  state.auth.isLoggedIn;

export const getIsLoading = (state: RootState): AuthState["isLoading"] =>
  state.auth.isLoading;

export const getError = (state: RootState): AuthState["error"] =>
  state.auth.error;
