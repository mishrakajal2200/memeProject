
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch memes with filters, search, sorting, and pagination
export const fetchMemes = createAsyncThunk(
  "memes/fetchMemes",
  async ({ page = 1, search = "", category = "Trending", sortBy = "likes" }) => {
    const response = await axios.get("https://api.imgflip.com/get_memes");
    let memes = response.data.data.memes;

    // Filter by category (For now, we assume some categories)
    if (category !== "Trending") {
      memes = memes.filter((meme) =>
        meme.name.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Search functionality
    if (search) {
      memes = memes.filter((meme) =>
        meme.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting logic
    if (sortBy === "likes") {
      memes.sort((a, b) => (b.likes || 0) - (a.likes || 0)); // Assume likes exist
    } else if (sortBy === "date") {
      memes.sort((a, b) => (b.created_at || 0) - (a.created_at || 0)); // Assume timestamps
    } else if (sortBy === "comments") {
      memes.sort((a, b) => (b.comments || 0) - (a.comments || 0)); // Assume comments exist
    }

    // Pagination (assuming 10 memes per page)
    const pageSize = 10;
    const paginatedMemes = memes.slice((page - 1) * pageSize, page * pageSize);

    return { memes: paginatedMemes, totalPages: Math.ceil(memes.length / pageSize) };
  }
);

const memeSlice = createSlice({
  name: "memes",
  initialState: {
    memes: [],
    page: 1,
    totalPages: 1,
    search: "",
    category: "Trending",
    sortBy: "likes",
    status: "idle",
    error: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1; // Reset pagination
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1; // Reset pagination
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1; // Reset pagination
    },
    nextPage: (state) => {
      if (state.page < state.totalPages) state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.page === 1) {
          state.memes = action.payload.memes;
        } else {
          state.memes = [...state.memes, ...action.payload.memes]; // Infinite scroll
        }
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearch, setCategory, setSortBy, nextPage } = memeSlice.actions;
export default memeSlice.reducer;
