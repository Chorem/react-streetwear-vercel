import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchItems } from "./asyncActions";
import { ClothesSliceState, Items, Status } from "./types";

const initialState: ClothesSliceState = {
  items: [],
  status: Status.LOADING,
};

const clothesSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Items[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchItems.pending.type]: (state) => {
      state.status = Status.LOADING;
      state.items = [];
    },
    [fetchItems.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    },
    [fetchItems.rejected.type]: (state) => {
      state.status = Status.ERROR;
      state.items = [];
    },
  },
});
export const { setItems } = clothesSlice.actions;
export default clothesSlice.reducer;
