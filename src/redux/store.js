import { configureStore } from "@reduxjs/toolkit";
import memeReducer from "./memeSlice";
import userReducer from "./userSlice";
import uploadReducer from "./uploadSlice";

export const store = configureStore({
  reducer: {
    memes: memeReducer,
    user: userReducer,
    upload: uploadReducer,
  },
});

export default store;
