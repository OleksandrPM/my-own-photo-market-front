import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/auth/auth-state.types";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  avatarUrl: null,
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
    setAccessToken(state, action: PayloadAction<AuthState["accessToken"]>) {
      state.accessToken = action.payload;
    },
    setAvatarUrl(state, action: PayloadAction<AuthState["avatarUrl"]>) {
      state.avatarUrl = action.payload;
    },
    setIsAuthLoading(state, action: PayloadAction<AuthState["isLoading"]>) {
      state.isLoading = action.payload;
    },
    setAuthError(state, action: PayloadAction<AuthState["error"]>) {
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
  setAvatarUrl,
  setIsAuthLoading,
  setAuthError,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
