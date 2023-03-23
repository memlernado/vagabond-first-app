import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Models } from "appwrite";

type User = Models.Account<Models.Preferences>;

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<User>) => {
      state.user = actions.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
