import { configureStore } from "@reduxjs/toolkit";

import navigationReducer from "@/store/slices/navigationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      navigation: navigationReducer,
    },
    devTools: process.env.REACT_APP_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
