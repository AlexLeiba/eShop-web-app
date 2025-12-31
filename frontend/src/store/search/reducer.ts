import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: { payload: string }) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
