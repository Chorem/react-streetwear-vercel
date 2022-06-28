import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ESortProperty, FilterSliceState, Sort } from "./types";


const initialState: FilterSliceState = {
  inputValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "popularity",
    sortProperty: ESortProperty.RATING_DESC,
  }
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: "popularity",
          sortProperty: ESortProperty.RATING_DESC,
        }
      }
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setInputValue,
} = filterSlice.actions;
export default filterSlice.reducer;
