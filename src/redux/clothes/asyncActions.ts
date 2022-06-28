import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Items, SearchItemsParams } from "./types";

export const fetchItems = createAsyncThunk<Items[], SearchItemsParams>(
  "clothes/fetchItemsById",
  async (params) => {
    const { sortBy, order, category, searchValue, currentPage } = params;
    const { data } = await axios.get<Items[]>(
      `https://628dd927a339dfef87a18e03.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
    );
    return data;
  }
);