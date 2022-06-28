export enum ESortProperty {
  PRICE_ASC = "-price",
  PRICE_DESC = "price",
  TITLE_ASC = "-title",
  TITLE_DESC = "title",
  RATING_ASC = "-price",
  RATING_DESC = "rating",

}

export type Sort = {
  name: string;
  sortProperty: ESortProperty;
}

export interface FilterSliceState {
  inputValue: string,
  categoryId: number,
  currentPage: number,
  sort: Sort;
}