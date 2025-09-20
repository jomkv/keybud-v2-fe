import { NavigationState, Page } from "@/@types/navigation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NavigationState = {
  currentPage: "home",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = navigationSlice.actions;

export default navigationSlice.reducer;
