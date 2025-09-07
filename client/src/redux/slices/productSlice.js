import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    bestSellers: [],
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setBestSellers: (state, action) => {
      state.bestSellers = action.payload;
    },
  },
});

export const { setProducts, setBestSellers } = productSlice.actions;

export default productSlice.reducer;
