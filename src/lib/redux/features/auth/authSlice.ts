import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "types/authState";

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
    id: null,
    avatarURL: null,
    role: null,
  },
  accessToken: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetAuthState() {
      return initialState;
    },
  },
});

export const {
  setUser,
  setAccessToken,
  setIsLoggedIn,
  setIsLoading,
  setError,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
