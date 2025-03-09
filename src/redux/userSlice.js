import { createSlice } from "@reduxjs/toolkit";

// Get user from localStorage if available
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: storedUser,  // User object (null if not logged in)
  status: "idle",    // "idle" | "loading" | "succeeded" | "failed"
  error: null,       // Error messages
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
    },
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("user"); // Remove from localStorage
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user)); // Update localStorage
      }
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, updateProfile, setError } = userSlice.actions;
export default userSlice.reducer;
