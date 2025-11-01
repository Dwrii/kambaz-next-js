import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const savedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("currentUser") || "null")
    : null;

const initialState = {
  currentUser: savedUser,
};

const accountSlice = createSlice({
  name: "accountReducer",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<unknown>) => {
      state.currentUser = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      }
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("currentUser");
      }
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
