import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import qs from "qs";

import { Pagination, Categories, Sort, ClothesBlock, Skeleton  } from '../components'
import { sortType } from "../components/Sort";
import { SearchItemsParams } from "../redux/clothes/types";
import { fetchItems } from "../redux/clothes/asyncActions";
import { RootState, useAppDispatch } from "../redux/store";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";


const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { items, status } = useSelector((state: RootState) => state.clothes);
  const { categoryId, sort, currentPage, inputValue } = useSelector(
    (state: RootState) => state.filter
  );

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getItems = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const searchValue = inputValue ? `&search=${inputValue}` : "";
    dispatch(
      fetchItems({
        sortBy,
        order,
        category,
        searchValue,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : null,
        currentPage,
      };
      const queryString = qs.stringify(params, { skipNulls: true });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const query = qs.parse(window.location.search.slice(1)) as unknown as SearchItemsParams;

      const sort = sortType.find(
        (obj) => obj.sortProperty === query.sortBy
      );
      dispatch(setFilters({
        inputValue: query.searchValue,
        categoryId: Number(query.category),
        currentPage: query.currentPage,
        sort: sort || sortType[0],
      }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getItems();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, inputValue, currentPage]);

  const categories = ["All", "Hoodies", "T-shirts", "Jackets", "Pants"];

  const clothes = items.map((obj: any) => <ClothesBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClick={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">
        {categoryId === 0 ? "Clothes" : categories[categoryId]}
      </h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Error 😕</h2>
          <p>It seems that there is no clothes. Try again later</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : clothes}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
