import { configureStore } from "@reduxjs/toolkit";
import { redusers } from "./Slice";

export const store = configureStore({
  reducer: {
    global_store: redusers
  }
})
export type RootState = ReturnType<typeof store.getState>
export type TypedDispatch = typeof store.dispatch