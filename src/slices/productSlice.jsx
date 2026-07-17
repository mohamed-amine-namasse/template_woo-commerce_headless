import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsThunk } from "../thunkActionsCreator/productsThunks";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: {
      data: [],
      page: 1,
      perPage: 20,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { data, page, perPage } = action.payload;
        if (page === 1) {
          state.list.data = data;
        } else {
          state.list.data = [...state.list.data, ...data];
        }
        state.list.page = page;
        state.list.perPage = perPage;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
