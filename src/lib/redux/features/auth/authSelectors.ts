import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "lib/redux/store";
import { AuthState } from "types/authState";
import { User } from "types/user";

export const getAuth = (state: RootState): AuthState => state.auth;

export const getUser = (state: RootState): AuthState["user"] => state.auth.user;

export const getUserId = (state: RootState): User["id"] | null =>
  state.auth.user?.id ?? null;

export const getUserName = (state: RootState): User["username"] | null =>
  state.auth.user?.username ?? null;

export const getUserEmail = (state: RootState): User["email"] | null =>
  state.auth.user?.email ?? null;

export const getUserAvatarURL = (state: RootState): User["avatarURL"] | null =>
  state.auth.user?.avatarURL ?? null;

export const getUserRole = (state: RootState): User["role"] | null =>
  state.auth.user?.role ?? null;

export const getAccessToken = (state: RootState): AuthState["accessToken"] =>
  state.auth.accessToken;

export const getIsLoading = (state: RootState): AuthState["isLoading"] =>
  state.auth.isLoading;

export const getError = (state: RootState): AuthState["error"] =>
  state.auth.error;

export const getIsLoggedIn = createSelector(
  (state: RootState) => state.auth.user,
  (user) => Boolean(user),
);
