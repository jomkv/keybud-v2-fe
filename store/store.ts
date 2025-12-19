import { configureStore } from "@reduxjs/toolkit";

import navigationReducer from "@/store/slices/navigationSlice";
import userReducer from "@/store/slices/user-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      navigation: navigationReducer,
      user: userReducer,
    },
    devTools: process.env.REACT_APP_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
