import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  authToken: string | null;
  userName: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  authToken: null,
  userName: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (
      state,
      action: PayloadAction<{
        userId: string;
        authToken: string;
        userName?: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.authToken = action.payload.authToken;
      state.userName = action.payload.userName || null;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.authToken = null;
      state.userName = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuthenticated, logout, setError, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
