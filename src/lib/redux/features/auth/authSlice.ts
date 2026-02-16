import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "types/authState";

const initialState: AuthState = {
  user: null,
  accessToken: null,
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
    setIsAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
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
  setIsAuthLoading,
  setAuthError,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
