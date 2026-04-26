import { NewNotificationPayload } from "@jomkv/keybud-v2-contracts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  notifications: NewNotificationPayload[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<NewNotificationPayload[]>,
    ) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action: PayloadAction<NewNotificationPayload>) => {
      // Avoid duplicates
      const exists = state.notifications.find(
        (n) => n.notificationId === action.payload.notificationId,
      );

      if (!exists) {
        state.notifications.unshift(action.payload);
        state.unreadCount += 1;
      }
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (n) => n.notificationId !== action.payload,
      );
    },
    clearUnread: (state) => {
      state.unreadCount = 0;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  removeNotification,
  clearUnread,
} = notificationSlice.actions;
export default notificationSlice.reducer;
