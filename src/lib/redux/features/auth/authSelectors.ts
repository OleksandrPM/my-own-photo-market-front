import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/redux/store";
import { UserRole } from "@/types/user/user.types";

// export const selectAuth = (state: RootState) => state.auth;

// const selectUser = (state: RootState) => selectAuth(state).user;

// export const selectUserId = createSelector(
//   selectUser,
//   (user) => user?.id ?? null,
// );

// export const selectUserName = createSelector(
//   selectUser,
//   (user) => user?.username ?? null,
// );

// export const selectUserEmail = createSelector(
//   selectUser,
//   (user) => user?.email ?? null,
// );

// export const selectUserIsVerified = createSelector(
//   selectUser,
//   (user) => user?.isVerified ?? false,
// );

// export const selectUserAvatarKey = createSelector(
//   selectUser,
//   (user) => user?.avatarKey ?? null,
// );

// export const selectUserRole = createSelector(
//   selectUser,
//   (user) => user?.role ?? UserRole.GUEST,
// );

// export const selectAccessToken = (state: RootState) =>
//   selectAuth(state).accessToken;

// export const selectAvatarUrl = (state: RootState) =>
//   selectAuth(state).avatarUrl;

// export const selectIsLoading = (state: RootState) =>
//   selectAuth(state).isLoading;

// export const selectError = (state: RootState) => selectAuth(state).error;

// export const selectIsLoggedIn = (state: RootState) => !!selectAuth(state).user;
