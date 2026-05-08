import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInValues, SignUpValues } from "@/lib/forms/schemas";
import {
  resetAuthState,
  setAccessToken,
  setAuthError,
  setAvatarUrl,
  setIsAuthLoading,
  setUser,
} from "./authSlice";
// import { login, register } from "lib/api/authApi";

// export const registerThunk = createAsyncThunk<void, FormData>(
//   "auth/register",
//   async (formData, { dispatch }) => {
//     dispatch(setIsAuthLoading(true));
//     dispatch(setAuthError(null));

//     try {
//       const response = await register(formData);

//       dispatch(setUser(response.user));
//       dispatch(setAccessToken(response.accessToken));
//       dispatch(setAvatarUrl(response.avatarUrl));
//     } catch (err) {
//       dispatch(setAuthError("Failed to register"));
//     } finally {
//       dispatch(setIsAuthLoading(false));
//     }
//   },
// );

// export const loginThunk = createAsyncThunk<void, SignInValues>(
//   "auth/login",
//   async (signInData: SignInValues, { dispatch }) => {
//     dispatch(setIsAuthLoading(true));
//     dispatch(setAuthError(null));

//     try {
//       const response = await login(signInData);
//       dispatch(setUser(response.user));
//       console.log(response.user);

//       dispatch(setAccessToken(response.accessToken));
//       dispatch(setAvatarUrl(response.avatarUrl));
//     } catch (err) {
//       dispatch(setAuthError("Failed to login"));
//     } finally {
//       dispatch(setIsAuthLoading(false));
//     }
//   },
// );

// export const logoutThunk = createAsyncThunk<void>(
//   "auth/logout",
//   async (_, { dispatch }) => {
//     dispatch(resetAuthState());
//   },
// );
