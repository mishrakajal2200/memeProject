import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    uploadedMemes: [],
  },
  reducers: {
    addMeme: (state, action) => {
      state.uploadedMemes.push(action.payload);
    },
  },
});

export const { addMeme } = uploadSlice.actions;
export default uploadSlice.reducer;
