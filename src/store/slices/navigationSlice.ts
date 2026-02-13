import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  headerTitle: string;
  headerRightButton: string | null;
  currentScreen: string;
}

const initialState: NavigationState = {
  headerTitle: 'Dashboard',
  headerRightButton: null,
  currentScreen: 'DashboardScreen',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setHeaderTitle: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload;
    },
    setHeaderRightButton: (state, action: PayloadAction<string | null>) => {
      state.headerRightButton = action.payload;
    },
    setCurrentScreen: (state, action: PayloadAction<string>) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { setHeaderTitle, setHeaderRightButton, setCurrentScreen } =
  navigationSlice.actions;
export default navigationSlice.reducer;
