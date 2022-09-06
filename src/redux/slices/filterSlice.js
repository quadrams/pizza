import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryID: 0,
  sortType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  sortDirection: 'asc',
  pages: {
    count: 1,
    current: 1,
    itemsOnPage: 8,
  },
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryID(state, action) {
      state.categoryID = action.payload;
    },
    setSort(state, action) {
      state.sortType = action.payload;
    },
    changeSortDirection(state) {
      state.sortDirection == 'desc'
        ? (state.sortDirection = 'asc')
        : (state.sortDirection = 'desc');
    },
    nextPage(state) {
      state.pages.current < state.pages.count && (state.pages.current += 1);
    },
    prevPage(state) {
      state.pages.current > 1 && (state.pages.current -= 1);
    },
    nthPage(state, action) {
      state.pages.current != action.payload && (state.pages.current = action.payload);
    },
    setPagesCount(state, action) {
      action.payload > 0 &&
        (state.pages.count = Math.ceil(action.payload / state.pages.itemsOnPage));
      state.pages.current = 1;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilter(state, action) {
      state.categoryID = action.payload.category;
      state.sortType.sortProperty = action.payload.sortBy;
      state.sortDirection = action.payload.order;
      state.searchValue = action.payload.title;
    },
  },
});

export const {
  setCategoryID,
  setSort,
  changeSortDirection,
  nextPage,
  prevPage,
  nthPage,
  setPagesCount,
  setSearchValue,
  setFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
