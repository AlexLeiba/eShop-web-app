import { createSlice } from '@reduxjs/toolkit';

type FiltersType = {
  color: string;
  size: string;
  quantity: number;
  filter: string;
};
const initialState: FiltersType = {
  color: '',
  size: '',
  quantity: 1,
  filter: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    selectDefaultValues: (state, action) => {
      state.color = action.payload.color;
      state.size = action.payload.size;
      state.quantity = action.payload.quantity;
    },
    selectColor: (state, action) => {
      state.color = action.payload;
    },
    selectSize: (state, action) => {
      state.size = action.payload;
    },
    addQuantity: (state, action) => {
      state.quantity += action.payload;
    },
    reduceQuantity: (state) => {
      if (state.quantity > 1) {
        state.quantity = state.quantity - 1;
      }
    },
    selectFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  selectDefaultValues,
  selectColor,
  selectSize,
  addQuantity,
  reduceQuantity,
} = filtersSlice.actions;
export default filtersSlice.reducer;
