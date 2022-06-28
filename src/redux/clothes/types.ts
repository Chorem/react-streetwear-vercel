export type Items = {
  id: string, 
  title: string, 
  price: number, 
  types: number[], 
  imageUrl: string, 
  sizes: string[] 
}

export type SearchItemsParams = {
  sortBy: string;
  order: string;
  category: string;
  searchValue: string;
  currentPage: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ClothesSliceState {
  items: Items[];
  status: Status;
}
